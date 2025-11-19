<script lang="ts">
	import ReviewWrapper from '$lib/ReviewWrapper.svelte';
	import IconBanner from '$lib/banners/IconBanner.svelte';
	import FeaturedProduct from '$lib/product/FeaturedProduct.svelte';
	import SimpleProduct from '$lib/product/SimpleProduct.svelte';
	import {
		all_products_store,
		secretagogues_store,
		everything_else,
		glp1_store
	} from '$lib/stores/products';
	import { reviews_store } from '$lib/stores/reviews';
	import { get } from 'svelte/store';

	let all_p = get(all_products_store)
		.map((r) => r.prods)
		.flat();
</script>

<svelte:head>
	<title>Black Tie Aminos | Shop All Products</title>
	<link rel="icon" href="../../favicon.png" />

	<meta name="description" content="High Quality Research Compounds" />
	<meta name="keywords" content="peptides, retatrutide, tirzepetide" />
</svelte:head>

<section>
	<div class="container">
		<div class="header">GLP-1 Agonist Compounds</div>
		<div class="product_sections toffees">
			{#each $glp1_store as glp1, i}
				<FeaturedProduct me={glp1} />
				<!-- <SimpleProduct me={glp1} /> -->
			{/each}
		</div>

		<div class="header">Secretagogues</div>
		<div class="product_sections candies">
			{#each $secretagogues_store.filter((f) => !f.annotation) as candy, i}
				<SimpleProduct me={candy} />
			{/each}
		</div>

		<div class="header">Peptides and Supplies</div>
		<div class="product_sections candies">
			{#each $everything_else.filter((f) => !f.annotation) as candy, i}
				<SimpleProduct me={candy} />
			{/each}
		</div>
	</div>
	<div class="banner">
		<IconBanner one_row={false} />
	</div>
	<div class="header">Featured Reviews</div>
	<div class="reviews">
		<ReviewWrapper reviews={get(reviews_store)} filtered_params={{ featured: true }} />
	</div>
</section>

<style>
	.product_sections {
		display: grid;
		justify-items: stretch;
		align-items: stretch;
	}

	@media (max-width: 35rem) {
		.product_sections {
			grid-template-columns: 1fr 1fr;
			gap: 0;
			padding: 0 0.5em;
			font-size: 1rem;
		}
		.header {
			text-align: center;
			font-size: 2em;
			font-weight: bold;
			padding: 1em 1em;
			text-align: left;
		}
		.banner {
			font-size: 0.5rem;
		}
	}
	@media (min-width: 35rem) {
		section {
			padding-bottom: 1em;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		}
		.container {
			max-width: fit-content;
		}
		.product_sections {
			grid-template-columns: 1fr 1fr;
			align-items: stretch;
			padding: 0 4em;
			font-size: 0.9rem;
			align-content: center;
			justify-content: center;
		}
		.candies {
			grid-template-columns: 1fr 1fr 1fr;
		}
		.header {
			text-align: center;
			font-size: 2.5em;
			font-weight: bold;
			padding: 1em;
		}
	}
	@media (min-width: 55rem) {
		.candies {
			grid-template-columns: 1fr 1fr 1fr;
		}
	}

	.banner {
		background-color: var(--accent-600);
		font-size: 0.75rem;
		align-self: stretch;
	}
	.reviews {
		padding: 0 2rem 0 2rem;
	}
</style>
