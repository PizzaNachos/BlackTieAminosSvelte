<script lang="ts">
	import { goto } from '$app/navigation';
	import { app_config } from '$lib/config.js';
	import type { ReviewInterface } from '$lib/interfaces.js';
	import { new_socket } from '$lib/stores/interactions.js';
	import {
		all_products_store,
		secretagogues_store,
		everything_else,
		get_prod_from_stripe_key,
		glp1_store
	} from '$lib/stores/products';
	import { get } from 'svelte/store';

	import { fade } from 'svelte/transition';

	export let data;
	let { has_order, order, uuid } = data;

	let loading = false;
	let error: string = '';

	let review: ReviewInterface = {
		user_name: '',
		review_text: '',
		product_id: get(glp1_store)[0].id,
		review_rating: 5,
		order_uuid: uuid ?? null
	};
	async function post_review(event) {
		loading = true;
		const interaction = {
			t: 'click',
			d: { target: event?.target?.id }
		};
		console.log('abou to ack Interaction post', interaction);
		let ack = await new_socket.emitWithAck('interaction-ack', interaction);
		console.log('Acking Interaction post', ack);
		// console.log(review, event);
		fetch(`${app_config.api_base}/aapii/review`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(review)
		}).then(async (res) => {
			await new Promise((resolve) => setTimeout(resolve, 1000));
			loading = false;
			switch (res.status) {
				case 201:
					goto('/');
					break;
				case 202:
					goto('/');
					break;
				case 200:
					error =
						"You're review was recorded but a discount code could not be generated, please contact us at info@coloradotoffee.com";
					break;
				case 500:
					error =
						'There was an error saving your review, please contact us at info@coloradotoffee.com';
			}
		});
	}
</script>

{#if has_order}
	<div class="form_wrapper">
		<div class="input_wrapper">
			<h1>Leave us a review!</h1>
			<h2>Tell us how you liked your items</h2>
			<div class="items">
				{#each order.products as pro}
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
			{#if error}
				<span in:fade|global={{ duration: 250 }} class="error">{error}</span>
			{/if}
			<input bind:value={review.user_name} class="input_element" type="text" placeholder="Name" />
			<textarea
				bind:value={review.review_text}
				class="input_element"
				id="review_text"
				rows="5"
				cols="33"
				placeholder="review"
				spellcheck="true"
			></textarea>
			<select bind:value={review.toffee_rating} class="input_element" id="toffee_selector">
				<option value="5">5/5</option>
				<option value="4">4/5</option>
				<option value="3">3/5</option>
				<option value="2">2/5</option>
				<option value="1">1/5</option>
			</select>
		</div>
		{#if loading}
			<div in:fade|global={{ duration: 250 }} class="col-sm-2">
				<div id="dots1">
					<span></span>
					<span></span>
					<span></span>
					<span></span>
				</div>
			</div>
		{:else}
			<button class="input_element" on:click={(event) => post_review(event)}>Submit</button>
		{/if}
	</div>
{:else}
	<div class="form_wrapper">
		<h1>Leave us a review!</h1>
		<div class="input_wrapper">
			{#if error}
				<span in:fade|global={{ duration: 250 }} class="error">{error}</span>
			{/if}
			<input bind:value={review.name} class="input_element" type="text" placeholder="Name" />
			<textarea
				bind:value={review.review_text}
				class="input_element"
				id="review_text"
				rows="5"
				cols="33"
				placeholder="review"
				spellcheck="true"
			></textarea>
			<select bind:value={review.product_id} class="input_element" id="toffee_selector">
				{#each get(glp1_store)
					.concat(get(secretagogues_store))
					.concat(get(everything_else)) as product}
					<option value={product.id}>{product.name}</option>
				{/each}
				<!-- <option value="dark">classic Chocolate Almond Toffee</option>
        <option value="milk">Milk Chocolate Almond Toffee</option>
        <option value="spicy">Spicy Chocolate Almond Toffee</option>
        <option value="salty">Salted Chocolate Almond Toffee</option>
        <option value="pecan">Pecan Brittle</option>
        <option value="butterscotch">Old Fashioned Butterscotch Chews</option>
        <option value="bourbon_butterscotch"
          >Bourbon Butterscotch Butterscotch Chews</option
        >
        <option value="habenero_butterscotch"
          >Habenero Butterscotch Chews</option
        > -->
			</select>
			<select bind:value={review.toffee_rating} class="input_element" id="toffee_selector">
				<option value="5">5/5</option>
				<option value="4">4/5</option>
				<option value="3">3/5</option>
				<option value="2">2/5</option>
				<option value="1">1/5</option>
			</select>
		</div>
		{#if loading}
			<div in:fade|global={{ duration: 250 }} class="col-sm-2">
				<div id="dots1">
					<span></span>
					<span></span>
					<span></span>
					<span></span>
				</div>
			</div>
		{:else}
			<button class="input_element" on:click={(event) => post_review(event)}>Submit</button>
		{/if}
	</div>{/if}

<style>
	.form_wrapper {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 1em;
		gap: 2rem;
		color: var(--text-color);
	}
	.input_wrapper {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		max-width: 80ch;
		min-width: 40vw;
		justify-content: space-around;
		align-items: stretch;
		font-size: larger;
	}
	.input_element {
		padding: 0.5rem;
		border-radius: 5px;
		background-color: var(--accent-800);
	}
	.input_element {
		border: 2px solid rgb(0, 0, 0, 0);
		transition: all 0.25s ease;
	}
	.input_element:hover {
		border: 2px solid var(--accent-200);
	}
	.error {
		color: rgb(255, 130, 130);
		background-color: var(--accent-200);
		padding: 0.5rem;
		border-radius: 5px;
	}
	.col-sm-2 {
		padding-top: 2em;
		position: relative;
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
			grid-template-columns: 5em 1fr;

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
		height: 5em;
		width: auto;
	}
</style>
