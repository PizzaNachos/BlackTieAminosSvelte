<script lang="ts">
    import Cart from "$lib/cart/Cart.svelte";
</script>

<div class="cart_page_wrapper">
    <Cart />
</div>

<style>
    .cart_page_wrapper{
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;

        padding: 3rem 1rem;
        font-size: 1.75rem;
        text-align: center;
        position: relative;

        background-color: var(--accent-900);
    }
</style>