<script lang="ts">
    // throw new Error("@migratio task: Add data prop (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292707)");
    import { empty_cart } from "$lib/stores/cart";
    empty_cart()
</script>
<div>
    <span>
        Thank you so much for purchasing our products, We've recieved your order and are working on it right away!
        For any questions, comments, or concerns don't hesistate to email us at info@coloradotoffee.com
    </span>
</div>
<style>
    div{
        padding: 10% 5%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    span{
        max-width: 70ch;
        text-align: left;
        font-size: 20px;
        letter-spacing: -0.01px;
        line-height: 40px;
        font-weight: 500;
        padding: 0 0 1em 0;
        margin: 0;
        text-indent: 1em;
    }
</style>