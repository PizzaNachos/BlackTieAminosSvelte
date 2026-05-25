<script lang="ts">
	import { onMount } from 'svelte';
	import IconBanner from '$lib/banners/IconBanner.svelte';
	import type { product } from '$lib/interfaces';
	import { add_to_cart } from '$lib/stores/cart';
	import {
		loadStorefront,
		findUiProductBySlug,
		uiProducts,
		qoroLoading,
		qoroError
	} from '$lib/qoro/store';
	import { product_types_map } from '$lib/stores/product_types';

	export let data: { slug: string };

	let me: product | undefined;
	let selectedVariantId: number | null = null;
	let lastProductId: number | null = null;
	let featured_image_index = 0;
	let qty = 1;
	let added = false;

	function defaultVariant(p: product | undefined): product | undefined {
		if (!p?.variants?.length) return undefined;
		return (
			p.variants.find((v) => v.id === p.default_variant_id) ??
			p.variants.find((v) => v.is_default_variant) ??
			p.variants[0]
		);
	}

	$: me = $uiProducts.length ? findUiProductBySlug(data.slug) : undefined;
	$: explainer = me?.product_type ? product_types_map.get(me.product_type) : undefined;
	$: if (me && me.id !== lastProductId) {
		lastProductId = me.id;
		selectedVariantId = defaultVariant(me)?.id ?? null;
		featured_image_index = 0;
		qty = 1;
	}
	$: selectedVariant =
		me?.variants?.find((variant) => variant.id === selectedVariantId) ?? defaultVariant(me);
	$: activeProduct = selectedVariant ?? me;
	$: activeImages = activeProduct?.product_image_url_paths ?? [];
	$: activeDescription = activeProduct?.long_desc?.length
		? activeProduct.long_desc
		: (me?.long_desc ?? []);
	$: activeLabel = selectedVariant?.variant_label ?? selectedVariant?.name;
	$: canAdd =
		!!activeProduct &&
		activeProduct.is_checkoutable !== false &&
		activeProduct.out_of_stock !== true;
	$: if (activeProduct && featured_image_index >= activeImages.length) featured_image_index = 0;

	onMount(() => {
		loadStorefront();
	});

	function handleAdd() {
		if (!activeProduct || !canAdd) return;
		add_to_cart(activeProduct, qty);
		added = true;
		setTimeout(() => (added = false), 1500);
	}
</script>

<svelte:head>
	<title>Black Tie Aminos | {me?.name ?? 'Product'}</title>
	<link rel="icon" href="/favicon.png" />
	{#if me}
		<meta name="keywords" content="{me.name}, peptides, research compounds" />
	{/if}
</svelte:head>

<div id="product_page">
	{#if !me && $qoroLoading}
		<div class="state">Loading...</div>
	{:else if !me && $qoroError}
		<div class="state error">Unable to load product: {$qoroError}</div>
	{:else if !me}
		<div class="state">
			<h2>Product not found</h2>
			<p><a href="/products/">Browse all products</a></p>
		</div>
	{:else}
		<div class="main">
			<div class="col1">
				<div class="display_wrapper">
					<div class="product_display">
						{#if activeImages.length === 0}
							<div class="shown placeholder"></div>
						{:else}
							{#each activeImages as image, index}
								<div
									class:shown={featured_image_index === index}
									class:hidden={featured_image_index !== index}
									style={'background-image: url(' + image + ')'}
								></div>
							{/each}
						{/if}
					</div>
					{#if activeImages.length > 1}
						<div class="thumbnail_buttons">
							{#each activeImages as image, index}
								<div
									on:click={() => (featured_image_index = index)}
									on:keypress={() => (featured_image_index = index)}
									role="button"
									tabindex="0"
									style={'background-image: url(' + image + ')'}
									class="thumbnail"
									class:active={featured_image_index === index}
								></div>
							{/each}
						</div>
					{/if}
				</div>
			</div>

			<div class="col2">
				<div class="product_details">
					<div class="name">{me.name}</div>
					<div class="price_rating">
						<div>
							<div class="price">
								${((activeProduct?.price ?? 0) / 100).toFixed(2)} / {activeProduct?.unit ?? me.unit}
							</div>
							{#if activeLabel}
								<div class="selected_label">{activeLabel}</div>
							{/if}
						</div>
					</div>

					{#if me.variants?.length}
						<div class="variant_picker" aria-label="Select product option">
							<div class="variant_heading">Options</div>
							<div class="variant_buttons">
								{#each me.variants as variant (variant.id)}
									<button
										type="button"
										class:selected={variant.id === selectedVariantId}
										class:oos_variant={variant.out_of_stock}
										on:click={() => {
											selectedVariantId = variant.id;
											featured_image_index = 0;
											added = false;
										}}
									>
										<span>{variant.variant_label ?? variant.name}</span>
										<small>
											{#if variant.out_of_stock}
												Out of stock
											{:else}
												${(variant.price / 100).toFixed(2)}
											{/if}
										</small>
									</button>
								{/each}
							</div>
						</div>
					{/if}

					<div class="description">
						{#if activeDescription.length === 0}
							<p>-</p>
						{:else}
							{#each activeDescription as p}
								<p>{p}</p>
							{/each}
						{/if}
					</div>

					{#if activeProduct?.out_of_stock}
						<div class="oos">Out of stock</div>
						<div class="oos_email">
							To inquire please email
							<a href="mailto:contact@blacktieaminos.com">contact@blacktieaminos.com</a>
						</div>
					{:else}
						<div class="qty_row">
							<label for="qty_input">Quantity</label>
							<div class="qty_picker">
								<button on:click={() => (qty = Math.max(1, qty - 1))} aria-label="Decrease"
									>-</button
								>
								<input id="qty_input" type="number" min="1" bind:value={qty} />
								<button on:click={() => (qty = qty + 1)} aria-label="Increase">+</button>
							</div>
						</div>
						<button class="add_to_cart" on:click={handleAdd} disabled={!canAdd}>
							{added ? 'Added!' : 'Add to Order'}
						</button>
					{/if}
				</div>
			</div>
		</div>

		{#if explainer}
			<aside class="what_is">
				<div class="what_is_question">{explainer.question}</div>
				<p class="what_is_answer">{explainer.answer}</p>
			</aside>
		{/if}

		<div class="icon_banner">
			<IconBanner />
		</div>
	{/if}
</div>

<style>
	:root {
		--pic_width: 30vw;
	}
	.main {
		padding: 1rem;
		display: grid;
		/* justify-items: center; */
		justify-content: center;
		gap: 2rem;
		padding-bottom: 2rem;
	}
	.col1 {
		justify-self: end;
	}
	.col2 {
		justify-self: start;
		max-width: 90ch;
		display: flex;
		flex-direction: column;
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
		width: 100%;
		padding-top: 1rem;
		border-top: 1px solid var(--accent-500);
	}
	.product_details .description {
		text-align: left;
		font-size: 20px;
		line-height: 32px;
		padding-top: 1em;
		border-top: 1px solid var(--accent-500);
		width: 100%;
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
	.selected_label {
		font-size: 0.65em;
		opacity: 0.75;
		margin-top: 0.2rem;
	}
	.variant_picker {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
	}
	.variant_heading {
		font-weight: 600;
		text-align: left;
	}
	.variant_buttons {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(8rem, 1fr));
		gap: 0.5rem;
		width: 100%;
	}
	.variant_buttons button {
		display: flex;
		flex-direction: column;
		gap: 0.2rem;
		align-items: flex-start;
		padding: 0.7rem 0.8rem;
		background-color: var(--accent-800);
		border: 1px solid var(--accent-500);
		border-radius: 6px;
		cursor: pointer;
		text-align: left;
	}
	.variant_buttons button.selected {
		background-color: var(--accent-700);
		border-color: var(--accent-200);
		box-shadow: 0 0 0 2px var(--accent-300);
	}
	.variant_buttons button.oos_variant {
		opacity: 0.65;
	}
	.variant_buttons small {
		opacity: 0.75;
	}
	.add_to_cart {
		justify-self: center;
		font-size: 1.25em;
		background-color: var(--accent-700);
		padding: 0.5em 2em;
		border: 2px solid rgba(0, 0, 0, 0);
		border-radius: 10px;
		cursor: pointer;
		transition: border 0.25s ease;
	}
	.add_to_cart:hover {
		border: 2px solid black;
	}
	.add_to_cart:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
	.qty_row {
		display: flex;
		align-items: center;
		gap: 1em;
	}
	.qty_picker {
		display: inline-flex;
		gap: 2px;
		background-color: var(--accent-400);
	}
	.qty_picker button {
		background-color: var(--accent-700);
		padding: 0 1ch;
		cursor: pointer;
	}
	.qty_picker input {
		width: 4ch;
		text-align: center;
		background-color: var(--accent-800);
		color: inherit;
		border: none;
	}
	.oos {
		font-size: 1.2em;
		font-weight: 600;
		background-color: var(--accent-300);
		color: var(--accent-900);
		padding: 0.5em 1em;
		border-radius: 6px;
	}
	.oos_email {
		font-size: 0.95em;
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
	.placeholder {
		background-color: var(--accent-700);
	}
	.thumbnail_buttons {
		display: grid;
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
	@media (max-width: 36rem) {
		:root {
			--pic_width: 90vw;
			--thumbnail_width: 18vw;
		}
		.main {
			padding: 1rem;
			gap: 0.5rem;
			padding-bottom: 2rem;
		}
		.col1 {
			width: 100%;
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
	}
	@media (min-width: 36rem) {
		:root {
			--pic_width: 30vw;
		}
		.main {
			grid-template-columns: 1fr 1fr;
			padding-top: 2em;
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
		}
		.display_wrapper {
			flex-direction: row;
		}
		.product_display {
			order: 2;
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
	.icon_banner {
		background-color: var(--accent-500);
		font-size: 0.8em;
	}
	.what_is {
		max-width: 80ch;
		margin: 1rem auto 2rem;
		padding: 1.25rem 1.5rem;
		background-color: var(--accent-800);
		border-left: 4px solid var(--accent-300);
		border-radius: 6px;
	}
	.what_is_question {
		font-size: 1.4em;
		font-weight: 600;
		margin-bottom: 0.5rem;
	}
	.what_is_answer {
		margin: 0;
		line-height: 1.6em;
		font-size: 1.05em;
	}
	.state {
		padding: 4rem 2rem;
		text-align: center;
		font-size: 1.2rem;
	}
	.state.error {
		color: var(--accent-100);
		background-color: rgba(170, 38, 38, 0.4);
		border-radius: 8px;
		margin: 2rem;
	}
</style>
