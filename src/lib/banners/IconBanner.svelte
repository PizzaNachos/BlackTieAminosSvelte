<script lang="ts">
	import Flask from '$lib/icons/Flask.svelte';
	import Gift from '$lib/icons/Gift.svelte';
	import PanOnStove from '$lib/icons/PanOnStove.svelte';
	import PersonHeart from '$lib/icons/PersonHeart.svelte';

	export let one_row = false;
</script>

<div class:one_row class="icons_banner">
	<div class="icon_container">
		<div>
			<Flask />
			Research Use Only
		</div>
	</div>

	<div class="icon_container">
		<div>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="3em" height="auto"
				><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path
					d="M353.8 118.1L330.2 70.3C326.3 62 314.1 61.7 309.8 70.3L286.2 118.1L233.9 125.6C224.6 127 220.6 138.5 227.5 145.4L265.5 182.4L256.5 234.5C255.1 243.8 264.7 251 273.3 246.7L320.2 221.9L366.8 246.3C375.4 250.6 385.1 243.4 383.6 234.1L374.6 182L412.6 145.4C419.4 138.6 415.5 127.1 406.2 125.6L353.9 118.1zM288 320C261.5 320 240 341.5 240 368L240 528C240 554.5 261.5 576 288 576L352 576C378.5 576 400 554.5 400 528L400 368C400 341.5 378.5 320 352 320L288 320zM80 384C53.5 384 32 405.5 32 432L32 528C32 554.5 53.5 576 80 576L144 576C170.5 576 192 554.5 192 528L192 432C192 405.5 170.5 384 144 384L80 384zM448 496L448 528C448 554.5 469.5 576 496 576L560 576C586.5 576 608 554.5 608 528L608 496C608 469.5 586.5 448 560 448L496 448C469.5 448 448 469.5 448 496z"
				/></svg
			>
			High Quality
		</div>
	</div>
	<div class="icon_container">
		<div>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="3em" height="auto"
				><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path
					d="M64 160C64 124.7 92.7 96 128 96L416 96C451.3 96 480 124.7 480 160L480 192L530.7 192C547.7 192 564 198.7 576 210.7L621.3 256C633.3 268 640 284.3 640 301.3L640 448C640 483.3 611.3 512 576 512L572.7 512C562.3 548.9 528.3 576 488 576C447.7 576 413.8 548.9 403.3 512L300.7 512C290.3 548.9 256.3 576 216 576C175.7 576 141.8 548.9 131.3 512L128 512C92.7 512 64 483.3 64 448L64 400L24 400C10.7 400 0 389.3 0 376C0 362.7 10.7 352 24 352L136 352C149.3 352 160 341.3 160 328C160 314.7 149.3 304 136 304L24 304C10.7 304 0 293.3 0 280C0 266.7 10.7 256 24 256L200 256C213.3 256 224 245.3 224 232C224 218.7 213.3 208 200 208L24 208C10.7 208 0 197.3 0 184C0 170.7 10.7 160 24 160L64 160zM576 352L576 301.3L530.7 256L480 256L480 352L576 352zM256 488C256 465.9 238.1 448 216 448C193.9 448 176 465.9 176 488C176 510.1 193.9 528 216 528C238.1 528 256 510.1 256 488zM488 528C510.1 528 528 510.1 528 488C528 465.9 510.1 448 488 448C465.9 448 448 465.9 448 488C448 510.1 465.9 528 488 528z"
				/></svg
			> Free US Shipping
		</div>
	</div>
	<div class="icon_container">
		<div class="trackable" id="hand_made_icon">
			<img src="/usa.JPG" alt="flag of usa" />
			U.S.A. Business
		</div>
	</div>
</div>

<style>
	@media (max-width: 40em) {
		.icons_banner {
			grid-template-columns: 1fr 1fr;
			grid-template-rows: 1fr 1fr;
			gap: 2em;
			padding: 0.5em 10%;
		}
		.icons_banner.one_row {
			grid-template-columns: 1fr 1fr 1fr 1fr;
			grid-template-rows: 1fr;
			gap: 2em;
			padding: 1em;
		}
	}
	@media (min-width: 40em) {
		.icons_banner {
			grid-template-columns: 1fr 1fr 1fr 1fr;
			gap: 5em;
			padding: 0.5em 10%;
		}
	}
	.icons_banner {
		background-color: inherit;
		display: grid;
		justify-content: space-evenly;
		align-items: end;
		fill: var(--accent-100);
		text-align: center;
	}

	.icons_banner img {
		width: 4em;
		height: auto;
		filter: saturate(0.5);
	}

	.icon_container {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
	}
	.icon_container > a {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		font-size: 1.4em;

		cursor: pointer;
		border: 2px solid rgba(0, 0, 0, 0);
		transition: all 0.5s ease;
		padding: 0.5em;
	}
	.icon_container > div {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		font-size: 1.4em;

		border: 2px solid rgba(0, 0, 0, 0);
		transition: all 0.5s ease;
		padding: 0.5em;
	}
	.icon_container > a:hover {
		background-color: var(--accent-600);
		border-radius: 5px;
		border: 2px solid var(--accent-100);
	}

	/* .hovertext {
        position: relative;
    }
    .hovertext:before {
        content: attr(data-hover);
        visibility: hidden;
        opacity: 0;
        width: 140px;
        background-color: var(--accent-200);
        color: #fff;
        text-align: center;
        border-radius: 5px;
        padding: .5em;
        transition: opacity .5s ease;

        position: absolute;
        z-index: 1;
        left: 0;
        top: 50%;
    }

    .hovertext:hover:before {
        opacity: 1;
        visibility: visible;
    } */
</style>
