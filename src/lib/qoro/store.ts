import { browser } from '$app/environment';
import { derived, get, writable } from 'svelte/store';
import { qoro } from './client';
import type { QoroCollection, QoroProduct, QoroSettings } from './types';
import { toUiProduct, productsByCollection, type CollectionSection } from './adapt';
import type { product } from '$lib/interfaces';

export const qoroSettings = writable<QoroSettings | null>(null);
export const qoroProducts = writable<QoroProduct[]>([]);
export const qoroCollections = writable<QoroCollection[]>([]);
export const qoroLoading = writable<boolean>(false);
export const qoroError = writable<string | null>(null);

const SESSION_KEY = 'bta_qoro_cache_v1';
const CACHE_TTL_MS = 5 * 60 * 1000;

let loadPromise: Promise<void> | null = null;

function readSessionCache(): {
	settings: QoroSettings;
	products: QoroProduct[];
	collections: QoroCollection[];
	at: number;
} | null {
	if (!browser) return null;
	try {
		const raw = sessionStorage.getItem(SESSION_KEY);
		if (!raw) return null;
		const parsed = JSON.parse(raw);
		if (!parsed || typeof parsed.at !== 'number') return null;
		if (Date.now() - parsed.at > CACHE_TTL_MS) return null;
		return parsed;
	} catch {
		return null;
	}
}

function writeSessionCache(payload: {
	settings: QoroSettings;
	products: QoroProduct[];
	collections: QoroCollection[];
}) {
	if (!browser) return;
	try {
		sessionStorage.setItem(SESSION_KEY, JSON.stringify({ ...payload, at: Date.now() }));
	} catch {
		// ignore quota / private mode
	}
}

export function loadStorefront(opts: { force?: boolean } = {}): Promise<void> {
	if (!browser) return Promise.resolve();
	if (loadPromise && !opts.force) return loadPromise;

	if (!opts.force) {
		const cached = readSessionCache();
		if (cached) {
			qoroSettings.set(cached.settings);
			qoroProducts.set(cached.products);
			qoroCollections.set(cached.collections);
		}
	}

	qoroLoading.set(true);
	qoroError.set(null);
	loadPromise = (async () => {
		try {
			const [settings, products, collections] = await Promise.all([
				qoro.fetchOrgSettings() as Promise<QoroSettings>,
				qoro.fetchProducts() as Promise<QoroProduct[]>,
				qoro.fetchCollections() as Promise<QoroCollection[]>
			]);
			qoroSettings.set(settings);
			qoroProducts.set(products ?? []);
			qoroCollections.set(collections ?? []);
			writeSessionCache({
				settings,
				products: products ?? [],
				collections: collections ?? []
			});
		} catch (e: any) {
			qoroError.set(e?.message ?? 'Failed to load storefront.');
			console.error('[qoro] loadStorefront failed', e);
		} finally {
			qoroLoading.set(false);
		}
	})();
	return loadPromise;
}

export const productSections = derived(
	[qoroProducts, qoroCollections],
	([$p, $c]): CollectionSection[] => productsByCollection($p, $c)
);

export const uiProducts = derived(qoroProducts, ($p): product[] =>
	$p.filter((q) => q.published).map((q) => toUiProduct(q))
);

function isMetaTrue(
	meta: Record<string, string> | undefined | null,
	key: string
): boolean {
	if (!meta) return false;
	const v = meta[key];
	return typeof v === 'string' && v.toLowerCase() === 'true';
}

export const favoriteUiProducts = derived(qoroProducts, ($p): product[] =>
	$p
		.filter((q) => q.published && isMetaTrue(q.storefront_metadata, 'favorite'))
		.map((q) => toUiProduct(q))
);

export function findUiProductBySlug(slug: string): product | undefined {
	const list = get(uiProducts);
	const bySlug = list.find((p) => p.alias === slug);
	if (bySlug) return bySlug;
	const numeric = Number(slug);
	if (Number.isFinite(numeric)) return list.find((p) => p.id === numeric);
	return undefined;
}
