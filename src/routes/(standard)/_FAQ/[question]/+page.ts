import { type product } from '$lib/interfaces';
import { get_prod_by_page_key, get_upsells } from '$lib/stores/products';
import { reviews_store } from '$lib/stores/reviews';
import { get } from 'svelte/store';
import { get_my_type_object } from '$lib/stores/product_types';
import { question_answers } from '$lib/stores/QA';
import type { EntryGenerator } from './$types';


export const prerender = true;
export const load = (async ({ fetch, params }) => {
  // console.log(params.question)
  const my_index = question_answers.findIndex(q => q.question.replace("?", "") == params.question.replace("?", ""));

  return {
    all: question_answers,
    my_index: my_index
  };
});

export const entries: EntryGenerator = () => {
  let building = [];
  for (const question of question_answers) {
    building.push({
      question: question.question
    })
  }
  return building;
};