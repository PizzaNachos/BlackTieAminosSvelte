<script lang="ts">
  import XIcon from "$lib/icons/XIcon.svelte";
  import MultiSelectProduct from "./MultiSelectProduct.svelte";

  export let products: any[] = [];
  export let select_function: any;
  export let close_function: any;
  export let title;
</script>

<div class="container">
  <div class="row">
    <span class="h2">{title}</span>
    <span on:click={close_function}>
      <XIcon />
    </span>
  </div>
  <div class="product_grid">
    {#each products as me}
      <MultiSelectProduct
        {me}
        click_function={() => select_function(me.stripe_key)}
      />
    {/each}
  </div>
</div>

<style>
  .container {
    position: relative;
    top: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 15px;
  }
  .row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .h2 {
    font-size: 1.4em;
  }
  .product_grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 5px;
    justify-items: stretch;
    align-items: stretch;
  }
</style>
