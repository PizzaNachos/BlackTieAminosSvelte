<script lang="ts">
	import { cart_contents, remove_from_cart, update_quantity, cart_subtotal_cents } from '$lib/stores/cart';
	import { blur } from 'svelte/transition';
	import type { cart_product } from '$lib/interfaces';
	import XIcon from '$lib/icons/XIcon.svelte';

	function change_product(pro: cart_product, amount: number) {
		const next = pro.ammount + amount;
		if (next <= 0) {
			remove_from_cart(pro);
		} else {
			update_quantity(pro.product, next);
		}
	}

	function formatUsd(cents: number) {
		return `$${(cents / 100).toFixed(2)}`;
	}

	function variantLabel(pro: cart_product): string | null {
		return pro.product.variant_label ?? null;
	}
</script>

<div class="cart_page">
	<div style="font-size:x-large; padding-bottom: 1rem">Cart:</div>

	{#if $cart_contents.length === 0}
		<div>Your cart is empty.</div>
	{:else}
		<div class="cart_items">
			{#each $cart_contents as pro (pro.product.id)}
				<div in:blur|global out:blur|global class="cart_item">
					{#if pro.product.product_image_url_paths?.[0]}
						<img class="thumb" src={pro.product.product_image_url_paths[0]} alt={pro.product.name} />
					{:else}
						<div class="thumb placeholder"></div>
					{/if}
					<div class="center">
						<div class="name">{pro.product.name}</div>
						{#if variantLabel(pro)}
							<div class="variant">{variantLabel(pro)}</div>
						{/if}
						<div class="qty">
							<button on:click={() => change_product(pro, -1)} aria-label="Decrease">-</button>
							<span>{pro.ammount}</span>
							<button on:click={() => change_product(pro, 1)} aria-label="Increase">+</button>
						</div>
					</div>
					<span class="end">
						<button class="x" on:click={() => remove_from_cart(pro)} aria-label="Remove">
							<XIcon />
						</button>
						<div>{formatUsd(pro.ammount * pro.product.price)}</div>
					</span>
				</div>
			{/each}
		</div>

		<div class="subtotal">
			<span>Subtotal</span>
			<span>{formatUsd($cart_subtotal_cents)}</span>
		</div>

		<a class="submit_link" href="/order/">Review & Submit Order</a>
		<div class="note">No payment is collected here — we'll follow up to confirm details.</div>
	{/if}
</div>

<style>
	.cart_page {
		font-size: 1.1rem;
		text-align: left;
		min-width: min(35ch, 90vw);
	}
	.cart_items {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	.cart_item {
		display: grid;
		grid-template-columns: 5em 1fr auto;
		gap: 1rem;
		background-color: var(--accent-800);
		padding: 0.5em;
		align-items: center;
	}
	.thumb {
		width: 5em;
		height: 5em;
		object-fit: contain;
		background: var(--accent-700);
	}
	.thumb.placeholder {
		background: var(--accent-700);
	}
	.center {
		display: flex;
		flex-direction: column;
		gap: 0.5em;
	}
	.name {
		font-weight: 600;
	}
	.variant {
		font-size: 0.85em;
		opacity: 0.75;
	}
	.qty {
		display: inline-flex;
		gap: 2px;
		background-color: var(--accent-400);
	}
	.qty button {
		background-color: var(--accent-700);
		padding: 0 1ch;
		cursor: pointer;
	}
	.qty span {
		background-color: var(--accent-800);
		padding: 0 1ch;
	}
	.end {
		display: flex;
		flex-direction: column;
		gap: 0.5em;
		align-items: flex-end;
		font-size: 0.95em;
	}
	.x {
		background: none;
		cursor: pointer;
	}
	.subtotal {
		display: flex;
		justify-content: space-between;
		padding: 1rem 0.25rem;
		border-top: 1px solid var(--accent-500);
		margin-top: 1rem;
		font-size: 1.2em;
		font-weight: 600;
	}
	.submit_link {
		display: block;
		text-align: center;
		background-color: var(--accent-200);
		color: var(--accent-900);
		text-decoration: none;
		padding: 0.75em 1em;
		border-radius: 5px;
		margin-top: 0.5rem;
		font-weight: 600;
	}
	.note {
		font-size: 0.85em;
		opacity: 0.75;
		padding: 0.5rem 0.25rem 0;
		text-align: center;
	}
</style>
