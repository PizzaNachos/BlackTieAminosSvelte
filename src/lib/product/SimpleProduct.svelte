<script lang="ts">
	import { add_to_cart } from '$lib/stores/cart';
	import type { product } from '$lib/interfaces';
	import Star from '$lib/icons/Star.svelte';
	import { browser } from '$app/environment';
	import { reviews_store } from '$lib/stores/reviews';
	import { get } from 'svelte/store';

	export let me: product;
	export let featured = false;
	export let hide_small = false;

	let items;
	let multi = false;
	if (me?.multi == true) {
		multi = true;
		items = me.items;
		me = me.items[0];

		console.log('Multi!', items, me);
	}

	let my_nums_reviews = get(reviews_store).filter((r) => r.toffee_key.includes(me?.alias)).length;
	let my_rating = Math.ceil(
		get(reviews_store)
			.filter((r) => r.toffee_key.includes(me.alias))
			.reduce((a, b) => a + b.rating, 0) / my_nums_reviews
	);

	let stars = Array.from('0'.repeat(my_rating ?? 0));
	function handle_click() {
		add_to_cart(me);
	}

	const random_time = () => {
		return Math.random() * 10 + 3;
	};

	let image_index = 0;
	let max_index = me?.featured_image_url_paths?.length - 1;
	function toggle_image(time: number) {
		image_index = image_index >= max_index ? 0 : image_index + 1;
		setTimeout(() => toggle_image(random_time()), time * 1000);
	}

	setTimeout(() => toggle_image(random_time()), random_time() * 1000);
</script>

<div class:hide_small class="big_wrapper {featured ? 'featured' : 'regular'}">
	<div class="regular_wrapper">
		<div class="product trackable">
			<a
				class="same_width images"
				data-sveltekit-preload-code="eager"
				href="/products/{me.alias}"
				id={me.stripe_key}
			>
				{#if me.annotation}
					<div class="annotation">{me.annotation}</div>
				{/if}
				<div class="images same_width" id={me.alias + '_page'}>
					{#each me?.featured_image_url_paths as image, index}
						<div
							class:shown={image_index == index}
							class:hidden={image_index !== index}
							class="overlay image same_width trackable"
							id={me.alias + '_page'}
							style:background-image={`url(${image})`}
						></div>
					{/each}
				</div>
			</a>

			<div class="details">
				<span class="name">
					{me.name}
				</span>

				{#if me.short_desc != undefined}
					<div class="short_desc">
						{me.short_desc}
					</div>
				{/if}

				<div class="price">
					${Math.round(me.price / 100)}
				</div>

				{#if my_nums_reviews > 0}
					<div class="stars">
						{#each stars as r}
							<Star height="1.2em" width="1.2em" />
						{/each}
						<div>{my_nums_reviews} Review{my_nums_reviews > 1 ? 's' : ''}</div>
					</div>
				{/if}

				{#if multi == true}
					<select bind:value={me} class="input_element" id="toffee_selector">
						{#each items as m}
							<option value={m}>{m.name}</option>
						{/each}
					</select>
				{/if}

				<a class="trackable add_to_cart" id="view_product_{me.alias}" href="/products/{me.alias}"
					>View Product</a
				>
			</div>
		</div>
	</div>
</div>

<style>
	@media (max-width: 35rem) {
		.featured.big_wrapper:nth-child(1) {
			border-bottom: 1px solid var(--accent-700);
			margin-bottom: 1em;
		}
		.regular.big_wrapper {
			border-bottom: 1px solid var(--accent-700);
			border-top: 1px solid var(--accent-700);
			padding: 1em 0;
		}
		.regular.big_wrapper:nth-child(2n) > .regular_wrapper {
			padding-left: 0.5em;
			border-right: 1px solid rgba(0, 0, 0, 0);
		}
		.regular.big_wrapper:nth-child(odd) > .regular_wrapper {
			border-right: 1px solid var(--accent-700);
			padding-right: 0.5em;
		}
		.regular_wrapper {
			height: 100%;
		}

		.same_width {
			width: 100%;
			background-size: contain;
			background-position: center;
			aspect-ratio: 1/1;
			height: auto;
			overflow: hidden;
		}
		.product {
			display: flex;
			flex-direction: column;
			overflow: hidden;
			justify-content: flex-start;
			align-items: center;
		}

		.details {
			width: 100%;
			padding: 0.5rem 0;
			display: grid;
			grid-template-columns: 1fr max-content;
			justify-items: stretch;
			justify-content: space-between;
			gap: 0.5em;
		}
		.name {
			font-size: 1.2em;
			font-weight: 600;
			text-align: left;
			grid-column: 1/3;
			min-height: 2.4em;
		}
		.stars {
			justify-self: end;
			font-size: 0.8em;
		}
		.price {
			font-size: 1.1em;
			justify-self: center;
			align-self: center;
		}
		.images {
			position: relative;
			overflow: hidden;
			display: block;
		}
		.hide_small {
			display: none;
		}
		.add_to_cart {
			background-color: var(--accent-700);
			border-bottom: 1px solid var(--accent-700);
			border-top: 1px solid var(--accent-700);
			padding: 0.25em;
			font-size: 1.1em;
			cursor: pointer;
			transition: all 0.5s ease;
			color: black;
			grid-column: 1/3;
			text-decoration: none;
		}
		.input_element {
			padding: 0.25rem;
			border-radius: 5px;
			background-color: var(--accent-700);
			border: 2px solid rgb(0, 0, 0, 0);
			transition: all 0.25s ease;
			font-size: 1rem;
			grid-column: span 2;
			text-wrap: wrap;
		}
		.input_element:hover {
			border: 2px solid var(--accent-200);
		}
		.annotation {
			background-color: var(--accent-700);
			color: black;
			text-decoration: None;
			font-family:
				'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
			font-size: larger;
			padding: 5px 50px;
			z-index: 1;
			position: absolute;
			top: 20px;
			left: -53px;
			transform: rotate(-45deg);
			box-shadow: 0 0 10px var(--accent-200);
		}
	}
	@media (min-width: 35rem) {
		.big_wrapper {
			border-bottom: 1px solid var(--accent-500);
			border-top: 1px solid var(--accent-500);

			padding: 2em 0;
		}
		.big_wrapper:last-child > .regular_wrapper {
			border-right: 1px solid rgba(0, 0, 0, 0);
			padding-right: 1em;
		}
		.regular_wrapper {
			height: 100%;
			border-right: 1px solid var(--accent-500);
			padding-right: 1em;
			padding-left: 1em;
		}
		.same_width {
			width: 100%;
			aspect-ratio: 1/1;
		}
		.details {
			padding: 1rem;
			display: grid;
			grid-template-columns: 1fr max-content;
			grid-template-rows: max-content max-content max-content;
			justify-items: stretch;
			justify-content: space-between;
			gap: 0.5em;
		}
		.stars {
			grid-column: span 2;
			grid-row: 2/4;
			justify-self: end;
			font-size: 1em;
			align-self: center;
		}
		.name {
			text-align: left;
			font-size: 1.7em;
			font-weight: 600;
			grid-column: span 2;
		}
		.short_desc {
			text-align: left;
			font-size: 1.2em;
			font-weight: 400;
			grid-column: span 2;
		}
		.price {
			font-size: 1.5em;
			justify-self: left;
			padding: 0.25em;
		}
		.add_to_cart {
			background-color: var(--accent-600);
			border-bottom: 1px solid var(--accent-500);
			border-top: 1px solid var(--accent-500);
			padding: 0.25em;
			font-size: 1.3em;
			cursor: pointer;
			transition: all 0.5s ease;
			justify-self: left;
			grid-column: span 2;
			text-decoration: none;
		}
		.add_to_cart:hover {
			background-color: var(--accent-500);
			transform: scale(1.05);
		}
		.input_element {
			padding: 0.5rem;
			border-radius: 5px;
			background-color: var(--accent-700);
			border: 2px solid rgb(0, 0, 0, 0);
			transition: all 0.25s ease;
			font-size: 1.3rem;
			text-wrap: wrap;
			grid-column: span 2;
		}
		.input_element:hover {
			border: 2px solid var(--accent-200);
		}
		.annotation {
			background-color: var(--accent-700);
			color: black;
			text-decoration: None;
			font-family:
				'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
			font-size: larger;
			padding: 5px 50px;
			z-index: 1;
			position: absolute;
			top: 20px;
			left: -53px;
			transform: rotate(-45deg);
			box-shadow: 0 0 10px var(--accent-200);
		}
	}
	@media (min-width: 60rem) {
		.big_wrapper {
			border-bottom: 1px solid var(--accent-500);
			border-top: 1px solid var(--accent-500);

			padding: 2em 0;
		}
		.big_wrapper:last-child > .regular_wrapper {
			border-right: 1px solid rgba(0, 0, 0, 0);
			padding-right: 1em;
		}
		.regular_wrapper {
			height: 100%;
			border-right: 1px solid var(--accent-500);
			padding-right: 1em;
			padding-left: 1em;
		}
		.same_width {
			width: 100%;
			aspect-ratio: 1/1;
		}
		.details {
			padding: 1rem;
			display: grid;
			grid-template-columns: 1fr max-content;
			grid-template-rows: max-content max-content max-content;
			justify-items: stretch;
			justify-content: space-between;
			gap: 0.5em;
		}
		.stars {
			grid-column: 2;
			grid-row: 2/4;
			justify-self: end;
			font-size: 1.25em;
			align-self: center;
		}
		.name {
			text-align: left;
			font-size: 1.7em;
			font-weight: 600;
			grid-column: span 2;
		}
		.price {
			font-size: 1.5em;
			justify-self: left;
			padding: 0.25em;
		}
		.add_to_cart {
			background-color: inherit;
			border-bottom: 1px solid var(--accent-500);
			border-top: 1px solid var(--accent-500);
			padding: 0.25em;
			font-size: 1.3em;
			cursor: pointer;
			transition: all 0.5s ease;
			justify-self: left;
			text-decoration: none;
		}
		.add_to_cart:hover {
			background-color: var(--accent-700);
			transform: scale(1.05);
		}
		.annotation {
			background-color: var(--accent-700);
			color: black;
			text-decoration: None;
			font-size: 1.5em;
			padding: 5px 100px;
			z-index: 1;
			position: absolute;
			top: 30px;
			left: -90px;
			transform: rotate(-45deg);
			box-shadow: 0 0 10px var(--accent-200);
		}
	}
	.product {
		width: 100%;
		text-align: left;
		color: var(--text_color);
		background-color: rgba(0, 0, 0, 0);
		text-decoration: none;
	}

	.images {
		position: relative;
		overflow: hidden;
		display: block;
	}

	.overlay {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;

		width: 100%;
		height: 100%;
		background-size: contain;
		background-position: center;
		transition: all 0.5s;
	}
	.hidden {
		opacity: 0;
	}
	.shown {
		opacity: 1;
	}
	.image {
		transition: opacity 2s linear;
	}
</style>
