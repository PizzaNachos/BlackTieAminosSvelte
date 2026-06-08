<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import {
		cart_contents,
		cart_subtotal_cents,
		remove_from_cart,
		update_quantity,
		submitUnpaid,
		loadContact,
		saveContact,
		empty_cart,
		formatShippingAddress,
		type ContactDetails
	} from '$lib/stores/cart';
	import { RESEARCH_USE_AGREEMENT_TEXT } from '$lib/ruo';
	import { qoroSettings, loadStorefront } from '$lib/qoro/store';
	import { lastSubmittedOrder } from '$lib/qoro/lastOrder';
	import type { cart_product } from '$lib/interfaces';

	let contact: ContactDetails = {
		name: '',
		email: '',
		phone_number: '',
		shipping_address: '',
		shipping_address_line1: '',
		shipping_address_line2: '',
		shipping_city: '',
		shipping_state: '',
		shipping_zipcode: '',
		note: '',
		heard_from: ''
	};
	let submitting = false;
	let submitError: string | null = null;
	let researchUseAccepted = false;
	const zipCodePattern = /^[0-9]{5}(-[0-9]{4})?$/;
	const stateOptions = [
		['AL', 'Alabama'],
		['AK', 'Alaska'],
		['AZ', 'Arizona'],
		['AR', 'Arkansas'],
		['CA', 'California'],
		['CO', 'Colorado'],
		['CT', 'Connecticut'],
		['DE', 'Delaware'],
		['FL', 'Florida'],
		['GA', 'Georgia'],
		['HI', 'Hawaii'],
		['ID', 'Idaho'],
		['IL', 'Illinois'],
		['IN', 'Indiana'],
		['IA', 'Iowa'],
		['KS', 'Kansas'],
		['KY', 'Kentucky'],
		['LA', 'Louisiana'],
		['ME', 'Maine'],
		['MD', 'Maryland'],
		['MA', 'Massachusetts'],
		['MI', 'Michigan'],
		['MN', 'Minnesota'],
		['MS', 'Mississippi'],
		['MO', 'Missouri'],
		['MT', 'Montana'],
		['NE', 'Nebraska'],
		['NV', 'Nevada'],
		['NH', 'New Hampshire'],
		['NJ', 'New Jersey'],
		['NM', 'New Mexico'],
		['NY', 'New York'],
		['NC', 'North Carolina'],
		['ND', 'North Dakota'],
		['OH', 'Ohio'],
		['OK', 'Oklahoma'],
		['OR', 'Oregon'],
		['PA', 'Pennsylvania'],
		['RI', 'Rhode Island'],
		['SC', 'South Carolina'],
		['SD', 'South Dakota'],
		['TN', 'Tennessee'],
		['TX', 'Texas'],
		['UT', 'Utah'],
		['VT', 'Vermont'],
		['VA', 'Virginia'],
		['WA', 'Washington'],
		['WV', 'West Virginia'],
		['WI', 'Wisconsin'],
		['WY', 'Wyoming']
	] as const;

	onMount(() => {
		loadStorefront();
		contact = loadContact();
	});

	function formatUsd(cents: number) {
		return `$${(cents / 100).toFixed(2)}`;
	}

	function variantLabel(pro: cart_product): string | null {
		return pro.product.variant_label ?? null;
	}

	function changeQty(pro: cart_product, delta: number) {
		const next = pro.ammount + delta;
		if (next <= 0) {
			remove_from_cart(pro);
		} else {
			update_quantity(pro.product, next);
		}
	}

	function setQty(pro: cart_product, value: number) {
		if (!Number.isFinite(value) || value <= 0) {
			remove_from_cart(pro);
		} else {
			update_quantity(pro.product, Math.floor(value));
		}
	}

	$: settings = $qoroSettings;
	$: orderingDisabled =
		settings != null &&
		(settings.ecommerce_enabled === false || settings.checkout?.unpaid_enabled === false);
	$: minOrderCents = settings?.min_order_amount_cents ?? null;
	$: requiredFields = settings?.checkout?.required_fields ?? {
		name: true,
		email: true,
		phone: true,
		shipping_address: true
	};
	$: belowMin = minOrderCents != null && $cart_subtotal_cents < minOrderCents;
	$: missingRequired = (() => {
		const missing: string[] = [];
		if (requiredFields.name && !contact.name.trim()) missing.push('name');
		if (requiredFields.email && !contact.email.trim()) missing.push('email');
		if (requiredFields.phone && !contact.phone_number.trim()) missing.push('phone');
		if (requiredFields.shipping_address) {
			if (!contact.shipping_address_line1.trim()) missing.push('address line 1');
			if (!contact.shipping_city.trim()) missing.push('city');
			if (!contact.shipping_state.trim()) missing.push('state');
			if (!contact.shipping_zipcode.trim()) {
				missing.push('ZIP code');
			} else if (!zipCodePattern.test(contact.shipping_zipcode.trim())) {
				missing.push('valid ZIP code');
			}
		}
		return missing;
	})();
	$: canSubmit =
		$cart_contents.length > 0 &&
		!orderingDisabled &&
		!belowMin &&
		missingRequired.length === 0 &&
		researchUseAccepted &&
		!submitting;

	async function handleSubmit() {
		if (!canSubmit) return;
		submitting = true;
		submitError = null;
		try {
			const normalizedContact = {
				...contact,
				shipping_address: formatShippingAddress(contact)
			};
			saveContact(normalizedContact);
			const { order_id, raw } = await submitUnpaid({
				...normalizedContact,
				research_use_accepted: researchUseAccepted
			});
			lastSubmittedOrder.set({
				order_id,
				submittedAt: Date.now(),
				contact: { ...normalizedContact },
				raw
			});
			empty_cart();
			await goto('/order/submitted/');
		} catch (e: any) {
			submitError = e?.message ?? 'Submission failed. Please try again.';
		} finally {
			submitting = false;
		}
	}
</script>

<svelte:head>
	<title>Black Tie Aminos | Submit Research Request</title>
	<link rel="icon" href="/favicon.png" />
</svelte:head>

<section class="order_page">
	<h1>Your Research Request</h1>

	{#if $cart_contents.length === 0}
		<div class="empty">
			<p>Your research request is empty.</p>
			<a class="cta" href="/products/">Browse research materials</a>
		</div>
	{:else}
		<div class="grid">
			<div class="items_col">
				<h2>Items</h2>
				<div class="items">
					{#each $cart_contents as pro (pro.product.id)}
						<div class="item">
							{#if pro.product.product_image_url_paths?.[0]}
								<img
									class="thumb"
									src={pro.product.product_image_url_paths[0]}
									alt={pro.product.name}
								/>
							{:else}
								<div class="thumb placeholder"></div>
							{/if}
							<div class="meta">
								<div class="name">{pro.product.name}</div>
								{#if variantLabel(pro)}
									<div class="variant">{variantLabel(pro)}</div>
								{/if}
								<div class="unit_price">{formatUsd(pro.product.price)} / {pro.product.unit}</div>
								<div class="qty">
									<button on:click={() => changeQty(pro, -1)} aria-label="Decrease">-</button>
									<input
										type="number"
										min="1"
										value={pro.ammount}
										on:change={(e) => setQty(pro, Number((e.target as HTMLInputElement).value))}
									/>
									<button on:click={() => changeQty(pro, 1)} aria-label="Increase">+</button>
								</div>
							</div>
							<div class="line_end">
								<button class="remove" on:click={() => remove_from_cart(pro)}>Remove</button>
								<div class="line_total">{formatUsd(pro.ammount * pro.product.price)}</div>
							</div>
						</div>
					{/each}
				</div>

				<div class="subtotal">
					<span>Subtotal</span>
					<span>{formatUsd($cart_subtotal_cents)}</span>
				</div>

				{#if minOrderCents != null}
					<div class="minorder" class:warn={belowMin}>
						Minimum order: {formatUsd(minOrderCents)}
					</div>
				{/if}
			</div>

			<div class="form_col">
				<h2>Contact & Shipping</h2>
				<p class="lede">
					No payment is collected here. We'll review your research request and reach out to confirm
					details and arrange payment.
				</p>
				<p class="restriction_notice">
					Requests indicating personal, human, or animal use will not be fulfilled.
				</p>

				<form on:submit|preventDefault={handleSubmit}>
					<label>
						<span>Name</span>
						<input
							type="text"
							bind:value={contact.name}
							required={requiredFields.name}
							autocomplete="name"
						/>
					</label>
					<label>
						<span>Email</span>
						<input
							type="email"
							bind:value={contact.email}
							required={requiredFields.email}
							autocomplete="email"
						/>
					</label>
					<label>
						<span>Phone</span>
						<input
							type="tel"
							bind:value={contact.phone_number}
							required={requiredFields.phone}
							autocomplete="tel"
							placeholder="+1 555 555 5555"
						/>
					</label>
					<fieldset class="address_fields">
						<legend>Shipping address</legend>
						<label>
							<span>Line 1</span>
							<input
								type="text"
								bind:value={contact.shipping_address_line1}
								required={requiredFields.shipping_address}
								autocomplete="address-line1"
								placeholder="Street address"
							/>
						</label>
						<label>
							<span>Line 2 (optional)</span>
							<input
								type="text"
								bind:value={contact.shipping_address_line2}
								autocomplete="address-line2"
								placeholder="Apartment, suite, unit, building, floor"
							/>
						</label>
						<div class="address_row">
							<label>
								<span>City</span>
								<input
									type="text"
									bind:value={contact.shipping_city}
									required={requiredFields.shipping_address}
									autocomplete="address-level2"
								/>
							</label>
							<label>
								<span>State</span>
								<select
									bind:value={contact.shipping_state}
									required={requiredFields.shipping_address}
									autocomplete="address-level1"
								>
									<option value="" disabled>Select</option>
									{#each stateOptions as [abbreviation, name]}
										<option value={abbreviation}>{abbreviation} - {name}</option>
									{/each}
								</select>
							</label>
							<label>
								<span>ZIP code</span>
								<input
									type="text"
									bind:value={contact.shipping_zipcode}
									required={requiredFields.shipping_address}
									autocomplete="postal-code"
									inputmode="numeric"
									maxlength="10"
									title="Use a 5-digit ZIP code or ZIP+4"
								/>
							</label>
						</div>
					</fieldset>
					<label>
						<span>Note (optional)</span>
						<textarea bind:value={contact.note} rows="3" placeholder="Anything else we should know?"
						></textarea>
					</label>
					<label>
						<span>Who did you hear us through?</span>
						<input
							type="text"
							bind:value={contact.heard_from}
							placeholder="Name, referral, group, or community"
						/>
						<small>This helps us expedite your independent researcher status.</small>
					</label>
					<label class="agreement">
						<input type="checkbox" bind:checked={researchUseAccepted} required />
						<span>{RESEARCH_USE_AGREEMENT_TEXT}</span>
					</label>

					{#if orderingDisabled}
						<div class="banner err">Ordering is temporarily unavailable.</div>
					{/if}
					{#if belowMin}
						<div class="banner warn">
							Add {formatUsd((minOrderCents ?? 0) - $cart_subtotal_cents)} more to reach the minimum
							order.
						</div>
					{/if}
					{#if missingRequired.length > 0}
						<div class="banner subtle">
							Required: {missingRequired.join(', ')}
						</div>
					{/if}
					{#if !researchUseAccepted}
						<div class="banner subtle">Required: research use agreement</div>
					{/if}
					{#if submitError}
						<div class="banner err">{submitError}</div>
					{/if}

					<button class="submit" type="submit" disabled={!canSubmit}>
						{submitting ? 'Submitting...' : 'Submit Research Request for Review'}
					</button>
				</form>
			</div>
		</div>
	{/if}
</section>

<style>
	.order_page {
		padding: 2rem 1rem 4rem;
		max-width: 80rem;
		margin: 0 auto;
	}
	h1 {
		font-size: 2.2rem;
		margin: 0 0 1.5rem;
	}
	h2 {
		font-size: 1.4rem;
		margin: 0 0 1rem;
	}
	.grid {
		display: grid;
		gap: 2rem;
	}
	@media (min-width: 56rem) {
		.grid {
			grid-template-columns: 1.3fr 1fr;
			align-items: start;
		}
	}
	.items {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}
	.item {
		display: grid;
		grid-template-columns: 5em 1fr auto;
		gap: 1rem;
		background-color: var(--accent-800);
		padding: 0.75em;
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
	.meta {
		display: flex;
		flex-direction: column;
		gap: 0.35em;
	}
	.name {
		font-weight: 600;
	}
	.variant {
		font-size: 0.85em;
		opacity: 0.75;
	}
	.unit_price {
		font-size: 0.9em;
		opacity: 0.85;
	}
	.qty {
		display: inline-flex;
		gap: 2px;
		background-color: var(--accent-400);
		width: max-content;
	}
	.qty button {
		background-color: var(--accent-700);
		padding: 0 1ch;
		cursor: pointer;
	}
	.qty input {
		width: 5ch;
		text-align: center;
		background-color: var(--accent-800);
		color: inherit;
		border: none;
	}
	.line_end {
		display: flex;
		flex-direction: column;
		gap: 0.5em;
		align-items: flex-end;
	}
	.remove {
		background: none;
		cursor: pointer;
		opacity: 0.75;
		font-size: 0.9em;
	}
	.remove:hover {
		opacity: 1;
	}
	.line_total {
		font-weight: 600;
	}
	.subtotal {
		display: flex;
		justify-content: space-between;
		padding: 1rem 0.5rem;
		border-top: 1px solid var(--accent-500);
		margin-top: 1rem;
		font-size: 1.2em;
		font-weight: 600;
	}
	.minorder {
		font-size: 0.9em;
		opacity: 0.8;
	}
	.minorder.warn {
		color: var(--accent-100);
		background: rgba(170, 38, 38, 0.4);
		padding: 0.5em 0.75em;
		border-radius: 5px;
		opacity: 1;
	}
	.lede {
		font-size: 0.95em;
		opacity: 0.85;
		margin: 0 0 1rem;
	}
	.restriction_notice {
		padding: 0.75rem 0.9rem;
		background-color: var(--accent-800);
		border-left: 4px solid var(--accent-300);
		line-height: 1.4;
	}
	form {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}
	label {
		display: flex;
		flex-direction: column;
		gap: 0.35em;
		font-size: 0.95em;
	}
	label > span {
		font-weight: 600;
	}
	label small {
		opacity: 0.75;
		line-height: 1.4;
	}
	.address_fields {
		border: 0;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}
	.address_fields legend {
		padding: 0;
		margin-bottom: 0.35em;
		font-weight: 600;
	}
	.address_row {
		display: grid;
		gap: 0.75rem;
	}
	@media (min-width: 34rem) {
		.address_row {
			grid-template-columns: 1fr 6rem 11rem;
		}
	}
	.agreement {
		flex-direction: row;
		align-items: flex-start;
		gap: 0.6rem;
		line-height: 1.4;
	}
	.agreement input {
		flex: 0 0 auto;
		width: 1.1rem;
		height: 1.1rem;
		margin-top: 0.15em;
		padding: 0;
		accent-color: var(--accent-200);
	}
	.agreement > span {
		font-weight: 400;
	}
	input,
	select,
	textarea {
		font: inherit;
		padding: 0.5em 0.75em;
		background-color: var(--accent-800);
		color: inherit;
		border: 1px solid var(--accent-500);
		border-radius: 5px;
	}
	input:focus,
	select:focus,
	textarea:focus {
		outline: none;
		border-color: var(--accent-200);
	}
	textarea {
		resize: vertical;
	}
	.submit {
		margin-top: 0.5rem;
		padding: 0.85em 1em;
		font-size: 1.1em;
		font-weight: 600;
		background-color: var(--accent-200);
		color: var(--accent-900);
		border: none;
		border-radius: 6px;
		cursor: pointer;
	}
	.submit:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
	.banner {
		padding: 0.6em 0.85em;
		border-radius: 5px;
		font-size: 0.95em;
	}
	.banner.err {
		background-color: rgba(170, 38, 38, 0.4);
		color: var(--accent-100);
	}
	.banner.warn {
		background-color: var(--accent-300);
		color: var(--accent-900);
	}
	.banner.subtle {
		background-color: var(--accent-800);
		opacity: 0.85;
	}
	.empty {
		padding: 3rem 1rem;
		text-align: center;
		display: flex;
		flex-direction: column;
		gap: 1rem;
		align-items: center;
	}
	.cta {
		background-color: var(--accent-200);
		color: var(--accent-900);
		padding: 0.6em 1.2em;
		border-radius: 6px;
		text-decoration: none;
		font-weight: 600;
	}
</style>
