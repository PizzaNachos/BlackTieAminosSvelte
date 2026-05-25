<script lang="ts">
    import { browser } from "$app/environment";
    import { cart_contents, check_out, get_line_items_to_checkout } from "$lib/stores/cart";
    import { json } from "@sveltejs/kit";
    import { onMount } from "svelte";
</script>

<div>
    <div id="loading_text">
        Loading Checkout
        <div>
            <div id="dots1">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </div>
    
</div>

<style>
    #loading_text{
        background-color: var(--accent-200);
        padding: 5em;
        font-size: x-large;
        border-radius: 10px;
        border: 2px solid var(--accent-color);
        margin: 5em 0;
    }
    #dots1 {
        display: block;
        position: absolute;
        height: 50px;
        width: 50px;
        margin: -25px 0 0 -25px;
    }

    #dots1 span {
        position: absolute;
        width: 10px;
        height: 10px;
        background: rgba(0, 0, 0, 0.25);
        border-radius: 50%;
        -webkit-animation: dots1 1s infinite ease-in-out;
                animation: dots1 1s infinite ease-in-out;
    }

    #dots1 span:nth-child(1) {
    left: 0px;
    -webkit-animation-delay: 0.2s;
            animation-delay: 0.2s;
    }

    #dots1 span:nth-child(2) {
    left: 15px;
    -webkit-animation-delay: 0.3s;
            animation-delay: 0.3s;
    }

    #dots1 span:nth-child(3) {
    left: 30px;
    -webkit-animation-delay: 0.4s;
            animation-delay: 0.4s;
    }

    #dots1 span:nth-child(4) {
    left: 45px;
    -webkit-animation-delay: 0.5s;
            animation-delay: 0.5s;
    }

    @keyframes dots1 {
    0% {
        -webkit-transform: translateY(0px);
                transform: translateY(0px);
        -webkit-transform: translateY(0px);
                transform: translateY(0px);
        background: rgba(0, 0, 0, 0.25);
    }
    50% {
        -webkit-transform: translateY(10px);
                transform: translateY(10px);
        -webkit-transform: translateY(10px);
                transform: translateY(10px);
        background: #000000;
    }
    100% {
        -webkit-transform: translateY(0px);
                transform: translateY(0px);
        -webkit-transform: translateY(0px);
                transform: translateY(0px);
        background: rgba(0, 0, 0, 0.25);
    }
    }
    @-webkit-keyframes dots1 {
    0% {
        -webkit-transform: translateY(0px);
                transform: translateY(0px);
        background: rgba(0, 0, 0, 0.25);
    }
    50% {
        -webkit-transform: translateY(10px);
                transform: translateY(10px);
        background: #000000;
    }
    100% {
        -webkit-transform: translateY(0px);
                transform: translateY(0px);
        background: rgba(0, 0, 0, 0.25);
    }
    }
</style>