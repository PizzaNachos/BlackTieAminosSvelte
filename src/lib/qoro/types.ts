export interface QoroProduct {
	id: number;
	name: string;
	description: string | null;
	is_checkoutable?: boolean;
	checkout_product_id?: number | null;
	price?: number | null;
	image_urls: string[] | null;
	weight_oz: number | null;
	unit: string | null;
	out_of_stock: boolean;
	published: boolean;
	storefront_metadata: Record<string, string>;
	product_role?: string | null;
	variants?: QoroProduct[];
	default_variant_id?: number | null;
	variant_label?: string | null;
	sku?: string | null;
	variant_sort_order?: number | null;
	is_default_variant?: boolean;
}

export interface QoroCollectionMember {
	product_id: number;
	sort_order: number;
}

export interface QoroCollection {
	id: number;
	name: string;
	slug: string;
	sort_order: number;
	products: QoroCollectionMember[];
}

export interface QoroSettings {
	store_uuid: string;
	ecommerce_enabled: boolean;
	checkout: {
		paid_enabled: boolean;
		unpaid_enabled: boolean;
		required_fields: {
			name: boolean;
			email: boolean;
			phone: boolean;
			shipping_address: boolean;
		};
		collect_shipping_address: boolean;
	};
	currency: string;
	tax_rate: number | null;
	min_order_amount_cents: number | null;
	terminology: {
		product_singular: string | null;
		product_plural: string | null;
		order_singular: string | null;
		order_plural: string | null;
	};
}

export interface QoroUnpaidLineItem {
	product_id: number;
	quantity: number;
}

export interface QoroUnpaidPayload {
	products: QoroUnpaidLineItem[];
	name: string;
	email: string;
	phone_number: string;
	shipping_address: string;
	note?: string;
}
