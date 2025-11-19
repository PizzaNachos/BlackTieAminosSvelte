<script lang="ts">
  import Cart from "./Cart.svelte";
  import { cart_contents  } from "$lib/stores/cart";
  import { blur, fly } from "svelte/transition";
  import { cubicOut } from 'svelte/easing';
  import {beforeNavigate,} from '$app/navigation';
  import { browser } from "$app/environment";
  import type { cart_product } from "$lib/interfaces";
  import XIcon from "$lib/icons/XIcon.svelte";
  beforeNavigate(() => {shown = false;})

  export let fill = "black";

  let shown = false;
  let cart_length;
  cart_contents.subscribe((contents) => {
    if (contents.length > 0) {
      cart_length = contents.filter((a:cart_product) => a.product.alias != "ship").map((a) => a.ammount).reduce((a, b) => a + b, 0);
    } else {
      cart_length = 0;
    }
  });

  let is_cart_in_viewport = true;
  function check_scroll(){
    const currentScroll = window.scrollY;

    if(currentScroll > 60){
      is_cart_in_viewport = false
    } else {
      is_cart_in_viewport = true;
    }
  }



  const debounce_time = 100;
  let last_time = Date.now();
  const scroll_function = (event) => {
      if(Date.now() - last_time < debounce_time){
          return;
      }
      last_time = Date.now();
      check_scroll()
  }
  if(browser){
      check_scroll()
      document.addEventListener('scroll', scroll_function)
  }

  let jiggle = false;
  cart_contents.subscribe((change) => {
    jiggle = true;
    setTimeout(() => jiggle = false, 1010);
  })

  beforeNavigate(() => document.removeEventListener('scroll', scroll_function))
</script>

<div>
  <div class="cart_header_icon {jiggle ? "jiggle":""}">
    <button class="cart_button" on:click={() => (shown = !shown)}>
      <svg id="cart_icon" xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" class="icon trackable" viewBox="0 0 16 16"
      >
        <path
          d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
        />
      </svg>
    </button>
    {#if cart_length > 0}
      <div class="cart_count">
        {cart_length }
      </div>
    {/if}
  </div>
  {#if !is_cart_in_viewport}
    <div in:blur|global class="second_cart_header_icon {jiggle ? "jiggle":""}">
      <button class="cart_button" on:click={() => (shown = !shown)}>
        <svg id="cart_icon" xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" class="icon trackable" viewBox="0 0 16 16"
        >
          <path
            d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
          />
        </svg>
      </button>
      {#if cart_length > 0}
        <div class="cart_count">
          {cart_length}
        </div>
      {/if}
    </div>
  {/if}
 
  {#if shown}
    <div transition:fly|global={{ delay: 0, duration: 300, x: window.innerWidth, y: 0, opacity: .5 }} class="cart_drawer">
      <div class="cart_drawer_header"> 
        <button class="close_button" on:click={() => (shown = !shown)}>
         <XIcon width="25" height="25"/>
        </button>
      </div>

      <Cart />
    </div>
  {/if}
</div>

<style>
  @media (max-width: 40rem) {
    .cart_drawer{
        height: 100vh;
        padding: 1em 5vw;
        top: 0;
        right: 0;
        left: 0;
    }
  }
  @media (min-width: 40rem) {
    .cart_drawer{
        width: 100%;
        height: 100%;
        padding: 1em;
    }
  }
  @media (min-width: 70rem) {
    .cart_drawer{
        width: max-content;
        height: 100%;
        padding: 1em;

    }
  }
  @media (min-width: 90rem) {
    .cart_drawer{
        width: max-content;
        height: 100%;
        padding: 1em;

    }
  }
  @media (min-width: 125rem) {
    .cart_drawer{
        width: max-content;
        height: 100%;
        padding: 1em;

    }
  }
  .cart_drawer {
    background-color: var(--accent-700);
    position: fixed;
    right: 0;
    top: 0;
    overflow: scroll;

    z-index: 10;
    box-shadow: 0 0 20px 0 black;
  }
  .cart_drawer_header{
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    width: 100%;
  }
  .close_button{
    padding-left: 2rem;
    background: none;
  }
  .second_cart_header_icon {
    animation: enter .25s;
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: var(--accent-300);
    border-radius: 100%;
    box-shadow: 0 0 10px black;
    padding: 1em;
    fill: white;
    opacity: 1;
  }

  .cart_header_icon {
    position: relative;
  }
  @keyframes enter{
    0%{
      opacity: 0;
    }
    100%{
      opacity: 1;
    }
  }


  .cart_button {
    background: none;
  }
  #cart_icon{
    font-size: 8rem;
  }
  .cart_count {
    position: absolute;
    top: -.5rem;
    right: -.5rem;
    color: rgb(0, 0, 0);
    background-color: rgb(255, 255, 255);
    border-radius: 100%;
    padding: 0 3px;
  }

  .jiggle{
    animation: jiggle .25s
  }
  @keyframes jiggle{
    0%{
      transform: translate(0,0);
    }
    33%{
      transform: translate(.25em,0);
    }    
    66%{
      transform: translate(-.25em,0);
    }    
    100%{
      transform: translate(0,0);
    }
  }
</style>
