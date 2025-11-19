<script lang="ts">
  // import Star from '$lib/icons/Star.svelte';
  import SimpleProduct from "$lib/product/SimpleProduct.svelte";
  import { all_products_store } from "$lib/stores/products";
  import { get } from "svelte/store";
  import IconBanner from "$lib/banners/IconBanner.svelte";
  import DownArrow from "$lib/icons/DownArrow.svelte";
  import { reviews_store } from "$lib/stores/reviews";
  // import DownChevron from '$lib/icons/DownChevron.svelte';
  // import FilledCheck from '$lib/icons/FilledCheck.svelte';

  let products = get(all_products_store);
  console.log(products);

  // let reviews = get(reviews_store).reverse() ?? [];
  // let computed_reviews = [];
  // let small_indexs = [];
  // let medium_indexs = [];
  // for (let i = 0; i < reviews.length; i++) {
  // 	if (reviews?.at(i)?.review_text?.length < 160) {
  // 		small_indexs.push(i);
  // 	}
  // 	if (reviews[i].review_text.length > 160 && reviews[i].review_text.length < 220) {
  // 		medium_indexs.push(i);
  // 	}
  // }

  // let small_index_left = small_indexs.length - 1;
  // let medium_indexs_left = medium_indexs.length - 1;

  // let small_index_right = 0;
  // let medium_indexs_right = 0;

  // for (let i = 0; i < reviews.length; i++) {
  // 	if (
  // 		small_index_right < small_index_left &&
  // 		reviews[i].review_text.length < 160 &&
  // 		small_indexs[small_index_left] &&
  // 		reviews[small_indexs[small_index_left - 1]]
  // 	) {
  // 		computed_reviews.push({
  // 			reviews: [
  // 				reviews[i],
  // 				reviews[small_indexs[small_index_left]]
  // 				// reviews[small_indexs[small_index_left - 1]],
  // 			]
  // 		});
  // 		small_index_right++;
  // 		small_index_left -= 2;
  // 	} else if (
  // 		medium_indexs_right < medium_indexs_left &&
  // 		reviews[i].review_text.length < 220 &&
  // 		medium_indexs[medium_indexs_left]
  // 	) {
  // 		computed_reviews.push({
  // 			reviews: [reviews[i], reviews[medium_indexs[medium_indexs_left]]]
  // 		});
  // 		medium_indexs_right++;
  // 		medium_indexs_left--;
  // 	} else {
  // 		computed_reviews.push({
  // 			reviews: [reviews[i]]
  // 		});
  // 	}
  // }
  // computed_reviews = computed_reviews.concat(computed_reviews).concat(computed_reviews);

  // let first_half_reviews = reviews.slice(0, Math.floor(reviews.length / 2) + 1);
  // let second_half = reviews.slice(Math.floor(reviews.length / 2) + 1);

  // let paused = false;
</script>

<svelte:head>
  <title>Black Tie Aminos</title>
  <link rel="icon" href="/logo.png" />

  <meta
    name="description"
    content="High quality Research compounds, peptides, and chemicals."
  />
  <meta name="keywords" content="peptides, tirzepetide, retatrutide" />
</svelte:head>

<section>
  <div class="parallax_container_splash">
    <div class="parallax_1 parallax_element">
      <img class="" alt="" />
    </div>
    <div class="parallax_2 parallax_element">
      <div class="h1">Black Tie Aminos</div>
      <div class="h2">High Quality Research Compounds</div>
      <a href="/products/" class="shop_now">Shop Now</a>
    </div>
    <div class="down_arrow parallax_element">
      <div
        class="faux_button"
        on:click={() =>
          window.scroll({ top: window.innerHeight - 200, behavior: "smooth" })}
        on:keypress={() =>
          window.scroll({ top: window.innerHeight - 200, behavior: "smooth" })}
      >
        <DownArrow />
      </div>
    </div>
  </div>

  <div class="next">
    <div class="heading_title">Best Sellers</div>
    <div class="best_seller">
      {#if products[0]?.prods[0]}
        <SimpleProduct me={products[0]?.prods[0]} featured={true} />
      {/if}
      {#if products[0]?.prods[1]}
        <SimpleProduct me={products[0]?.prods[1]} featured={true} />
      {/if}

      {#if products[1]?.prods[0]}
        <SimpleProduct
          me={products[1]?.prods[0]}
          featured={true}
          hide_small={true}
        />
      {/if}

      {#if products[2]?.prods[0]}
        <SimpleProduct
          me={products[2]?.prods[0]}
          featured={true}
          hide_small={true}
        />
      {/if}
    </div>
  </div>
  <!-- <div class="word_divider_reviews">
		<h1 style="margin:0; padding:10px;">Reviews</h1>
		<div
			class="carousel"
			class:paused
			on:mouseenter={(e) => (paused = true)}
			on:mouseleave={(e) => (paused = false)}
		>
        <div style="display:flex;flex-direction:row; gap: 1em;">
          {#each review_group.reviews as review}
            <div
              class:wide={review.review_text.length > 350}
              class="review outliend"
              id={`rev${review.id}`}
            >
              <span class="rating">
                <span>
                  {#each Array.from("0".repeat(review.rating)) as _}
                    <Star height="23" width="23" />
                  {/each}
                </span>
                <span>
                  <FilledCheck />
                  Verified Review
                </span>
              </span>
              <span class="review_text">
                {review.review_text}
              </span>
              <span class="review_name_products">
                <span class="name">
                  {review.name}
                </span>

                {#if products != undefined}
                  <span class="review_name_products_product">
                    {#each products
                      .map((p) => p.prods)
                      .flat()
                      .filter((p) => review?.toffee_key?.includes(p.alias))
                      .map((t) => t.name) as p_name}
                      <span>{p_name}</span>
                      <br />
                    {/each}
                  </span>
                {/if}
              </span>
            </div>
          {/each}
        </div>
      {/each} -->
  <!-- <div class="review_row">
				{#each first_half_reviews as review}
					<div
						class:wide={review.review_text.length > 350}
						class:medium={review.review_text.length < 350 && review.review_text.length > 250}
						class:small={review.review_text.length < 100}
						class="review outliend"
						id={`rev${review.id}`}
					>
						<span class="rating">
							<span>
								{#each Array.from('0'.repeat(review.rating)) as _}
									<Star />
								{/each}
							</span>
							<span>
								<FilledCheck />
								Verified Review
							</span>
						</span>
						<span class="review_text">
							{review.review_text}
						</span>
						<span class="review_name_products">
							<span class="name">
								{review.name}
							</span>

							{#if products != undefined}
								<span class="review_name_products_product">
									{#each products
										.map((p) => p.prods)
										.flat()
										.filter((p) => review?.toffee_key?.includes(p.alias))
										.map((t) => t.name) as p_name}
										<span>{p_name}</span>
										<br />
									{/each}
								</span>
							{/if}
						</span>
					</div>
				{/each}
			</div>
			<div class="review_row second">
				{#each second_half as review}
					<div
						class:wide={review.review_text.length > 350}
						class:medium={review.review_text.length < 350 && review.review_text.length > 250}
						class:small={review.review_text.length < 100}
						class="review outliend"
						id={`rev${review.id}`}
					>
						<span class="rating">
							<span>
								{#each Array.from('0'.repeat(review.rating)) as _}
									<Star />
								{/each}
							</span>
							<span>
								<FilledCheck />
								Verified Review
							</span>
						</span>
						<span class="review_text">
							{review.review_text}
						</span>
						<span class="review_name_products">
							<span class="name">
								{review.name}
							</span>

							{#if products != undefined}
								<span class="review_name_products_product">
									{#each products
										.map((p) => p.prods)
										.flat()
										.filter((p) => review?.toffee_key?.includes(p.alias))
										.map((t) => t.name) as p_name}
										<span>{p_name}</span>
										<br />
									{/each}
								</span>
							{/if}
						</span>
					</div>
				{/each}
			</div>
		</div>
	</div> -->

  <!-- <div class="review_text">
      "This is the <span class="emphasized">best</span> toffee I've had in
      <span class="emphasized">years</span>. It's incredibly fresh, flavorful,
      and the textures are amazing. I would give this as a gift in a heartbeat,
      and I plan to freeze some for myself."
    </div>
    <div class="author">- Liz S. | Classic Chocolate Almond Toffee</div> -->
  <div class="our_story parallax_container_middle">
    <div class="paragraph">
      <div>
        Black Tie Aminos is a premium research-focused brand dedicated to
        providing high-purity amino-based compounds for scientific and
        laboratory use. Built on precision, consistency, and transparency, Black
        Tie Aminos delivers compounds that meet the demands of modern research
        environments—whether the goal is exploring metabolic pathways, studying
        receptor behavior, or advancing biochemical innovation. Every product is
        professionally labeled and intended strictly for controlled research
        applications. With an elevated, clean aesthetic and a commitment to
        scientific integrity, Black Tie Aminos brings a refined, reliable
        standard to the world of research compounds.
      </div>
      <a href="/products/" class="shop_now">Shop Our Products</a>
    </div>
    <img src="/reta10/reta10-stand.jpeg" alt="img" />
  </div>

  <div class="icon_banner">
    <IconBanner />
  </div>

  <div id="faq" class="toffee_differences">
    <article>
      <h1>What are "Research Compounds"?</h1>
      <h3>What is a peptide?</h3>
      <p>
        A peptide is a short chain of amino acids—the same building blocks that
        make up proteins. While proteins are long, complex structures, peptides
        are smaller and often have highly targeted biological roles. In research
        settings, peptides are used to explore cellular communication, metabolic
        pathways, receptor activity, and potential therapeutic mechanisms. Our
        peptides are high-purity research materials designed for controlled lab
        environments, allowing scientists to investigate their properties safely
        and with precision.
      </p>
      <!-- <a href="/blog/post/what_is_toffee" class="shop_now">Read More</a> -->
    </article>
  </div>
</section>

<style>
  @font-face {
    font-family: "elephant";
    src: url("/fonts/elephant.TTF");
  }
  .parallax_container_splash {
    position: relative;
    display: grid;
    grid-template-areas: "stack";
    height: 100vh;
    color: var(--accent-900);
  }
  .parallax_element {
    grid-area: stack;
    animation: parallax linear;
    animation-timeline: scroll(block root);
  }
  .parallax_1 {
    --speed: 11;
    transition: filter 2s ease-in;
    overflow: hidden;
  }

  @media (min-aspect-ratio: 1/1) {
    .parallax_1 > img {
      width: 100%;
      height: auto;
      aspect-ratio: 1 / 1;
      z-index: 0;
      content: url("/reta10/reta10x10-box.jpeg");
    }
  }
  @media (max-aspect-ratio: 1/1) {
    .parallax_1 > img {
      width: auto;
      height: 100%;
      aspect-ratio: 1 / 1;
      z-index: 0;
      content: url("/reta10/reta10x10-box.jpeg");
    }
  }

  /* Wide (Computer) */

  /* STANDARD */
  /* @media (min-aspect-ratio: 1/1) {
    .parallax_1 > img {
      width: 100%;
      height: auto;
      aspect-ratio: 1 / 1;
      z-index: 0;
      content: url("https://imagedelivery.net/9cMe9d4LFXgI4nPSeZlAjw/087afce2-6311-43e5-a834-3dc446da9200/big");
    }
  }
  @media (max-aspect-ratio: 1/1) {
    .parallax_1 > img {
      width: auto;
      height: 100%;
      aspect-ratio: 1 / 1;
      z-index: 0;
      content: url("https://imagedelivery.net/9cMe9d4LFXgI4nPSeZlAjw/087afce2-6311-43e5-a834-3dc446da9200/big");
    }
  }
    */

  /* STANDARD */
  /* @media (min-aspect-ratio: 1/1) {
		@media (max-aspect-ratio: 16 / 9) {
			.parallax_1 > img {
				width: 100%;
				height: auto;
				aspect-ratio: 1 / 1;
				z-index: 0;
				content: url('https://imagedelivery.net/9cMe9d4LFXgI4nPSeZlAjw/087afce2-6311-43e5-a834-3dc446da9200/big');
			}
		}
		@media (min-aspect-ratio: 16 / 9) {
			.parallax_1 > img {
				width: 100%;
				height: auto;
				aspect-ratio: 1 / 1;
				z-index: 0;
				content: url('https://imagedelivery.net/9cMe9d4LFXgI4nPSeZlAjw/087afce2-6311-43e5-a834-3dc446da9200/big');
			}
		}
	} */

  /* Tall (Phone) */
  /* Maximum aspect ratio */
  /* @media (max-aspect-ratio: 1/1) {
		.parallax_1 > img {
			width: auto;
			height: 100%;
			aspect-ratio: 1 / 1;
			z-index: 0;
			content: url('https://imagedelivery.net/9cMe9d4LFXgI4nPSeZlAjw/087afce2-6311-43e5-a834-3dc446da9200/big');
		}
	} */

  /* Mothers DAY!
  @media (min-aspect-ratio: 1/1) {
        @media (max-aspect-ratio: 16 / 9) {
            .parallax_1 > img {
                width: 100%;
                height: auto;
                aspect-ratio: 1 / 1;
                z-index: 0;
                content:url("https://imagedelivery.net/9cMe9d4LFXgI4nPSeZlAjw/97e4d9d5-73d0-4e1a-a3c8-975efa85f600/big");
            }
        }
        @media (min-aspect-ratio: 16 / 9) {
            .parallax_1 > img {
                width: 100%;
                height: auto;
                aspect-ratio: 16 / 9;
                z-index: 0;
                content:url("https://imagedelivery.net/9cMe9d4LFXgI4nPSeZlAjw/3fe1a9e0-ab54-43ab-518b-1247cd110400/big");
            }
        }
    }

    /* Tall (Phone) */
  /* Maximum aspect ratio */
  /* @media (max-aspect-ratio: 1/1) {
        @media (min-aspect-ratio: 9/16) {
                .parallax_1 > img {
                width: 100%;
                height: auto;
                aspect-ratio: 9 / 16;
                z-index: 0;
                content:url("https://imagedelivery.net/9cMe9d4LFXgI4nPSeZlAjw/ba275666-8515-446d-a3e6-2351020f8800/public");
            }
        }
        @media (max-aspect-ratio: 9/16) {
            .parallax_1 > img {
                width: auto;
                height: 100%;
                aspect-ratio: 9 / 16;
                z-index: 0;
                content:url("https://imagedelivery.net/9cMe9d4LFXgI4nPSeZlAjw/ba275666-8515-446d-a3e6-2351020f8800/public");
            }
        }
    }  */

  .parallax_2 {
    --speed: 9;
    z-index: 1;
    position: absolute;
    right: 10vw;
    top: 40%;
    background: rgba(0, 0, 0, 0.6);
    box-shadow: 0 0 3rem 3rem rgba(0, 0, 0, 0.6);
    margin: 0 0 0 20vw;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    gap: 2rem;
  }
  .down_arrow {
    --speed: 5;
    height: 90%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
  }
  .down_arrow > div {
    transform: scale(2);
    background: rgba(0, 0, 0, 0.4);
    box-shadow: 0 0 1rem 1rem rgba(0, 0, 0, 0.4);
  }

  @media (max-width: 38rem) {
    .down_arrow > div {
      transform: scale(1.5);
      background: rgba(0, 0, 0, 0.4);
      box-shadow: 0 0 1rem 1rem rgba(0, 0, 0, 0.4);
    }
    .h1 {
      font-size: 2rem;
      font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
        "Lucida Sans", Arial, sans-serif;
    }
    .h2 {
      font-size: 1.3rem;
      font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
        "Lucida Sans", Arial, sans-serif;
      text-align: center;
    }
    .shop_now {
      font-size: 1.3rem;
      background-color: var(--accent-500);
      color: var(--text_color);

      padding: 0.5rem 0.7rem;
      border-radius: 15px;
      border: 2px solid rgba(0, 0, 0, 0);

      text-decoration: none;
      cursor: pointer;
      text-align: center;
      transition:
        all 250ms ease-in-out,
        transform 150ms ease;

      touch-action: manipulation;
      font-weight: 600;
    }
    .shop_now:hover {
      background-color: var(--accent-600);
      border: 2px solid var(--accent-200);
    }
  }
  @media (min-width: 38rem) {
    .h1 {
      font-size: 4rem;
      font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
        "Lucida Sans", Arial, sans-serif;
    }
    .h2 {
      font-size: 2rem;
      font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
        "Lucida Sans", Arial, sans-serif;
      text-align: center;
    }
    .shop_now {
      font-size: 1.7rem;
      background-color: var(--accent-500);
      color: var(--text_color);

      padding: 1rem 1.4rem;
      border-radius: 15px;
      border: 2px solid rgba(0, 0, 0, 0);

      text-decoration: none;
      cursor: pointer;
      text-align: center;
      transition:
        all 250ms ease-in-out,
        transform 150ms ease;

      touch-action: manipulation;
      font-weight: 600;
    }
    .shop_now:hover {
      background-color: var(--accent-600);
      border: 2px solid var(--accent-200);
    }
    .faux_button {
      cursor: pointer;
      transition: all 0.5s ease;
    }
    .faux_button:hover {
      transform: scale(2.1);
    }
  }

  .next {
    position: relative;
    z-index: 1;
    background-color: var(--accent-800);
  }

  @media (max-width: 38rem) {
    .best_seller {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: stretch;
      /* gap: 1rem; */
      z-index: 1;
      padding: 0 10% 1rem 10%;
    }
    .heading_title {
      padding: 1rem 0;
      font-size: 3rem;
      text-align: center;
      font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
        "Lucida Sans", Arial, sans-serif;
    }
    .small_hidden {
      display: none;
    }
  }
  @media (min-width: 38rem) {
    .best_seller {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      align-items: stretch;
      padding: 0 3rem 4rem 3rem;
      z-index: 1;
      font-size: 0.9rem;
    }
    .heading_title {
      padding: 2rem 0;
      font-size: 3rem;
      text-align: center;
      font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
        "Lucida Sans", Arial, sans-serif;
    }
  }

  .emphasized {
    font-weight: 600;
    text-decoration: underline;
  }
  .emphasized_nounderline {
    font-weight: 600;
  }

  @media (max-width: 40rem) {
    .our_story {
      background-color: var(--accent-800);
      position: relative;

      display: flex;
      flex-direction: column;
      /* grid-template-rows: 1fr 1fr; */
      justify-items: start;
      align-items: start;
      font-size: 1.35rem;
    }
  }
  @media (min-width: 40rem) {
    .our_story {
      background-color: var(--accent-800);
      position: relative;

      display: grid;
      grid-template-columns: 1fr 1fr;
      justify-items: center;
      align-items: center;
      font-size: max(1.5vw, 1.5rem);
    }
  }
  .our_story > .paragraph {
    padding: 2rem;
    max-width: 60ch;
    line-height: 1.5em;
    font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
      sans-serif;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
  }
  .our_story > .paragraph > .shop_now {
    margin-left: 4rem;
  }
  .our_story > img {
    width: 100%;
    height: auto;
    box-shadow: 0 0 10px var(--accent-300);
  }

  @media (max-width: 35rem) {
    article {
      padding: 1em;
    }
  }
  @media (min-width: 35rem) {
    article {
      padding: 2.5em;
    }
  }
  .toffee_differences {
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: center;
    background-color: var(--accent-700);
    overflow: hidden;
    z-index: 2;
    position: relative;
  }

  article {
    box-shadow: 0 0 10vw 10vw var(--accent-800);
    z-index: 1;
    border-radius: 5px;
    background-color: var(--accent-800);
    color: var(--color);
    text-align: left;
    max-width: 65ch;
    font-size: 20px;
  }
  article p {
    text-align: left;
    letter-spacing: -0.01px;
    line-height: 1.6em;
    font-weight: 500;
    padding: 0 0 1em 0;
    margin: 0;
    font-family: charter, Georgia, Cambria, "Times New Roman", Times, serif;
    text-indent: 1em;
  }
  article h1 {
    text-align: center;
    font-size: 2.4em;
    font-family: elephant, "Abril Fatface", serif;
    padding: 0.45em 0;
    margin: 0;
  }
  article h2 {
    margin: 0;
    font-size: 1.6em;
    font-family: elephant, "Abril Fatface", serif;
    text-align: center;
  }
  article h3 {
    margin: 0 0 1em 0;
    font-size: 1.2em;
    font-family: charter, Georgia, Cambria, "Times New Roman", Times, serif;
    text-align: left;
    /* font-weight: normal; */
  }
  article ul {
    text-align: left;
    letter-spacing: -0.01px;
    line-height: 32px;
    font-weight: 500;
    padding: 0 0 1em 3rem;
    margin: 0;
    font-family: charter, Georgia, Cambria, "Times New Roman", Times, serif;
    text-indent: 1em;
  }

  @keyframes parallax {
    to {
      transform: translateY(calc(var(--speed) * 200px));
    }
  }
  .icon_banner {
    padding: 1em 0;
    background-color: var(--accent-500);
    z-index: 2;
    position: relative;
  }

  .word_divider_reviews {
    background-color: var(--accent-200);
    color: var(--accent-900);
    z-index: 1;
    position: relative;
    overflow: hidden;
    padding: 1rem 0;
  }
  @media (max-width: 38rem) {
    .word_divider_reviews {
      font-size: 0.8rem;
    }
  }
  @media (min-width: 38rem) {
    .word_divider_reviews {
      font-size: 1rem;
    }
  }
  .carousel {
    /* display: grid;
    grid-template-rows: auto auto;
    grid-template-columns: repeat(20, 1fr);
    gap: 1em; */
    display: flex;
    flex-direction: column;
    width: max-content;
    justify-content: flex-start;
    align-items: start;
    gap: 1em;
  }
  .review_row {
    gap: 1em;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-end;
  }
  .review_row.second {
    align-items: flex-start;
  }
  .review {
    transition: 0.25s ease;
    border: 2px solid rgba(0, 0, 0, 0);
  }
  .review:hover {
    background-color: var(--accent-800);
    border: 2px solid var(--accent-900);
  }

  @keyframes scroll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-96%);
    }
  }

  @media (max-width: 38rem) {
    .carousel {
      animation: scroll 200s infinite linear;
    }
    .review {
      max-width: 35ch;
      background-color: var(--accent-700);
      color: var(--accent-100);
      border-radius: 10px;
      padding: 1.5em 1em;
      cursor: default;
      display: grid;
      grid-template-rows: 1.5rem 1fr auto;
      gap: 0.5rem;

      transition: all 0.5s ease;
    }
    .wide {
      max-width: 90ch;
      font-size: 0.8em;
    }
    .medium {
      max-width: 70ch;
      font-size: 0.9em;
    }
    .small {
      max-width: 35ch;
    }

    .rating {
      height: 100%;
      font-weight: normal;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      --alt-color: rgb(170, 38, 38);
    }
  }
  @media (min-width: 38rem) {
    .carousel {
      animation: scroll 500s infinite linear;
    }
    .review {
      max-width: 55ch;
      background-color: var(--accent-700);
      color: var(--accent-100);
      border-radius: 10px;
      padding: 1em;
      cursor: default;
      display: grid;
      grid-template-rows: 1.5rem 1fr auto;
      gap: 0.5rem;

      transition: all 0.5s ease;
    }
    .wide {
      max-width: 90ch;
      font-size: 0.8em;
    }
    .medium {
      max-width: 70ch;
      font-size: 0.9em;
    }
    .small {
      max-width: 35ch;
    }
    .rating {
      height: 100%;
      font-weight: normal;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      --alt-color: rgb(170, 38, 38);
    }
  }
  .rating > span:nth-child(2) {
    display: flex;
    gap: 0.4em;
    align-items: center;
  }
  .review_name_products {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1rem;
    font-family: "Times New Roman", Times, serif;
  }
  .review_text {
    text-indent: 1em;
    line-height: 1.2em;
    font-size: 1.1em;
  }
  .paused {
    animation-play-state: paused;
  }
</style>
