<script lang="ts">
	import {
		cart_contents,
		remove_from_cart,
		update_quantity,
		check_out,
		accepted_code,
		new_checkout
	} from '$lib/stores/cart';
	import { blur, fade } from 'svelte/transition';
	import type { cart_product } from '$lib/interfaces';
	import XIcon from '$lib/icons/XIcon.svelte';
	import CheckBox from '$lib/icons/CheckBox.svelte';
	import { get } from 'svelte/store';
	import { error } from '@sveltejs/kit';

	let loading = false;
	function change_product(pro: cart_product, amount: number) {
		let new_ammount = pro.ammount + amount;

		if (new_ammount <= 0) {
			remove_from_cart({ product: pro.product, ammount: 0 });
			return;
		}
		if (new_ammount > 0) {
			update_quantity(pro.product, new_ammount);
			return;
		}
	}

	const too_large_ammount = 20;
	let too_large = false;
	let free_override = false;

	cart_contents.subscribe((contents) => {
		free_override = contents.map((c) => c.product.name).includes('Free Shipping');
		too_large =
			contents.filter((c) => c.product.alias != 'ship').length > 0
				? contents
						.filter((c) => c.product.alias != 'ship')
						.map((a) => a.ammount)
						.reduce((a, b) => a + b, 0) > too_large_ammount
				: false;
	});
	let cart_length: number;
	cart_contents.subscribe((contents) => {
		if (contents.length > 0) {
			cart_length = contents.map((a) => a.ammount).reduce((a, b) => a + b);
		} else {
			cart_length = 0;
		}
	});

	let discount_code = '';
	$: checkout_preorder = false;
	$: checkout_preorder_date = undefined;
	$: error_text = null;
	$: error_jiggle = false;
	$: check_out_error = false;
	function validate_preorder_date(date_input) {
		let date = new Date(date_input);
		let now = new Date(Date.now());

		let three_months_future = new Date(Date.now());
		three_months_future.setMonth(now.getMonth() + 3);

		if (date < now) {
			error_jiggle = true;
			error_text = 'Shipping date must be in the future';
			error_jiggle = false;
			check_out_error = true;
			date_input = null;
		} else if (date > three_months_future) {
			error_jiggle = true;
			error_text = 'Shipping date cannot be more than 3 months in the future';
			check_out_error = true;

			error_jiggle = false;
		} else {
			error_jiggle = false;
			error_text = null;
			check_out_error = false;
			checkout_preorder_date = new Date(date_input).toISOString();
		}
	}
	async function validate_and_checkout(event) {
		if (checkout_preorder && checkout_preorder_date == null) {
			error_text = 'Shipping date must be set';
			error_jiggle = true;
			check_out_error = true;

			return;
		}
		loading = true;
		await new_checkout(event, checkout_preorder, checkout_preorder_date);
	}
</script>

<div class="cart_page">
	<!-- <div class="cart_announcement" style="">Orders Will Be Delayed until July 1st</div> -->
	<div style="font-size:x-large; padding-bottom: 1rem">Cart:</div>

	{#if $cart_contents.length == 0}
		Your cart is empty!
	{/if}

	<div class="cart_items">
		<div
			in:blur
			out:blur
			class="free_ship {cart_length < 4 && cart_length > 1 && !free_override ? '' : 'invisible'}"
		>
			Add {4 - cart_length} More item{4 - cart_length > 1 ? 's' : ''} to unlock free shipping
		</div>

		{#each $cart_contents as pro}
			{#if pro.product.alias != 'ship'}
				<div in:blur|global out:blur|global class="cart_item">
					<img
						class="toffee_thumbnail"
						src={pro.product.product_image_url_paths[0]}
						alt="Toffee Thumbnail"
					/>
					<div class="center">
						<div>{pro.product.name}</div>
						<div class="cart_number_picker" id="plusminuxinput">
							<button
								on:click={() => change_product(pro, 1)}
								class="trackable"
								id={pro.product.name + '_plus_input'}>+</button
							>
							<span>{pro.ammount}</span>
							<button
								on:click={() => change_product(pro, -1)}
								class="trackable"
								id={pro.product.name + '_minus_input'}>-</button
							>
						</div>
					</div>

					<span class="end">
						<button
							class="trackable"
							id={pro.product.name + '_x_button'}
							on:click={() => remove_from_cart(pro)}
						>
							<XIcon />
						</button>
						<div>${pro.ammount * Math.round(pro.product.price / 100)}</div>
					</span>
				</div>
			{:else if pro.ammount > 0}
				<div class="cart_item" id="shipping">
					<span class="product_name">
						{pro.product.name} : ${(pro.ammount * (pro.product.price / 100)).toFixed(2)}
					</span>
				</div>
			{/if}
		{/each}
	</div>

	<div in:blur|global={{ duration: 250 }} class="checkout_button">
		<div>
			To purchase please email <a href="mailto:contact@blacktieaminos.com"
				>contact@blacktieaminos.com</a
			>
		</div>
	</div>

	{#if loading}
		<div in:fade|global={{ duration: 250 }} class="col-sm-2">
			<div>
				<div id="dots1">
					<span></span>
					<span></span>
					<span></span>
					<span></span>
				</div>
			</div>
		</div>
	{/if}
</div>

<style>
	.cart_announcement {
		font-size: x-large;
		padding: 1rem;
		background-color: var(--accent-300);
		color: white;
		border-radius: 10px;
		margin: 1rem;
	}
	@media (max-width: 40rem) {
		.cart_item {
			display: grid;
			gap: 7px;
			grid-template-columns: 6em 1fr 2ch;
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
		.end {
			display: flex;
			gap: 1em;
			flex-direction: column;
			justify-content: space-between;
			align-items: flex-end;
			padding: 0.25em 0.25em 1em 0;
			justify-self: end;
			font-size: 0.9em;
		}
		.end > div {
			padding-right: 0.5em;
		}
		.end > button {
			background-color: inherit;
		}
		.checkout_button {
			margin: 1rem 2rem 4rem 2rem;
		}
	}
	@media (min-width: 40rem) {
		.cart_item {
			display: grid;
			justify-items: start;
			align-items: stretch;

			gap: 1rem 1rem;
			grid-template-columns: 6em 1fr 5ch;

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
		.end {
			display: flex;
			gap: 1em;
			flex-direction: column;
			justify-content: space-between;
			align-items: flex-end;
			padding: 0.25em 0.25em 1em 0;
			justify-self: end;
		}
		.end > div {
			padding-right: 1em;
		}
		.end > button {
			background-color: inherit;
		}
		.checkout_button {
			margin: 2rem;
		}
	}
	.cart_page {
		font-size: 1.25rem;
		text-align: center;
		min-width: min(calc(6em + 5ch + 30ch), 90vw);
	}

	.cart_items {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		gap: 1rem;
		align-items: stretch;
		text-align: left;
	}
	.toffee_thumbnail {
		height: 6em;
		width: auto;
	}
	#shipping {
		display: block;
		justify-self: flex-end;
		order: 99;
		padding: 0.5em;
	}
	#discount_input {
		display: block;
		justify-self: flex-end;
		order: 100;
		display: grid;
		grid-template-columns: 1fr 10ch;
		gap: 10px;
	}
	/* #discount_input *{
    padding: 5px;
    border-radius: 5px;
    background-color: var(--accent-800);
  }
  #discount_input > input {
    min-width: 15ch;
  } */

	.checkout_button * {
		margin: 2rem 2rem 0 2rem;
		background-color: var(--accent-200);
		color: var(--accent-900);
		border-radius: 5px;
		padding: 0.5rem 1rem;
		cursor: pointer;
	}
	.pre_order_area {
		width: 100%;
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1ch;
		padding: 1em 0;
		align-content: center;
	}
	.pre_order_area input {
		background-color: var(--accent-200);
		color: var(--accent-900);
		border-radius: 5px;
		padding: 5px;
		width: fit-content;
	}
	.product_name {
		text-align: left;
	}
	.cart_number_picker {
		border: 2px solid var(--accent-400);
		background-color: var(--accent-400);
		color: var(--text-color);
		display: flex;
		flex-direction: row;
		gap: 2px;
	}
	.cart_number_picker > button {
		background-color: var(--accent-700);
		padding: 0 1ch;
	}
	.cart_number_picker > button:hover {
		background-color: var(--accent-600);
		transition: all 0.5s ease;
	}
	.cart_number_picker > span {
		background-color: var(--accent-800);
		padding: 0 1ch;
	}
	.cart_warning {
		color: var(--accent-900);
		background-color: var(--accent-300);
		margin: 1rem 0;
		padding: 1rem;
		border-radius: 10px;
		overflow-wrap: break-word;
	}
	.free_ship {
		justify-self: flex-start;
		order: 98;
		background-color: var(--accent-600);
		color: var(--accent-200);
		padding: 0.75rem;
		border: 2px solid var(--accent-300);
		transition: all 1s ease;
		height: fit-content;
		font-size: inherit;
	}
	.invisible {
		opacity: 0;
		z-index: -2;
		padding: 0;
	}
	.col-sm-2 {
		padding-top: 2em;
		position: relative;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	#dots1 {
		display: block;
		position: absolute;
		height: 50px;
		width: 50px;
		margin: -25px 0 0 -25px;
	}

	#dots1 span {
		position: absolute;
		width: 10px;
		height: 10px;
		background: rgba(0, 0, 0, 0.25);
		border-radius: 50%;
		-webkit-animation: dots1 1s infinite ease-in-out;
		animation: dots1 1s infinite ease-in-out;
	}

	#dots1 span:nth-child(1) {
		left: 0px;
		-webkit-animation-delay: 0.2s;
		animation-delay: 0.2s;
	}

	#dots1 span:nth-child(2) {
		left: 15px;
		-webkit-animation-delay: 0.3s;
		animation-delay: 0.3s;
	}

	#dots1 span:nth-child(3) {
		left: 30px;
		-webkit-animation-delay: 0.4s;
		animation-delay: 0.4s;
	}

	#dots1 span:nth-child(4) {
		left: 45px;
		-webkit-animation-delay: 0.5s;
		animation-delay: 0.5s;
	}

	@keyframes dots1 {
		0% {
			-webkit-transform: translateY(0px);
			transform: translateY(0px);
			-webkit-transform: translateY(0px);
			transform: translateY(0px);
			background: rgba(0, 0, 0, 0.25);
		}
		50% {
			-webkit-transform: translateY(10px);
			transform: translateY(10px);
			-webkit-transform: translateY(10px);
			transform: translateY(10px);
			background: #000000;
		}
		100% {
			-webkit-transform: translateY(0px);
			transform: translateY(0px);
			-webkit-transform: translateY(0px);
			transform: translateY(0px);
			background: rgba(0, 0, 0, 0.25);
		}
	}
	@-webkit-keyframes dots1 {
		0% {
			-webkit-transform: translateY(0px);
			transform: translateY(0px);
			background: rgba(0, 0, 0, 0.25);
		}
		50% {
			-webkit-transform: translateY(10px);
			transform: translateY(10px);
			background: #000000;
		}
		100% {
			-webkit-transform: translateY(0px);
			transform: translateY(0px);
			background: rgba(0, 0, 0, 0.25);
		}
	}

	.accepted_discount {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 2em;
		flex-direction: row;
		padding: 5px 10px;
		background-color: var(--accent-500);
		border-radius: 5px;
		align-self: flex-start;
	}
	.last {
		justify-self: flex-end;
		order: 100;
	}
	.error_jiggle {
		animation: jiggle 0.25s;
	}
	@keyframes jiggle {
		0% {
			transform: translateX(0);
		}
		25% {
			transform: translateX(-5px);
		}
		50% {
			transform: translateX(5px);
		}
		100% {
			transform: translateX(0);
		}
	}
	.check_out_error {
		filter: contrast(0.1);
	}
</style>
