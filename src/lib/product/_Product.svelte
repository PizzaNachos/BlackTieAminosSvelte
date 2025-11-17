<script lang="ts">
  import { add_to_cart } from "$lib/stores/cart";
  import type { product } from "$lib/interfaces";
  import Star from "$lib/icons/Star.svelte";

  export let me: product;

  let stars = Array.from("0".repeat(me.rating ?? 0));

  function handle_click() {
    add_to_cart(me);
  }

  const random_time = () => {
    return Math.random() * 10 + 3;
  };

  let image_index = 0;
  let max_index = me?.featured_image_url_paths?.length - 1 ?? 0;
  function toggle_image(time) {
    image_index = image_index >= max_index ? 0 : image_index + 1;
    setTimeout(() => toggle_image(random_time()), time * 1000);
  }

  setTimeout(() => toggle_image(random_time()), random_time() * 1000);
</script>

<div class="product trackable" id={me.stripe_key}>
  <a
    data-sveltekit-preload-code="eager"
    href="/products/{me.alias}"
    class="images same_width trackable"
    id={me.alias + "_page"}
  >
    {#if me.annotation}
      <div class="annotation">{me.annotation}</div>
    {/if}
    <div
      class="overlay image same_width trackable"
      id={me.alias + "_page"}
      style:background={"var(--accent-200)"}
      alt="1 pound of Toffee"
    ></div>
    {#each me?.featured_image_url_paths as image, index}
      <div
        class:shown={image_index == index}
        class:hidden={image_index !== index}
        class="overlay image same_width trackable"
        id={me.alias + "_page"}
        style:background-image={`url(${image})`}
        alt="1 pound of Toffee"
      ></div>
    {/each}
    <div class="product_page_button trackable" id={me.alias + "_page"}>
      <span>View</span>
    </div>
  </a>

  <div class="details">
    <span class="name">
      {me.name}
    </span>
    {#if me.rating}
      <div class="stars">
        {#each stars as r}
          <Star height="16" width="16" />
        {/each}
        ({me.number_of_ratings})
      </div>
    {/if}
    <span class="price">- ${Math.round(me.price / 100)} / {me.unit} -</span>

    {#if me.out_of_stock}
      <button
        id={me.alias + "_addToCart"}
        class="out_of_stock price trackable"
        on:click={() => {}}
      >
        Out Of Stock
      </button>
    {:else}
      <button
        id={me.alias + "_addToCart"}
        class="add_to_cart price trackable"
        on:click={handle_click}
      >
        Add to cart
      </button>
    {/if}
  </div>
</div>

<style>
  @media (max-width: 35rem) {
    .same_width {
      width: 45vw;
      height: 45vw;
      aspect-ratio: 1/1;
    }
    .product {
      width: 95vw;
      display: grid;
      grid-template-columns: 1fr 1fr;
      overflow: hidden;
    }
    .details {
      display: flex;
      flex-direction: column;

      justify-content: space-around;
      align-items: flex-start;
    }
  }
  @media (min-width: 35rem) {
    .same_width {
      width: 11rem;
      height: 11rem;
    }
    .product {
      width: 11rem;
    }
    .details {
      display: flex;
      flex-direction: column;

      justify-content: space-between;
      align-items: flex-start;
      gap: 5px;
    }
  }
  @media (min-width: 70rem) {
    .same_width {
      width: 11rem;
      height: 11rem;
    }
    .product {
      width: 11rem;
    }
  }
  @media (min-width: 90rem) {
    .same_width {
      width: 15rem;
      height: 15rem;
    }
    .product {
      width: 15rem;
    }
  }
  @media (min-width: 125rem) {
    .same_width {
      width: 20rem;
      height: 20rem;
    }
    .product {
      width: 20rem;
    }
  }
  .product {
    text-align: left;
    color: var(--text_color);
  }
  .name {
    font-size: large;
  }
  .stars {
    font-size: large;
  }
  .star {
    margin-right: 2px;
  }
  .price {
    font-size: large;
  }
  .add_to_cart {
    background-color: var(--accent-500);
    color: var(--text_color);

    padding: 0.5rem;
    border-radius: 0;
    border: 2px solid rgba(0, 0, 0, 0);

    text-decoration: none;
    cursor: pointer;
    text-align: center;
    transition:
      all 250ms ease-in-out,
      transform 150ms ease;

    touch-action: manipulation;
  }
  .add_to_cart:hover {
    border-radius: 10px;
    background-color: var(--accent-700);
    border: 2px solid var(--accent-200);
  }

  .out_of_stock {
    background-color: var(--accent-800);
    color: var(--accent-500);

    padding: 0.5rem;
    border-radius: 0;
    border: 2px solid rgba(0, 0, 0, 0);

    text-decoration: none;
    cursor: default;
    text-align: center;
    transition:
      all 250ms ease-in-out,
      transform 150ms ease;

    touch-action: none;
  }
  /* .out_of_stock:hover {
    border-radius: 10px;
    background-color: var(--accent-700);
    border: 2px solid var(--accent-200);
  } */

  .images {
    position: relative;
    overflow: hidden;
    display: block;
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    width: 100%;
    height: 100%;
    background-size: cover;
    transition: all 2s linear;
  }
  .annotation {
    text-align: center;
    position: absolute;
    top: 0;
    left: 0;
    transform: rotate(-45deg) translate(-4rem, -1.5rem);
    background-color: var(--accent-color);
    color: var(--text_color);
    padding: 5px 4rem;

    font-size: 1.4rem;
    z-index: 1;
    inline-size: min-content;
    width: max-content;
  }
  .hidden {
    opacity: 0;
  }
  .shown {
    opacity: 1;
  }
  .product_page_button {
    position: relative;
    height: 100%;
    width: 100%;
    text-align: center;
    background-color: none;
    border: 2px solid rgba(0, 0, 0, 0);
    opacity: 0;
    transition: all 0.25s ease;
  }
  .product_page_button:hover {
    opacity: 1;
  }
  .product_page_button span {
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    left: 1rem;
    font-size: larger;
    background-color: var(--accent-800);
    /* border-radius: 10px; */
    padding: 0.5rem 0;
    bottom: 0.5rem;
    right: 1.5rem;
    left: 1.5rem;
    border: 2px solid rgba(0, 0, 0, 0);
    transition: all 0.4s ease;
  }
  .product_page_button span:hover {
    background-color: var(--accent-600);
    border-radius: 10px;
    padding: 0.5rem 0;
    bottom: 0.5rem;
    right: 1.5rem;
    left: 1.5rem;
    border: 2px solid black;
  }
</style>
