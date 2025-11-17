<script lang="ts">
  import MultiCart from "$lib/cart/multi_cart/MultiCart.svelte";


</script>

<div class="centered">
    <h1>Multi Order Cart</h1>
    <div class="instructions">
      How does it work?

      If you want to place an order that will be shipped to multiple locations — 
      like sending one box of toffee to your parents in Maine and two boxes to friends in California 
      (a total of three pounds and two shipments)—you can use this form to combine all your orders into a single payment.
    </div>
    <MultiCart/>
</div>

<style>
  .instructions{
    max-width: 85ch;
  }
  .centered {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>