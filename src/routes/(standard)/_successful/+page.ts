import { ProductType, type product } from '$lib/interfaces';
import { get_prod_by_page_key, get_upsells } from '$lib/stores/products';
import { reviews_store } from '$lib/stores/reviews';
import { get } from 'svelte/store';
import { get_my_type_object } from '$lib/stores/product_types';
import { browser } from '$app/environment';
import { app_config } from '$lib/config.js';


export const load = (async ({ fetch, params, url }) => {
    let renderable_data = {
        valid: false,
        order: {}
    }
    if (browser) {
        try {
            let res = await fetch(`${app_config.api_base}/aapii/order/${url.searchParams.get('id')}`)
            res = await res.json()
            renderable_data.valid = true
            renderable_data.order = res
        } catch (e) {
            renderable_data.valid = false
        }
    }
    return renderable_data
});