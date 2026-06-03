<script lang="ts">
	import { onMount } from 'svelte';
	import IconBanner from '$lib/banners/IconBanner.svelte';
	import SimpleProduct from '$lib/product/SimpleProduct.svelte';
	import FeaturedProduct from '$lib/product/FeaturedProduct.svelte';
	import {
		loadStorefront,
		productSections,
		qoroLoading,
		qoroError,
		qoroSettings
	} from '$lib/qoro/store';

	onMount(() => {
		loadStorefront();
	});
</script>

<svelte:head>
	<title>Black Tie Aminos | Research Catalog</title>
	<link rel="icon" href="/favicon.png" />
	<meta name="description" content="Laboratory research materials for lawful research use only." />
	<meta name="keywords" content="laboratory research materials, research compounds" />
</svelte:head>

<section>
	<div class="container">
		{#if $qoroLoading && $productSections.length === 0}
			<div class="state">Loading products…</div>
		{:else if $qoroError && $productSections.length === 0}
			<div class="state error">Unable to load products: {$qoroError}</div>
		{:else if $productSections.length === 0}
			<div class="state">No products available yet.</div>
		{:else}
			{#if $qoroSettings && $qoroSettings.ecommerce_enabled === false}
				<div class="state warn">Ordering is temporarily unavailable.</div>
			{/if}
			{#each $productSections as section (section.collection.id)}
				<div class="header">{section.collection.name}</div>
				<div class="product_sections">
					{#each section.prods as prod, i}
						{#if prod.featured}
							<div class="card_wrap card_wrap--featured">
								<FeaturedProduct me={prod} />
							</div>
						{:else}
							<div class="card_wrap card_wrap--simple">
								<SimpleProduct me={prod} />
							</div>
						{/if}
						{#if i < section.prods.length - 1}
							<div class="divider" style="background-color:grey; width: 1px;"></div>
						{/if}
					{/each}
				</div>
			{/each}
		{/if}
	</div>
	<div class="banner">
		<IconBanner one_row={false} />
	</div>
</section>

<style>
	section {
		padding-bottom: 1em;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.container {
		width: 100%;
		max-width: 90rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.product_sections {
		display: flex;
		flex-wrap: nowrap;
		gap: 0.5rem;
		justify-content: center;
		align-items: stretch;
		padding: 0.5rem;
		border-top: 1px solid grey;
		border-bottom: 1px solid grey;
	}
	.card_wrap {
		display: flex;
		flex-direction: column;
	}
	.card_wrap--simple {
		flex: 1 1 16rem;
		max-width: 24rem;
	}
	.card_wrap--featured {
		flex: 2 1 30rem;
		max-width: 48rem;
	}
	@media (max-width: 35rem) {
		.product_sections {
			gap: 0.25rem;
			padding: 0 0.5rem 1rem;
			font-size: 0.9rem;
			display: grid;
			grid-template-columns: 1fr 1fr;
		}
		.divider {
			display: none;
		}
		.card_wrap--simple,
		.card_wrap--featured {
			flex: 1 1 100%;
			max-width: 100%;
		}
		.header {
			text-align: left;
			font-size: 2em;
			font-weight: bold;
			padding: 1em 1em;
		}
		.banner {
			font-size: 0.5rem;
		}
	}
	@media (min-width: 35rem) {
		.header {
			text-align: center;
			font-size: 2.5em;
			font-weight: bold;
			padding: 1em;
		}
	}
	.banner {
		background-color: var(--accent-600);
		font-size: 0.75rem;
		align-self: stretch;
	}
	.state {
		padding: 4rem 2rem;
		text-align: center;
		font-size: 1.2rem;
		opacity: 0.8;
	}
	.state.error {
		color: var(--accent-100);
		background-color: rgba(170, 38, 38, 0.4);
		border-radius: 8px;
		margin: 2rem;
	}
	.state.warn {
		background-color: var(--accent-300);
		color: var(--accent-900);
		padding: 1rem;
		border-radius: 8px;
		margin: 1rem 2rem;
		text-align: center;
	}
</style>
