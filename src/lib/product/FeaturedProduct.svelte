<script lang="ts">
	import { add_to_cart } from '$lib/stores/cart';
	import type { product } from '$lib/interfaces';
	import Star from '$lib/icons/Star.svelte';
	import { reviews_store } from '$lib/stores/reviews';
	import { get } from 'svelte/store';

	export let me: product;
	let items;
	let multi = false;
	if (me?.multi == true) {
		multi = true;
		items = me.items;
		me = me.items[0];

		console.log('Multi!', items, me);
	}
	// let stars = Array.from("0".repeat(me.rating ?? 0));

	function handle_click() {
		add_to_cart(me);
	}
	const random_time = () => {
		return Math.random() * 10 + 3;
	};

	let image_index = 0;
	let my_nums_reviews = get(reviews_store).filter((r) => r.toffee_key.includes(me?.alias)).length;
	let my_rating = Math.ceil(
		get(reviews_store)
			.filter((r) => r.toffee_key.includes(me.alias))
			.reduce((a, b) => a + b.rating, 0) / my_nums_reviews
	);

	let stars = Array.from('0'.repeat(my_rating ?? 0));
	let max_index = me?.featured_image_url_paths?.length - 1;
	function toggle_image(time) {
		image_index = image_index >= max_index ? 0 : image_index + 1;
		setTimeout(() => toggle_image(random_time()), time * 1000);
	}

	setTimeout(() => toggle_image(random_time()), random_time() * 1000);
</script>

<div class="big_wrapper">
	<div class="regular_wrapper">
		<div class="product trackable" id={me.alias}>
			<a
				data-sveltekit-preload-code="eager"
				href="/products/{me.alias}"
				class="images same_width trackable"
				id={me.alias + '_page'}
			>
				{#if me.annotation}
					<div class="annotation">{me.annotation}</div>
				{/if}
				<div
					class="overlay image same_width trackable"
					id={me.alias + '_page'}
					style:background={'var(--accent-200)'}
				></div>
				{#each me?.featured_image_url_paths as image, index}
					<div
						class:shown={image_index == index}
						class:hidden={image_index !== index}
						class="overlay image same_width trackable"
						id={me.alias + '_page'}
						style:background-image={`url(${image})`}
					></div>
				{/each}
			</a>
			<div class="detials_wrap">
				<div class="details">
					<span class="name">
						{me.name}
					</span>

					<br />
					<div style="text-overflow: ellipsis;overflow: hidden; flex-shrink:100;">
						{#if Array.isArray(me.long_desc)}
							{#each me.long_desc as p}
								<p style="margin:0">{p}</p>
							{/each}
						{:else}
							{me.long_desc}
						{/if}
					</div>

					<div class="post_description_details">
						{#if multi == true}
							<select
								style="grid-column: 1 / 3"
								bind:value={me}
								class="input_element"
								id="toffee_selector"
							>
								{#each items as m}
									<option value={m}>{m.name}</option>
								{/each}
							</select>
						{/if}
						<span class="price">${Math.round(me.price / 100)}</span>
						<!-- {#if my_nums_reviews > 0}
							<div class="stars">
								{#each stars as r}
									<Star height="1.2em" width="1.2em" />
								{/each}
								<div>
									{my_nums_reviews} Review{my_nums_reviews > 1 ? 's' : ''}
								</div>
							</div>
						{/if} -->

						<a
							id={me.alias + '_addToCart'}
							class="add_to_cart trackable"
							href="/products/{me.alias}"
						>
							View Product
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	@media (max-width: 25rem) {
		.product {
			display: flex;
			flex-direction: column;
			overflow: hidden;
			justify-content: flex-start;
			align-items: center;
		}
		.details {
			display: flex;
			flex-direction: column;
			padding: 0.5rem;
			justify-content: space-between;
			align-items: flex-start;
			gap: 5px;
		}
		.name {
			font-size: 1.2em;
			font-weight: 600;
			text-align: left;
		}
		.big_wrapper {
			border-bottom: 1px solid var(--accent-700);
			border-top: 1px solid var(--accent-700);
			padding: 1em 0;
		}
		.big_wrapper:nth-child(2n) > .regular_wrapper {
			padding-left: 0.5em;
			border-right: 1px solid rgba(0, 0, 0, 0);
		}
		.big_wrapper:nth-child(odd) > .regular_wrapper {
			border-right: 1px solid var(--accent-700);
			padding-right: 0.5em;
		}
		/* .big_wrapper {
      border-bottom: 1px solid var(--accent-500);
      border-top: 1px solid var(--accent-500);

      padding: 1em 0;
    }
    .big_wrapper:last-child > .regular_wrapper {
      border-right: 1px solid rgba(0, 0, 0, 0);
      padding-right: 0.5em;
    } */
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

		.detials_wrap {
			background-color: var(--accent-800);
		}
		.add_to_cart {
			background-color: var(--accent-600);
			border-bottom: 1px solid var(--accent-600);
			border-top: 1px solid var(--accent-600);
			padding: 0.25rem 0.5rem;
			font-size: 1.1em;
			cursor: pointer;
			transition: all 0.5s ease;
			color: black;
			text-decoration: none;
		}
		.post_description_details {
			padding: 0 0.5rem;
			display: flex;
			flex-direction: column;
			width: calc(100% - 2rem);
			grid-template-columns: 1fr max-content;
			grid-template-rows: max-content max-content max-content;
			justify-items: stretch;
			justify-content: space-between;
			align-items: center;
			gap: 0.5em;
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
	}
	@media (min-width: 25rem) {
		.product {
			display: flex;
			flex-direction: column;
			overflow: hidden;
			justify-content: flex-start;
			align-items: center;
		}
		.details {
			display: flex;
			flex-direction: column;
			padding: 0.5rem;
			justify-content: space-between;
			align-items: flex-start;
			gap: 5px;
		}
		.name {
			font-size: 1.2em;
			font-weight: 600;
			text-align: left;
		}
		.big_wrapper {
			border-bottom: 1px solid var(--accent-700);
			border-top: 1px solid var(--accent-700);
			padding: 1em 0;
		}
		.big_wrapper:nth-child(2n) > .regular_wrapper {
			padding-left: 0.5em;
			border-right: 1px solid rgba(0, 0, 0, 0);
		}
		.big_wrapper:nth-child(odd) > .regular_wrapper {
			border-right: 1px solid var(--accent-700);
			padding-right: 0.5em;
		}
		/* .big_wrapper {
      border-bottom: 1px solid var(--accent-500);
      border-top: 1px solid var(--accent-500);

      padding: 1em 0;
    }
    .big_wrapper:last-child > .regular_wrapper {
      border-right: 1px solid rgba(0, 0, 0, 0);
      padding-right: 0.5em;
    } */
		.regular_wrapper {
			height: 100%;
		}
		.same_width {
			width: 100%;
			background-size: cover;
			aspect-ratio: 1/1;
			height: auto;
			overflow: hidden;
		}

		.detials_wrap {
			background-color: var(--accent-800);
		}
		.add_to_cart {
			background-color: var(--accent-600);
			border-bottom: 1px solid var(--accent-600);
			border-top: 1px solid var(--accent-600);
			padding: 0.25rem 0.5rem;
			font-size: 1.1em;
			cursor: pointer;
			transition: all 0.5s ease;
			color: black;
			text-decoration: none;
		}
		.post_description_details {
			padding: 0 0.5rem;
			display: grid;
			width: calc(100% - 2rem);
			grid-template-columns: 1fr max-content;
			grid-template-rows: max-content max-content max-content;
			justify-items: stretch;
			justify-content: space-between;
			align-items: center;
			gap: 0.5em;
		}
	}
	@media (min-width: 35rem) {
		.product {
			--detials-width: 100%;
			display: grid;
			grid-template-columns: 1fr auto;
			overflow: hidden;
			text-align: left;
			color: var(--text_color);
			margin: 0 1em;
		}
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
		.details {
			display: flex;
			flex-direction: column;
			padding: 1rem;
			justify-content: space-between;
			align-items: flex-start;
			gap: 5px;
		}

		.same_width {
			width: var(--width, 15rem);
			height: var(--height, 15rem);
		}
		.detials_wrap {
			width: var(--detials-width, 15rem);
			height: var(--detials-height, 15rem);
			background-color: var(--accent-800);
		}
		.name {
			font-size: 2rem;
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
		.post_description_details {
			padding: 0 1rem;
			display: grid;
			width: calc(100% - 2rem);
			grid-template-columns: 1fr max-content;
			grid-template-rows: max-content max-content max-content;
			justify-items: stretch;
			justify-content: space-between;
			align-items: center;
			gap: 0.5em;
		}
		.input_element {
			padding: 0.5rem;
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
	}
	@media (min-width: 70rem) {
		.product {
			--width: 18rem;
			--height: 18rem;
			/* --detials-width: 32rem; */
			--detials-height: var(--height);
		}
	}
	@media (min-width: 90rem) {
		.product {
			--width: 21rem;
			--height: 21rem;
			/* --detials-width: 45rem; */
			--detials-height: var(--height);
		}
	}
	@media (min-width: 125rem) {
		.product {
			--width: 24rem;
			--height: 24rem;
			/* --detials-width: 62rem; */
			--detials-height: var(--height);
		}
	}
	.product {
		text-decoration: none;
	}

	.details {
		height: calc(var(--detials-height, 15rem) - 2rem);
	}

	.stars {
		font-size: large;
	}
	.star {
		margin-right: 2px;
	}
	.price {
		font-size: large;
	}

	.add_to_cart:hover {
		background-color: var(--accent-700);
		transform: scale(1.05);
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
		transition: all 2s linear;
	}
	.annotation {
		text-align: center;
		position: absolute;
		top: 0;
		left: 0;
		transform: rotate(-45deg) translate(-4rem, -1.5rem);
		background-color: var(--accent-color);
		color: var(--text_color);
		padding: 5px 4rem;

		font-size: 1.4rem;
		z-index: 1;
		inline-size: min-content;
		width: max-content;
	}
	.hidden {
		opacity: 0;
	}
	.shown {
		opacity: 1;
	}
</style>
