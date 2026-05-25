<script lang="ts">
	import { lastSubmittedOrder } from '$lib/qoro/lastOrder';
</script>

<svelte:head>
	<title>Black Tie Aminos | Order Received</title>
	<link rel="icon" href="/favicon.png" />
</svelte:head>

<section class="page">
	<div class="card">
		<h1>Thanks — we got it.</h1>

		{#if $lastSubmittedOrder?.order_id}
			<p class="ref">
				Order reference: <code>{$lastSubmittedOrder.order_id}</code>
			</p>
		{/if}

		<p>
			We'll review your order request and reach out within 1–2 business days at
			{#if $lastSubmittedOrder?.contact?.email}
				<strong>{$lastSubmittedOrder.contact.email}</strong>
			{:else}
				the email you provided
			{/if}
			to confirm details and arrange payment.
		</p>

		<p class="muted">
			Nothing has been charged. If you don't see anything from us, please email
			<a href="mailto:contact@blacktieaminos.com">contact@blacktieaminos.com</a>.
		</p>

		<a class="cta" href="/products/">Back to products</a>
	</div>
</section>

<style>
	.page {
		padding: 4rem 1rem;
		display: flex;
		justify-content: center;
	}
	.card {
		max-width: 50rem;
		background-color: var(--accent-800);
		padding: 2.5rem 2rem;
		border-radius: 10px;
		text-align: left;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	h1 {
		font-size: 2rem;
		margin: 0;
	}
	.ref code {
		background-color: var(--accent-700);
		padding: 0.2em 0.5em;
		border-radius: 4px;
		font-family: ui-monospace, monospace;
	}
	.muted {
		opacity: 0.8;
		font-size: 0.95em;
	}
	.cta {
		align-self: flex-start;
		background-color: var(--accent-200);
		color: var(--accent-900);
		padding: 0.6em 1.2em;
		border-radius: 6px;
		text-decoration: none;
		font-weight: 600;
		margin-top: 0.5rem;
	}
</style>
