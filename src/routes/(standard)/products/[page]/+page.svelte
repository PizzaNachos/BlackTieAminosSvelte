<script lang="ts">
	import IconBanner from '$lib/banners/IconBanner.svelte';
	import Star from '$lib/icons/Star.svelte';
	// throw new Error("@migratio task: Add data prop (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292707)");
	import type { filter_definition, product, ReviewInterface } from '$lib/interfaces';
	import ReviewWrapper from '$lib/ReviewWrapper.svelte';
	import { add_to_cart } from '$lib/stores/cart';
	import { get } from 'svelte/store';

	// import { PageData } from './$types';
	import SimpleProduct from '$lib/product/SimpleProduct.svelte';
	import QaModal from '$lib/QAModal/QAModal.svelte';

	import TabThing from '$lib/tab_thing/TabThing.svelte';

	export let data;

	let items: product[];
	let multi = false;
	let me: product;
	let my_index = 0;

	$: if (data && data?.product?.multi == true) {
		multi = true;
		items = <product[]>data.product.items;
		me = data?.product?.items?.at(my_index) ?? me;
	} else {
		me = data.product;
		multi = false;
		items = [];
	}

	$: upsells = data.upsells ?? [];
	// $: my_nums_reviews = data.reviews.length;
	// $: my_rating = Math.ceil(
	// 	data.reviews.reduce((a: ReviewInterface, b: ReviewInterface) => a.rating + b.rating, 0) /
	// 		my_nums_reviews
	// );
	function handle_click() {
		add_to_cart(me);
	}

	let featured_image_index = 0;
	let filtered: filter_definition = { max_values: 10 };

	let tabItems = [
		{ label: 'Reviews', value: 1 },
		{ label: 'Nutrition', value: 2 }
	];
	let currentTab = 1;
</script>

<svelte:head>
	<title>Black Tie Aminos | {data.product.name}</title>
	<link rel="icon" href="/favicon.png" />
	<meta name="keywords" content="{data.product.name}, peptides, research compounds" />
</svelte:head>

<div id="product_page">
	<div class="main">
		<div class="col1">
			<div class="display_wrapper">
				<div class="product_display">
					{#each me.product_image_url_paths as image, index}
						<div
							class:shown={featured_image_index == index}
							class:hidden={featured_image_index != index}
							style={'background-image: url(' + image + ')'}
						></div>
					{/each}
				</div>
				<div class="thumbnail_buttons">
					{#each me.product_image_url_paths as image, index}
						<div
							on:click={() => {
								featured_image_index = index;
							}}
							on:keypress={() => (featured_image_index = index)}
							style={'background-image: url(' + image + ')'}
							class="thumbnail"
							class:active={featured_image_index == index}
						></div>
					{/each}
				</div>
			</div>
			<div class="what_is big_screen">
				<div class="question">{data.question?.question ?? ''}</div>
				<div class="answer">{data.question?.answer ?? ''}</div>
			</div>
		</div>

		<div class="col2">
			<div class="product_details">
				<div class="name">{me.name}</div>
				<div class="price_rating">
					<div class="price">${me.price / 100} / {me.unit}</div>
					<!-- {#if my_nums_reviews > 0}
						<span class="rating">
							<div>
								{#each Array.from('0'.repeat(my_rating)) as r}
									<Star width="20" height="20" />
								{/each}
							</div>
							<div>
								{my_nums_reviews} Review{my_nums_reviews > 1 ? 's' : ''}
							</div>
						</span>
					{/if} -->
				</div>

				<div class="description">
					{#if Array.isArray(me.long_desc)}
						{#each me.long_desc as p}
							<p>{p}</p>
						{/each}
					{:else}
						{me.long_desc}
					{/if}
				</div>

				{#if me.out_of_stock}
					This product is temporarily out of stock 😞
					<div>
						To purchase please email <a href="mailto:contact@blacktieaminos.com"
							>contact@blacktieaminos.com</a
						>
					</div>
				{:else}
					{#if multi == true}
						<select bind:value={my_index} class="input_element" id="toffee_selector">
							{#each items as m, i}
								<option value={i}>{m.name}</option>
							{/each}
						</select>
					{/if}
					<div class="add_to_cart trackable" id={me.alias + '_PageAddToCart'}>
						To purchase please email <a href="mailto:contact@blacktieaminos.com"
							>contact@blacktieaminos.com</a
						>
					</div>
				{/if}

				<div class="what_is small_screen">
					<QaModal header={data.question?.question ?? ''} expand={data.question?.answer ?? ''} />
				</div>
			</div>

			<div class="upsell">
				<div>You'll Love These Too</div>
				<div class="upsell_products">
					{#each upsells as upsell, i}
						<SimpleProduct me={upsell} hide_small={i >= 2} />
						<!-- {#if i == 1}
								<span style="display: none;"></span>								
							{/if}
						<span style="display: none;"></span> -->
					{/each}
				</div>
			</div>
		</div>
	</div>

	<div class="icon_banner">
		<IconBanner />
	</div>
	<div id="faq" class="toffee_differences">
		<article>
			<h1>What are "Research Compounds"?</h1>
			<h3>What is a peptide?</h3>
			<p>
				A peptide is a short chain of amino acids—the same building blocks that make up proteins.
				While proteins are long, complex structures, peptides are smaller and often have highly
				targeted biological roles. In research settings, peptides are used to explore cellular
				communication, metabolic pathways, receptor activity, and potential therapeutic mechanisms.
				Our peptides are high-purity research materials designed for controlled lab environments,
				allowing scientists to investigate their properties safely and with precision.
			</p>
			<!-- <a href="/blog/post/what_is_toffee" class="shop_now">Read More</a> -->
		</article>
	</div>

	<!-- <div class="tab_header">
		<div class="tab_header_element">
			<TabThing bind:activeTabValue={currentTab} items={tabItems} />
		</div>
	</div> -->

	<!-- {#if 1 === currentTab}
		<div class="reviews">
			<div class="reviews_header">{me.name} Reviews</div>
			<a href="/write_review">Write a Reivew {'->'}</a>
			<div class="start_filters">
				<span>
					<label for="all_stars">All Reviews</label>
					<input type="radio" id="all_stars" name="stars" value="" bind:group={filtered.stars} />
				</span>
				<span>
					<label for="five_stars">
						<span class="rating">
							{#each Array.from('0'.repeat(5)) as r}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									fill="black"
									class="star"
									viewBox="0 0 16 16"
								>
									<path
										d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
									/>
								</svg>
							{/each}
						</span>
						({data.reviews.filter((r) => r.rating == 5).length})
					</label>
					<input type="radio" id="five_stars" name="stars" value="5" bind:group={filtered.stars} />
				</span>
				<span>
					<label for="four_stars">
						<span class="rating">
							{#each Array.from('0'.repeat(4)) as r}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									fill="black"
									class="star"
									viewBox="0 0 16 16"
								>
									<path
										d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
									/>
								</svg>
							{/each}
						</span>
						({data.reviews.filter((r) => r.rating == 4).length})
					</label>
					<input type="radio" id="four_stars" name="stars" value="4" bind:group={filtered.stars} />
				</span>
				<span>
					<label for="three_stars">
						<span class="rating">
							{#each Array.from('0'.repeat(3)) as r}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									fill="black"
									class="star"
									viewBox="0 0 16 16"
								>
									<path
										d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
									/>
								</svg>
							{/each}
						</span>
						({data.reviews.filter((r) => r.rating == 3).length})
					</label>
					<input type="radio" id="three_stars" name="stars" value="3" bind:group={filtered.stars} />
				</span>
				<span>
					<label for="two_stars">
						<span class="rating">
							{#each Array.from('0'.repeat(2)) as r}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									fill="black"
									class="star"
									viewBox="0 0 16 16"
								>
									<path
										d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
									/>
								</svg>
							{/each}
						</span>
						({data.reviews.filter((r) => r.rating == 2).length})
					</label>
					<input type="radio" id="two_stars" name="stars" value="2" bind:group={filtered.stars} />
				</span>
				<span>
					<label for="one_stars">
						<span class="rating">
							{#each Array.from('0'.repeat(1)) as r}
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="16"
									height="16"
									fill="black"
									class="star"
									viewBox="0 0 16 16"
								>
									<path
										d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"
									/>
								</svg>
							{/each}
						</span>
						({data.reviews.filter((r) => r.rating == 1).length})
					</label>
					<input type="radio" id="one_stars" name="stars" value="1" bind:group={filtered.stars} />
				</span>
			</div>
			<ReviewWrapper reviews={data.reviews} filtered_params={filtered} />
			<a data-sveltekit-preload-code="eager" id="all_reviews_button" href="/reviews/">
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
	{/if}

	{#if 2 === currentTab}
		<div class="nutrition">
			<img src={me.nutrition_label_path} alt="Nutrition Label" />
		</div>
	{/if} -->
</div>

<style>
	:root {
		--pic_width: 30vw;
	}
	.main {
		padding: 1rem;

		display: grid;
		justify-items: center;
		justify-content: center;
		gap: 2rem;

		padding-bottom: 2rem;
	}
	.col2 {
		max-width: 90ch;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		justify-self: start;
		gap: 1em;
	}
	.product_details {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		gap: 1em;
	}
	.product_details > .name {
		font-size: 2em;
		margin-top: 1px;
		width: 100%;
		padding-top: 1rem;
		border-top: 1px solid var(--accent-500);
	}
	.product_details .description {
		text-align: left;
		font-size: 20px;
		letter-spacing: -0.01px;
		line-height: 32px;
		font-weight: 400;
		padding-top: 1em;
		border-top: 1px solid var(--accent-500);
	}
	.product_details > .price_rating {
		width: 100%;
		font-size: 1.5em;
		padding-top: 0.5em;
		border-top: 1px solid var(--accent-500);
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.product_details .add_to_cart {
		justify-self: center;
		font-size: 1.25em;
		background-color: var(--accent-700);
		padding: 0.5em 2em;
		border: 2px solid rgba(0, 0, 0, 0);
		border-radius: 10px;
		transition:
			border 0.25s ease,
			border-radius 0.25s ease;
	}
	.add_to_cart:hover {
		border: 2px solid black;
		border-radius: 10px;
	}

	.col1 {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}
	.product_display {
		position: relative;
		display: block;
	}
	.product_display * {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;

		width: 100%;
		height: 100%;
		background-size: contain;
		background-position: center;
		transition: opacity 0.25s ease-in-out;
		box-shadow: 0 0 10px var(--accent-200);
	}

	.start_filters {
		display: flex;
		flex-direction: column;
		align-items: stretch;
	}
	.start_filters * {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: stretch;
	}
	.start_filters span label {
		order: 2;
	}
	#all_reviews_button {
		display: flex;
		justify-content: center;
		align-items: center;

		font-size: x-large;
		background-color: var(--accent-700);

		padding: 2rem;
		border-radius: 5px;
		width: max-content;
	}

	.thumbnail_buttons {
		display: grid;
		order: 1;
	}

	.display_wrapper {
		display: flex;
	}
	.product_display * {
		width: var(--pic_width);
		height: var(--pic_width);
	}
	.product_display {
		width: var(--pic_width);
		height: var(--pic_width);
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
	@media (max-width: 36rem) {
		:root {
			--pic_width: 90vw;
			--thumbnail_width: 18vw;
		}
		.main {
			padding: 1rem;

			display: grid;
			justify-items: center;
			justify-content: center;
			gap: 0.5rem;

			padding-bottom: 2rem;
		}
		.col1 {
			justify-content: center;
			width: 100%;
		}
		.col2 {
			align-items: stretch;
		}
		.thumbnail_buttons {
			padding-top: 0.5rem;
			grid-template-columns: repeat(4, var(--thumbnail_width));
			gap: 0.5rem;
		}
		.thumbnail {
			background-size: contain;
			background-position: center;
			width: var(--thumbnail_width);
			height: var(--thumbnail_width);
		}
		.display_wrapper {
			flex-direction: column;
			width: max-content;
			justify-content: center;
			align-items: center;
		}
		.product_details > .price_rating {
			font-size: 1.3em;
		}
		.product_details .description {
			font-size: 16px;
			line-height: 30px;
		}
		.upsell {
			padding-top: 0.5em;
			font-size: 1.5em;
		}
		.upsell > .upsell_products {
			font-size: 0.85rem;
			display: grid;
			grid-template-columns: 1fr 1fr;
			padding: 1em 0 0 0;
		}
		.what_is.big_screen {
			display: none;
		}
		.what_is.small_screen {
			margin-top: 1em;
			width: 100%;
			background-color: var(--accent-800);
		}
		.start_filters {
			padding: 1em;
		}
		.reviews {
			padding: 0 1em;
		}
		.reviews_header {
			font-size: x-large;
			padding: 0.5em;
		}
		.tab_header {
			font-size: 1.25em;
			padding: 1em;
		}

		.nutrition {
			padding: 1em;
		}
		.nutrition > img {
			width: 100%;
		}
	}

	@media (min-width: 36rem) {
		:root {
			--pic_width: 30vw;
		}
		.main {
			grid-template-columns: 1fr 1fr;
			padding-top: 2em;
		}
		.col1 {
			justify-content: flex-start;
			align-items: flex-end;
			justify-self: end;
			max-width: min-content;
		}
		.col2 {
			align-items: flex-start;
		}
		.product_details {
			justify-self: start;
		}
		.product_display {
			order: 2;
		}
		.display_wrapper {
			flex-direction: row;
			width: max-content;
		}
		.thumbnail_buttons {
			padding: 0 1rem 0 0;
			grid-template-rows: repeat(4, 6.75vw);
			gap: 1vw;
		}
		.thumbnail {
			background-size: contain;
			background-position: center;
			width: 6.75vw;
			height: 6.75vw;
			transition: box-shadow 0.2s ease-out;
		}
		.reviews {
			padding: 1em 2em;
		}
		.upsell {
			padding-top: 2em;
			font-size: 1.5em;
			text-align: center;
		}
		.upsell > .upsell_products {
			font-size: 0.7rem;
			display: grid;
			grid-template-columns: 1fr 1fr 1fr;
			padding: 1em 0;
			justify-content: center;
		}
		.what_is {
			padding: 1em;
			margin: 1em 0;
			font-size: 1.2rem;
			background-color: var(--accent-800);
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			align-items: flex-start;
			gap: 1em;
		}
		.what_is > .question {
			font-size: 1.5em;
		}
		.what_is > .answer {
			text-align: left;
			letter-spacing: -0.01px;
			line-height: 1.6em;
			font-weight: 500;
			margin: 0;
			text-indent: 1em;
		}
		.small_screen {
			display: none;
		}
		.start_filters {
			padding: 1em;
		}
		.reviews_header {
			font-size: x-large;
			padding: 2em 1em;
		}

		.tab_header {
			font-size: 1.35em;
			padding: 1em;
		}
		.nutrition {
			padding: 1em;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
	.shown {
		opacity: 1;
	}
	.hidden {
		opacity: 0;
	}
	.active {
		box-shadow: 0 0 20px var(--accent-200);
	}
	#nutrition_modal {
		display: flex;
		flex-direction: row;
		align-items: flex-start;
		justify-content: start;
		/* max-height: 20em; */
	}
	/* .nutrition_button{
		font-size: 1em;
		background-color: var(--accent-color);
		color: var(--text_color);
		padding: .25em .5em;
		border: 2px solid rgba(0,0,0,0);
		border-radius: 0px;
		transition: border .25s ease, border-radius .25s ease;
	}
	.nutrition_button:hover{
		border: 2px solid black;
		border-radius: 10px;
	}
	#nutrition_modal img{
		max-height: 20em;
	} */
	.icon_banner {
		background-color: var(--accent-500);
		font-size: 0.8em;
	}
	.input_element {
		padding: 0.5rem;
		border-radius: 5px;
		background-color: var(--accent-700);
		border: 2px solid rgb(0, 0, 0, 0);
		transition: all 0.25s ease;
		font-size: 1.2rem;
		text-wrap: wrap;
	}
	.input_element:hover {
		border: 2px solid var(--accent-200);
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
		font-family: charter, Georgia, Cambria, 'Times New Roman', Times, serif;
		text-indent: 1em;
	}
	article h1 {
		text-align: center;
		font-size: 2.4em;
		font-family: elephant, 'Abril Fatface', serif;
		padding: 0.45em 0;
		margin: 0;
	}
	article h2 {
		margin: 0;
		font-size: 1.6em;
		font-family: elephant, 'Abril Fatface', serif;
		text-align: center;
	}
	article h3 {
		margin: 0 0 1em 0;
		font-size: 1.2em;
		font-family: charter, Georgia, Cambria, 'Times New Roman', Times, serif;
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
		font-family: charter, Georgia, Cambria, 'Times New Roman', Times, serif;
		text-indent: 1em;
	}
</style>
