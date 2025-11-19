import { ProductType, type product } from '$lib/interfaces';
import { get_prod_by_page_key, get_upsells } from '$lib/stores/products';
import { reviews_store } from '$lib/stores/reviews';
import { get } from 'svelte/store';
import { get_my_type_object } from '$lib/stores/product_types';
import type { EntryGenerator } from './$types';
import { all_products_store } from '$lib/stores/products';

export const prerender = true;

/** @type {import('./$types').PageLoad} */
export const load = (async ({ fetch, params }) => {
  console.log("Load called for product", params.page)
  const me: product = get_prod_by_page_key(params.page)

  // let reviews = get(reviews_store);
  // reviews = reviews.filter(r => r.toffee_key.includes(me?.alias ?? 'broken'));
  let upsells = get_upsells(me.alias);

  let my_question = get_my_type_object(me.product_type ?? ProductType.peptide)
  if (me?.multi) {
    my_question = get_my_type_object(me?.items?.at(0)?.product_type ?? ProductType.peptide)
  }

  return {
    product: me,
    upsells: upsells,
    question: my_question
  };
});

export const entries: EntryGenerator = () => {
  let building = [];
  let all_prods = get(all_products_store).map(r => r.prods.map(r => r.multi ? r.items : r)).flat(2).map(r => r?.alias ?? "")

  for (const prod of all_prods) {
    building.push({
      page: prod
    })
  }
  return building;
};