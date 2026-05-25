import { browser } from '$app/environment';
import { derived, get, writable } from 'svelte/store';
import type { cart_product, product } from '$lib/interfaces';
import { qoro } from '$lib/qoro/client';
import type { QoroUnpaidPayload } from '$lib/qoro/types';

const STORAGE_KEY = 'bta_cart_v2';
const CONTACT_KEY = 'bta_contact_v1';

function loadInitial(): cart_product[] {
	if (!browser) return [];
	try {
		const raw = window.localStorage.getItem(STORAGE_KEY);
		if (!raw) return [];
		const parsed = JSON.parse(raw);
		if (!Array.isArray(parsed)) return [];
		return parsed.filter(
			(item) =>
				item &&
				item.product &&
				typeof item.product.id === 'number' &&
				typeof item.ammount === 'number' &&
				item.ammount > 0
		);
	} catch {
		return [];
	}
}

export const cart_contents = writable<cart_product[]>(loadInitial());

if (browser) {
	cart_contents.subscribe((contents) => {
		try {
			window.localStorage.setItem(STORAGE_KEY, JSON.stringify(contents));
		} catch {
			// ignore quota
		}
	});
}

function checkoutProductId(p: product): number {
	return p.checkout_product_id ?? p.id;
}

function productKey(p: product): number {
	return checkoutProductId(p);
}

export const add_to_cart = (item: product, qty: number = 1) => {
	const c = get(cart_contents);
	const key = productKey(item);
	const idx = c.findIndex((cp) => productKey(cp.product) === key);
	if (idx >= 0) {
		c[idx].ammount += qty;
	} else {
		c.push({ product: item, ammount: qty });
	}
	cart_contents.set([...c]);
};

export const update_quantity = (updated: product, new_quantity: number) => {
	if (new_quantity <= 0) {
		remove_from_cart(updated);
		return;
	}
	const c = get(cart_contents);
	const key = productKey(updated);
	const idx = c.findIndex((cp) => productKey(cp.product) === key);
	if (idx >= 0) {
		c[idx].ammount = new_quantity;
		cart_contents.set([...c]);
	}
};

export const remove_from_cart = (p: product | cart_product) => {
	const target = 'product' in p ? p.product : p;
	const key = productKey(target);
	cart_contents.set(get(cart_contents).filter((cp) => productKey(cp.product) !== key));
};

export const empty_cart = () => {
	cart_contents.set([]);
};

export const cart_count = derived(cart_contents, ($c) =>
	$c.reduce((sum, cp) => sum + cp.ammount, 0)
);

export const cart_subtotal_cents = derived(cart_contents, ($c) =>
	$c.reduce((sum, cp) => sum + cp.product.price * cp.ammount, 0)
);

export interface ContactDetails {
	name: string;
	email: string;
	phone_number: string;
	shipping_address: string;
	note?: string;
	heard_from?: string;
}

export function loadContact(): ContactDetails {
	const empty: ContactDetails = {
		name: '',
		email: '',
		phone_number: '',
		shipping_address: '',
		note: '',
		heard_from: ''
	};
	if (!browser) return empty;
	try {
		const raw = window.localStorage.getItem(CONTACT_KEY);
		if (!raw) return empty;
		const parsed = JSON.parse(raw);
		return {
			name: parsed.name ?? '',
			email: parsed.email ?? '',
			phone_number: parsed.phone_number ?? '',
			shipping_address: parsed.shipping_address ?? '',
			note: parsed.note ?? '',
			heard_from: parsed.heard_from ?? ''
		};
	} catch {
		return empty;
	}
}

export function saveContact(c: ContactDetails) {
	if (!browser) return;
	try {
		window.localStorage.setItem(CONTACT_KEY, JSON.stringify(c));
	} catch {
		// ignore
	}
}

export async function submitUnpaid(contact: ContactDetails): Promise<{ order_id?: string | number; raw: unknown }> {
	const items = get(cart_contents);
	if (items.length === 0) throw new Error('Cart is empty.');
	const nonCheckoutable = items.find((cp) => cp.product.is_checkoutable === false);
	if (nonCheckoutable) {
		throw new Error(`${nonCheckoutable.product.name} is not available for checkout.`);
	}

	const payload: QoroUnpaidPayload = {
		products: items.map((cp) => ({ product_id: checkoutProductId(cp.product), quantity: cp.ammount })),
		name: contact.name.trim(),
		email: contact.email.trim(),
		phone_number: contact.phone_number.trim(),
		shipping_address: contact.shipping_address.trim()
	};
	const noteParts = [];
	if (contact.note && contact.note.trim()) noteParts.push(contact.note.trim());
	if (contact.heard_from && contact.heard_from.trim()) {
		noteParts.push(`Who did you hear us through?: ${contact.heard_from.trim()}`);
	}
	if (noteParts.length > 0) payload.notes = noteParts.join('\n\n');

	const raw: any = await qoro.checkoutUnpaid(payload);
	const order_id =
		raw?.order_id ?? raw?.id ?? raw?.order?.id ?? raw?.unpaid_order?.id ?? undefined;
	return { order_id, raw };
}
