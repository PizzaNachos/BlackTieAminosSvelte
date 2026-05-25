import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import type { ContactDetails } from '$lib/stores/cart';

export interface LastOrder {
	order_id?: string | number;
	submittedAt: number;
	contact: ContactDetails;
	raw: unknown;
}

const STORAGE_KEY = 'bta_last_order_v1';

function loadInitial(): LastOrder | null {
	if (!browser) return null;
	try {
		const raw = sessionStorage.getItem(STORAGE_KEY);
		if (!raw) return null;
		return JSON.parse(raw);
	} catch {
		return null;
	}
}

export const lastSubmittedOrder = writable<LastOrder | null>(loadInitial());

if (browser) {
	lastSubmittedOrder.subscribe((v) => {
		try {
			if (v) sessionStorage.setItem(STORAGE_KEY, JSON.stringify(v));
			else sessionStorage.removeItem(STORAGE_KEY);
		} catch {
			// ignore
		}
	});
}
