<script lang="ts">
	import { onMount } from 'svelte';
	import {
		RESEARCH_USE_AGREEMENT_TEXT,
		RESEARCH_USE_AGREEMENT_VERSION,
		RESEARCH_USE_RESTRICTIONS_TEXT
	} from '$lib/ruo';

	const STORAGE_KEY = 'bta_ruo_site_ack_v1';

	let showAcknowledgement = false;
	let acknowledged = false;

	onMount(() => {
		try {
			const raw = window.localStorage.getItem(STORAGE_KEY);
			if (!raw) {
				showAcknowledgement = true;
				return;
			}

			const stored = JSON.parse(raw);
			showAcknowledgement =
				stored?.version !== RESEARCH_USE_AGREEMENT_VERSION ||
				typeof stored?.acceptedAt !== 'string';
		} catch {
			showAcknowledgement = true;
		}
	});

	function acceptAcknowledgement() {
		if (!acknowledged) return;

		try {
			window.localStorage.setItem(
				STORAGE_KEY,
				JSON.stringify({
					version: RESEARCH_USE_AGREEMENT_VERSION,
					acceptedAt: new Date().toISOString()
				})
			);
		} catch {
			// Continue without persistence if storage is unavailable.
		}
		showAcknowledgement = false;
	}
</script>

{#if showAcknowledgement}
	<div class="overlay" role="presentation">
		<div class="dialog" role="dialog" aria-modal="true" aria-labelledby="ruo_acknowledgement_title">
			<h2 id="ruo_acknowledgement_title">Research Use Only</h2>
			<p>{RESEARCH_USE_RESTRICTIONS_TEXT}</p>
			<label class="acknowledgement">
				<input type="checkbox" bind:checked={acknowledged} />
				<span>{RESEARCH_USE_AGREEMENT_TEXT}</span>
			</label>
			<button type="button" disabled={!acknowledged} on:click={acceptAcknowledgement}>
				I understand and agree
			</button>
		</div>
	</div>
{/if}

<style>
	.overlay {
		position: fixed;
		inset: 0;
		z-index: 1000;
		display: grid;
		place-items: center;
		padding: 1rem;
		background-color: rgba(0, 0, 0, 0.62);
	}
	.dialog {
		width: min(100%, 34rem);
		background-color: var(--accent-900);
		color: var(--text_color);
		border: 1px solid var(--accent-500);
		border-radius: 8px;
		box-shadow: 0 1.25rem 3rem rgba(0, 0, 0, 0.28);
		padding: 1.5rem;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	h2 {
		margin: 0;
		font-size: 1.35rem;
		font-weight: 600;
	}
	p {
		margin: 0;
	}
	.acknowledgement {
		display: flex;
		align-items: flex-start;
		gap: 0.65rem;
		line-height: 1.4;
	}
	.acknowledgement input {
		flex: 0 0 auto;
		width: 1.1rem;
		height: 1.1rem;
		margin-top: 0.15em;
		accent-color: var(--accent-200);
	}
	button {
		align-self: flex-start;
		padding: 0.75em 1em;
		background-color: var(--accent-200);
		color: var(--accent-900);
		border: none;
		border-radius: 6px;
		font-weight: 600;
		cursor: pointer;
	}
	button:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}
</style>
