<script lang="ts">
  import { browser } from "$app/environment";
  import { beforeNavigate } from "$app/navigation";
  import type { review, filter_definition } from "$lib/interfaces";
  import { fade } from "svelte/transition";
  import { all_products_store } from "./stores/products";
  import { get } from "svelte/store";
  import FilledCheck from "./icons/FilledCheck.svelte";
  import Star from "./icons/Star.svelte";

  export let reviews: review[] = [];

  let products = get(all_products_store)
    .map((r) => r.prods)
    .flat();

  export let filtered_params: filter_definition = {};

  let filtered_reviews: review[] = [];
  $: filtered_reviews = filtered_params
    ? reviews
        .filter((review, index) => {
          let pass = true;

          pass = pass
            ? filtered_params.featured
              ? review.featured
              : pass
            : pass;
          pass = pass
            ? filtered_params.max_values
              ? index <= filtered_params.max_values
              : pass
            : pass;
          pass = pass
            ? filtered_params.product_key
              ? review.toffee_key.includes(filtered_params.product_key)
              : pass
            : pass;
          pass = pass
            ? filtered_params.stars
              ? filtered_params.stars.includes(review.rating)
              : pass
            : pass;

          return pass;
        })
        .sort((a, b) => {
          return -a.date.split(" ")[0].localeCompare(b.date.split(" ")[0]);
        })
    : reviews;

  const big_size = 300;
  const medium_size = 200;
  const short_size = 100;

  let in_viewport: boolean[] = [];
  in_viewport.length = filtered_reviews.length;

  let check_viewport = (id: any) => {
    if (browser) {
      const box = document.getElementById(id);
      const rect = box?.getBoundingClientRect();
      const center = ((rect?.bottom ?? 0) + (rect?.top ?? 0)) / 2;
      if (center <= 0) return false;

      const height = window?.visualViewport?.height ?? 100;
      const middle = height / 2;
      const range_numer = middle / 3;
      let in_center =
        center < middle + range_numer && center > middle - range_numer;
      return in_center;
    }
    return false;
  };

  //TODO check if first one is wayy below us, if it is immediatly break loop,
  //Maybe check if the review wrapper is even in viewport and break if it isnt?
  function check_all_viewport() {
    for (let i = 0; i < filtered_reviews.length; i++) {
      let me = check_viewport(`rev${filtered_reviews[i].id}`);
      in_viewport[i] = me;
    }
  }
  check_all_viewport();

  const debounce_time = 100;
  let last_time = Date.now();
  const hightlight_function = (event: any) => {
    if (Date.now() - last_time < debounce_time) {
      return;
    }
    last_time = Date.now();
    check_all_viewport();
  };
  if (browser) {
    document.addEventListener("scroll", hightlight_function);
  }

  beforeNavigate(() =>
    document.removeEventListener("scroll", hightlight_function)
  );
</script>

<div class="all_reviews" id="review_wrapper">
  {#each filtered_reviews as r, i (i)}
    <div
      class="review outliend"
      id={`rev${r.id}`}
      class:short={r.review_text.length < short_size}
      class:small_medium={r.review_text.length > short_size &&
        r.review_text.length < medium_size}
      class:big_medium={r.review_text.length > medium_size &&
        r.review_text.length < big_size}
      class:big={r.review_text.length > big_size}
      class:outlined={in_viewport[i] == true}
    >
      <span class="rating">
        <span>
          {#each Array.from("0".repeat(r.rating)) as _}
            <Star />
          {/each}
        </span>
        <span>
          <FilledCheck />
          Verified Review
        </span>
      </span>
      <span class="review_text">
        {r.review_text}
      </span>
      <span class="review_name_products">
        <span>
          {r.name}
        </span>

        {#if products != undefined}
          <span class="review_name_products_product">
            {#each products
              .filter((p) => r?.toffee_key?.includes(p.alias))
              .map((t) => t.name) as p_name}
              <span>{p_name}</span>
              <br />
            {/each}
          </span>
        {/if}
      </span>
      <!-- <span>
        {#if new Date(r.date).get}{/if}
        {r.date.split(" ")[0]}
      </span> -->
    </div>
  {/each}

  {#if filtered_reviews.length == 0}
    There were no reviews found
  {/if}
</div>

<style>
  @media (pointer: coarse) {
    .review.outlined {
      border-radius: 10px;
      border: 2px solid var(--accent-200);
      background-color: var(--accent-750);
    }
  }
  @media (pointer: fine) {
    .review.outined {
    }
    .review:hover {
      border-radius: 10px;
      border: 2px solid var(--accent-200);
      background-color: hsl(21, 18%, 75%);
    }
  }
  @media (max-width: 40rem) {
    .all_reviews {
      grid-template-columns: 1fr;
    }
  }
  @media (min-width: 45rem) {
    .all_reviews {
      /* 22 Rem average width */
      grid-template-columns: 1fr 1fr;
    }
  }
  @media (min-width: 65rem) {
    .all_reviews {
      /* 20 Rem average width */
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
  @media (min-width: 90rem) {
    .all_reviews {
      /* 21 Rem average width */
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }
  }
  .all_reviews {
    display: grid;

    gap: 1rem;
    justify-items: stretch;
    padding-bottom: 2rem;
    /* margin: 1rem; */
  }
  .review {
    background-color: var(--accent-color);
    padding: 1em;
    cursor: default;
    display: grid;
    grid-template-rows: 1.5rem 1fr auto 1em;
    gap: 1rem;

    transition: all 0.5s ease;
    border: 2px solid rgba(0, 0, 0, 0);
  }
  .rating {
    height: 100%;
    font-weight: normal;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .review_name_products {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1rem;
  }
  .review_text {
    text-indent: 1em;
    line-height: 1.2em;
    font-size: 1.1em;
  }

  .big {
    grid-row: auto / span 6;
  }
  .big_medium {
    grid-row: auto / span 4;
  }
  .small_medium {
    grid-row: auto / span 4;
  }
  .short {
    grid-row: auto / span 3;
  }
</style>
