
<!-- 
<script lang="ts">
  // throw new Error("@migratio task: Add data prop (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292707)");

  import Product from "$lib/product/Product.svelte";
  import ReviewWrapper from "$lib/ReviewWrapper.svelte";
  import { browser } from "$app/environment";
  import { beforeNavigate } from "$app/navigation";
  import { toffees_store, candies_store, premium_reserve } from "$lib/stores/products.js";
  import { get } from "svelte/store";
  import { reviews_store } from "$lib/stores/reviews.js";
  import FeaturedProduct from "$lib/product/FeaturedProduct.svelte";

  let toffees  = get(toffees_store);
  let candies = get(candies_store);
  let premium = get(premium_reserve);
  let reviews = get(reviews_store);

</script>

<svelte:head>
  <title>Colorado Toffee</title>
   <link rel="icon" href="./favicon.png" />

  <meta
    name="description"
    content="The Best Hand Made, Small Batch, Almond Toffee Straight From Colorado"
  />
  <meta name="keywords" content="toffee, almond toffee, colorado toffee" />
</svelte:head> -->

<!-- <section>
  
  <div class="section_heading">Featured Product</div>
     <div class="products_section">
      <FeaturedProduct me={premium} />
    </div> 
    <div class="section_heading">Small Batch Handmade Almond Toffee</div>

    <div class="products_section first" id="product_section">
      {#each toffees as pro, i}
        <div id={`prod${i}`} class="product_scroll_wrapper">

          <Product me={pro} />
        </div>
      {/each} 
  </div>

  <div class="section_heading">Gourmet Candies</div>

  <div class="products_section second">
    {#each candies as can, i }
      <div id={`prod${i + toffees.length}`} class="product_scroll_wrapper">
        <Product me={can} />
      </div>
    {/each}
  </div>

  <div class="section_heading">Featured Reviews</div>
  <ReviewWrapper products={[...toffees, ...candies]} {reviews} filtered_params={{ featured: true }} />
  <div class="review_buttons">
    <a data-sveltekit-preload-code="viewport" id="write_reviews_button" class="trackable" href="/write_review/">
      <span>
        Leave us a review
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="black" class="bi bi-arrow-right-circle trackable" viewBox="0 0 16 16">
          <path
            fill-rule="evenodd"
            d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
          />
        </svg>
      </span>
    </a>
    <a data-sveltekit-preload-code="viewport" id="all_reviews_button" href="/reviews/" class="trackable">
      <span>
        View all reviews
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          fill="black"
          class="bi bi-arrow-right-circle"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
          />
        </svg>
      </span>
    </a>
  
  </div>
  
  <div id="faq">
    <h1>FAQ:</h1>
    <div class="paragraph">
      <div class="question">Q: Is my payment secure?</div>
      <div class="answer">
        A: Yes! I use a payment proscessor named 
        <a href="https://stripe.com/">Stripe</a>
        which powers payments for over a million companies on the internet. I never
        see your payment details.
      </div>
    </div>
    <div class="paragraph">
      <div class="question">Q: Can I change my order and add things?</div>
      <div class="answer">
        A: Yes! As long as your order has not shipped yet you can contact me at
        <a href="mailto:info@coloradotoffee.com">info@coloradotoffee.com</a>
        to change your order.
      </div>
    </div>
    <div class="paragraph">
      <div class="question">
        Q: What makes your toffee so much better than other toffee's I have
        tried?
      </div>
      <div class="answer">
        A: I use the freshest ingredients I can get my hands on, I never add any
        artificial preservatives or bad tasting emulsifiers, I use family
        techniques that have been passed down through the generations, and I
        make every order fresh. I strongly believe that this makes the best
        Toffee money can buy.
      </div>
    </div>
    
    <br/>
    <div>
      Have a Question not listed? Ask me <a href="mailto:info@coloradotoffee.com">info@coloradotoffee.com</a>
    </div>
  </div>
</section> -->

<!-- <style>
  @media (pointer: coarse) {
    .product_scroll_wrapper{
      border-right: 1px solid rgba(0, 0, 0,0);
    }
    .highlighted {
      border-radius: 0 5px 5px 0;
      background-color: var(--accent-950);
    }

  }
  .first_wrapper{
    display: grid;
    grid-template-columns: 2fr 3fr;
    /* flex-direction: row; */
    gap:1em;
    padding: 0 5rem;
  }
  .product_scroll_wrapper{
    transition: all .5s ease;
  }
  section {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 10vh;
  }
  .products_section {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;

    gap: 2rem;
  }
  @media (max-width: 40rem){
    .review_buttons{
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
  }
  }
  @media (min-width: 40rem){
    .review_buttons{
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 1rem;
  }
  }
  #all_reviews_button,#write_reviews_button {
    display: flex;
    justify-content: center;
    align-items: center;

    font-size: x-large;
    background-color: var(--accent-700);

    padding: 2rem;
    border-radius: 5px;
  }

  .section_heading {
    padding: 2rem 1rem 2rem 1rem;
    font-weight: bold;
    font-size: xx-large;
  }
  .second {
    margin-bottom: 2rem;
  }
  #faq {
    padding: 2ch;
    max-width: 100ch;
    font-size: larger;
  }
  .answer {
    text-indent: 1em;
  }
  .paragraph {
    font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
      "Lucida Sans", Arial, sans-serif;
    font-size: large;
    text-align: left;
    line-height: 1.4em;
    margin-bottom: 1em;
  }
</style> -->
