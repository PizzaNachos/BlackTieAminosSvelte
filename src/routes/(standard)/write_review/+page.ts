import { ProductType, type product } from '$lib/interfaces';
import { get_prod_by_page_key, get_upsells } from '$lib/stores/products';
import { reviews_store } from '$lib/stores/reviews';
import { get } from 'svelte/store';
import { get_my_type_object } from '$lib/stores/product_types';
import { browser } from '$app/environment';
import { app_config } from '$lib/config.js';


export const load = (async ({ fetch, params, url }) => {
    let existing_order = {
        has_order: false,
        order: {},
        uuid: null,
    }
    if (browser && url.searchParams.get('order_id')) {
        existing_order.uuid = url.searchParams.get('order_id');
        try {
            let res = await fetch(`${app_config.api_base}/aapii/order/${existing_order.uuid}`)
            res = await res.json()
            existing_order.has_order = true
            existing_order.order = res
        } catch (e) {
            existing_order.has_order = false
        }
    }
    return existing_order
});