<script lang="ts">
	import { empty_cart } from '$lib/stores/cart.js';
	import { get_prod_from_stripe_key } from '$lib/stores/products';
	export let data;
	let renderable_data = data;

	empty_cart();
</script>

<div class="container">
	{#if renderable_data.valid}
		<article>
			<h2>Order Confirmed!</h2>
			<p>Thank you so much for your order!</p>
			<p>
				What happens now? We've received your order and are already working on it! If you have any
				questions or comments don't hesitate to email us at info@coloradotoffee.com
			</p>
			<div class="items">
				{#each renderable_data.order.products as pro}
					{#if get_prod_from_stripe_key(pro.stripe_id) != null && get_prod_from_stripe_key(pro.stripe_id)?.alias != 'ship'}
						<div class="border_wrapper">
							<div class="cart_item">
								<img
									class="toffee_thumbnail"
									src={get_prod_from_stripe_key(pro.stripe_id)?.product_image_url_paths[0]}
									alt="Toffee Thumbnail"
								/>
								<div class="center">
									<div>
										{get_prod_from_stripe_key(pro.stripe_id)?.name} x {pro.amount}
									</div>
								</div>
							</div>
						</div>
					{/if}
				{/each}
			</div>
		</article>
	{:else}
		<div class="title">There was no order found with that ID</div>
	{/if}
</div>

<style>
	@import '$lib/styles/blog.css';

	@media (max-width: 40rem) {
		.cart_item {
			display: grid;
			gap: 7px;
			grid-template-columns: 6em 1fr;
			justify-items: start;
			align-items: stretch;
			background-color: var(--accent-800);
		}
		.center {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: flex-start;
			text-wrap: wrap;
			padding: 0.5em 0;
		}
		.border_wrapper {
			padding: 1em 0;
			border-top: 1px solid var(--accent-400);
		}
	}
	@media (min-width: 40rem) {
		.container {
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 2em;
			margin: 2em auto;
			max-width: 80ch;
			min-height: 70vh;
			font-size: 1.4em;
		}
		.title {
			text-align: center;
			font-size: 1.4em;
		}
		.border_wrapper {
			padding: 1em 0;
			border-top: 1px solid var(--accent-400);
		}
		.cart_item {
			display: grid;
			justify-items: start;
			align-items: stretch;

			gap: 1rem 1rem;
			grid-template-columns: 6em 1fr;

			background-color: var(--accent-800);
		}
		.center {
			display: flex;
			gap: 1em;
			flex-direction: column;
			justify-content: space-between;
			align-items: flex-start;
			text-wrap: wrap;
			padding: 0.5em 0;
		}
	}

	.toffee_thumbnail {
		height: 6em;
		width: auto;
	}
</style>
