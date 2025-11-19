<script lang="ts">
  import { goto } from "$app/navigation";
  import { app_config } from "$lib/config";
  import type { product } from "$lib/interfaces";
  import Product from "$lib/product/_Product.svelte";
  import { all_products_store } from "$lib/stores/products";

  export let product: product;
  let review = {
    user_name: "",
    review_text: "",
    product_id: product?.id ?? "",
    review_rating: "5",
  };
  let loading = false;
  let error;
  function post_review() {
    loading = true;
    // console.log(review, event);
    fetch(`${app_config.api_base}/aapii/review`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(review),
    }).then(async (res) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      loading = false;
      if (res.status == 201) {
        goto("/");
      } else {
        error = "Please fill out every field";
      }
    });
  }
  let all_products: product[];
  all_products_store.subscribe((p) => {
    all_products = p.map((wtf) => wtf.prods).flat(2);
  });
</script>

<div>
  <div class="form_wrapper">
    <h1>Leave us a review!</h1>
    <div class="input_wrapper">
      <!-- {#if error}
            <span in:fade|global="{{duration: 250 }}" class=error>{error}</span>
        {/if} -->
      <input
        bind:value={review.name}
        class="input_element"
        type="text"
        placeholder="Name"
      />
      <textarea
        bind:value={review.review_text}
        class="input_element"
        id="review_text"
        rows="5"
        cols="33"
        placeholder="review"
        spellcheck="true"
      ></textarea>
      {#if product != null}
        <select
          bind:value={review.product_id}
          class="input_element"
          id="toffee_selector"
        >
          {#each all_products as prod}
            <option value={prod.id}>{prod.name}</option>
          {/each}
          <option value="dark">classic Chocolate Almond Toffee</option>
          <option value="milk">Milk Chocolate Almond Toffee</option>
          <option value="spicy">Spicy Chocolate Almond Toffee</option>
          <option value="salty">Salted Chocolate Almond Toffee</option>
          <option value="pecan">Pecan Brittle</option>
          <option value="butterscotch">Old Fashioned Butterscotch Chews</option>
          <option value="bourbon_butterscotch"
            >Bourbon Butterscotch Butterscotch Chews</option
          >
          <option value="habenero_butterscotch"
            >Habenero Butterscotch Chews</option
          >
        </select>
      {:else}
        <select
          bind:value={review.toffee_type}
          class="input_element"
          id="toffee_selector"
        >
          <option value="dark">classic Chocolate Almond Toffee</option>
          <option value="milk">Milk Chocolate Almond Toffee</option>
          <option value="spicy">Spicy Chocolate Almond Toffee</option>
          <option value="salty">Salted Chocolate Almond Toffee</option>
          <option value="pecan">Pecan Brittle</option>
          <option value="butterscotch">Old Fashioned Butterscotch Chews</option>
          <option value="bourbon_butterscotch"
            >Bourbon Butterscotch Butterscotch Chews</option
          >
          <option value="habenero_butterscotch"
            >Habenero Butterscotch Chews</option
          >
        </select>
      {/if}

      <select
        bind:value={review.toffee_rating}
        class="input_element"
        id="toffee_selector"
      >
        <option value="5">5/5</option>
        <option value="4">4/5</option>
        <option value="3">3/5</option>
        <option value="2">2/5</option>
        <option value="1">1/5</option>
      </select>
    </div>
    {#if loading}
      <div in:fade|global={{ duration: 250 }} class="col-sm-2">
        <div id="dots1">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    {:else}
      <button class="input_element" on:click={(event) => post_review(event)}
        >Submit</button
      >
    {/if}
  </div>
</div>

<style>
</style>
