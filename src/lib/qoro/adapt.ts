import { ProductType, type product } from '$lib/interfaces';
import type { QoroCollection, QoroProduct } from './types';

const VALID_PRODUCT_TYPES = new Set<string>([
	ProductType.glp1,
	ProductType.secretagogues,
	ProductType.peptide
]);

function metaBool(meta: Record<string, string> | undefined | null, key: string): boolean {
	return typeof meta?.[key] === 'string' && meta[key].toLowerCase() === 'true';
}

function metaProductType(
	meta: Record<string, string> | undefined | null
): ProductType | undefined {
	const raw = meta?.type;
	if (typeof raw !== 'string') return undefined;
	const v = raw.toLowerCase();
	return VALID_PRODUCT_TYPES.has(v) ? (v as ProductType) : undefined;
}

export function slugify(name: string): string {
	return name
		.toLowerCase()
		.normalize('NFKD')
		.replace(/[̀-ͯ]/g, '')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');
}

export function descriptionToParagraphs(description: string | null | undefined): string[] {
	if (!description) return [];
	return description
		.split(/\n\s*\n/)
		.map((p) => p.trim())
		.filter((p) => p.length > 0);
}

function sortVariants(variants: QoroProduct[] | undefined | null): QoroProduct[] {
	return [...(variants ?? [])].sort((a, b) => {
		const orderA = a.variant_sort_order ?? Number.MAX_SAFE_INTEGER;
		const orderB = b.variant_sort_order ?? Number.MAX_SAFE_INTEGER;
		return orderA - orderB || a.id - b.id;
	});
}

function defaultVariantFor(q: QoroProduct): QoroProduct | undefined {
	const variants = sortVariants(q.variants);
	if (variants.length === 0) return undefined;
	return (
		variants.find((v) => v.id === q.default_variant_id) ??
		variants.find((v) => v.is_default_variant) ??
		variants[0]
	);
}

export function toUiProduct(q: QoroProduct, parent?: QoroProduct): product {
	const fallback = parent ?? q;
	const defaultVariant = q.product_role === 'variant_group' ? defaultVariantFor(q) : undefined;
	const display = defaultVariant ?? q;
	const images = display.image_urls?.length ? display.image_urls : fallback.image_urls ?? [];
	const meta = q.storefront_metadata;
	const slug = meta?.slug || slugify(q.name) || String(q.id);
	const longDesc = descriptionToParagraphs(display.description ?? fallback.description);
	const childVariants = sortVariants(q.variants).map((variant) => toUiProduct(variant, q));
	return {
		id: q.id,
		checkout_product_id: q.checkout_product_id ?? null,
		stripe_key: '',
		name: q.name,
		long_desc: longDesc,
		price: display.price ?? 0,
		unit: display.unit ?? fallback.unit ?? 'unit',
		alias: slug,
		product_image_url_paths: images,
		featured_image_url_paths: images.slice(0, 1).length ? images : [],
		out_of_stock: display.out_of_stock,
		is_checkoutable: q.is_checkoutable ?? q.product_role !== 'variant_group',
		published: q.published,
		featured: metaBool(meta, 'featured'),
		product_type: metaProductType(meta),
		product_role: q.product_role ?? null,
		variants: childVariants.length ? childVariants : undefined,
		default_variant_id: q.default_variant_id ?? defaultVariant?.id ?? null,
		variant_label: q.variant_label ?? null,
		variant_sort_order: q.variant_sort_order ?? null,
		is_default_variant: q.is_default_variant,
		sku: q.sku ?? null,
		parent_product_id: parent?.id ?? null
	};
}

export interface CollectionSection {
	collection: QoroCollection;
	prods: product[];
}

export function productsByCollection(
	prods: QoroProduct[],
	cols: QoroCollection[]
): CollectionSection[] {
	const byId = new Map<number, QoroProduct>();
	for (const p of prods) {
		if (p.published) byId.set(p.id, p);
		for (const v of p.variants ?? []) {
			if (v.published) byId.set(v.id, p);
		}
	}
	return [...cols]
		.sort((a, b) => a.sort_order - b.sort_order)
		.map((collection) => {
			const sorted = [...collection.products].sort((a, b) => a.sort_order - b.sort_order);
			const ui: product[] = [];
			const seen = new Set<number>();
			for (const m of sorted) {
				const q = byId.get(m.product_id);
				if (q && !seen.has(q.id)) {
					seen.add(q.id);
					ui.push(toUiProduct(q));
				}
			}
			return { collection, prods: ui };
		})
		.filter((s) => s.prods.length > 0);
}
