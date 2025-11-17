<script lang="ts">
    import { add_to_cart } from "$lib/stores/cart";
    import type { product } from "$lib/interfaces";
    import Star from "$lib/icons/Star.svelte";
    import { browser } from "$app/environment";
    import { reviews_store } from "$lib/stores/reviews";
    import { get } from "svelte/store";
  
    export let me;
    export let click_function;

    let items;
    let multi = false;
    if(me?.multi == true){
      multi = true;
      items = me.items
      me = me.items[0]
    }
  
    let my_nums_reviews = get(reviews_store).filter(r => r.toffee_key.includes(me?.alias)).length
    let my_rating = Math.ceil(get(reviews_store).filter(r => r.toffee_key.includes(me.alias)).reduce((a,b) => a + b.rating, 0) / my_nums_reviews);
  
    let stars = Array.from("0".repeat(my_rating ?? 0));
    function handle_click() {
      add_to_cart(me);
    }
  
    const random_time = () =>{
      return Math.random() * 10 + 3;
    }
  
    let image_index = 0;
    let max_index = (me?.featured_image_url_paths?.length - 1) ?? 0;
    function toggle_image(time){
      image_index = (image_index >= max_index) ? 0 : image_index + 1;
      setTimeout(() => toggle_image(random_time()), time * 1000);
    }
    
    setTimeout(() => toggle_image(random_time()), random_time() * 1000);
  </script>

  <div class="cart_item" on:click={click_function}>
    <img class="toffee_thumbnail" src={me.product_image_url_paths[0]} alt="Toffee Thumbnail"/>
    <div class="center">
        <div>{me.name}</div>
        <div class="row">
            <div class="stars">
            {#if my_nums_reviews > 0}
                {#each stars as r}
                    <Star height=1em width=1em/>
                {/each}
            {/if}
            </div>
            <div class="price">
                ${me.price / 100}
            </div>
        </div>
    </div>  
</div>

  <style>
    @media (max-width: 40rem) {
    .cart_item {
      display: grid;
      gap: 7px;
      grid-template-columns: 5em 1fr;
      justify-items: start;
      align-items: stretch;
      background-color: var(--accent-800);
      padding-right: .5em;
    }
    .center {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      text-wrap: wrap;
      padding: 0.5em 0;
      width: 100% ;
    }
    .end {
      display: flex;
      gap: 1em;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-end;
      padding: 0.25em 0.25em 1em 0;
      justify-self: end;
      font-size: 0.9em;
    }
    .end > div {
      padding-right: 0.5em;
    }
  }
  @media (min-width: 40rem) {
    .cart_item {
      display: grid;
      justify-items: start;
      align-items: stretch;

      gap: 1rem 1rem;
      grid-template-columns: 5em 1fr;
      padding-right: 1em;
      background-color: var(--accent-800);
    }
    .center {
      display: flex;
      gap: .5em;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      text-wrap: wrap;
      padding: 0.5em 0;
      width: 100% ;
    }
    .end {
      display: flex;
      gap: 1em;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-end;
      padding: 0.25em 0.25em 1em 0;
      justify-self: end;
    }
    .end > div {
      padding-right: 1em;
    }
  }
  .toffee_thumbnail {
    height: 5em;
    width: auto;
  }
  .row{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
  </style>
  