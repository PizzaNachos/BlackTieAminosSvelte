<script lang="ts">
	import CartDrawer from '$lib/cart/CartDrawer.svelte';
	import { fly } from 'svelte/transition';
	import { beforeNavigate } from '$app/navigation';
	import { browser } from '$app/environment';
	import Bear from '$lib/icons/Bear.svelte';
	import { multi_order_object } from '$lib/stores/multi_order';
	import Logo from '$lib/icons/Logo.svelte';

	export let announcement;
	export let force_visible = false;
	export let route_to: null | string = null;

	beforeNavigate(() => {
		links_shown = false;
	});
	let links_shown = false;

	let scrolled = false;
	let checkpoint = 100;
	let transitionable = true;
	if (browser) {
		function check_scroll() {
			const currentScroll = window.scrollY;
			if (currentScroll <= checkpoint) {
				scrolled = false;
			} else {
				scrolled = true;
				transitionable = false;
			}

			if (currentScroll < checkpoint * 2) {
				transitionable = true;
			}
		}
		check_scroll();
		document.addEventListener('scroll', check_scroll);
	}
</script>

<div
	class={scrolled || force_visible ? 'nav' : 'transparent nav'}
	class:transitionable
	class:force_visible
>
	{#if announcement}
		{#if route_to != null}
			<div class={scrolled || force_visible ? 'announcement' : 'transparent announcement'}>
				<a class="trackable" id="topnav_href_{route_to}" href={route_to}>{announcement}</a>
			</div>
		{:else}
			<div class={scrolled || force_visible ? 'announcement' : 'transparent announcement'}>
				{announcement}
			</div>
		{/if}
	{/if}

	<header>
		<button
			id="links_toggle"
			on:click={() => {
				links_shown = !links_shown;
			}}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="1em"
				height="1em"
				class="bi bi-list"
				viewBox="0 0 16 16"
			>
				<path
					fill-rule="evenodd"
					d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
				/>
			</svg>
		</button>
		<div id="links_wrapper_desktop">
			<div id="links">
				<a data-sveltekit-preload-code="eager" class="link trackable" id="home_navbar" href="/"
					>Home</a
				>
				<a
					data-sveltekit-preload-code="eager"
					class="link trackable"
					id="products_navbar"
					href="/products/">Products</a
				>
				<!-- <a data-sveltekit-preload-code="eager" class="link trackable" id="FAQ_navbar" href="/FAQ"
					>FAQ</a
				> -->
				<a
					data-sveltekit-preload-code="eager"
					class="link trackable"
					id="About-us_navbar"
					href="/blog/post/about_us">About-us</a
				>
				<!-- <a
					data-sveltekit-preload-code="eager"
					class="link trackable"
					id="Gifts_navbar"
					href="/gifts">Gifts</a
				> -->
				<!-- <a data-sveltekit-preload-code="eager" class="link trackable" id="multi_order_navbar" href="/multi_order">
          <div class="multi_cart_icon_wrapper">
            <svg id="cart_icon" xmlns="http://www.w3.org/2000/svg" width="1.2rem" height="1.2rem" class="trackable cart_icon cart_one" viewBox="0 0 16 16">
              <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
            </svg>
            <svg id="cart_icon" xmlns="http://www.w3.org/2000/svg" width="1.2rem" height="1.2rem" class="trackable cart_icon cart_two" viewBox="0 0 16 16">
              <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
            </svg>
            <svg id="cart_icon" xmlns="http://www.w3.org/2000/svg" width="1.2rem" height="1.2rem" class="trackable cart_icon cart_three" viewBox="0 0 16 16">
              <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
            </svg>
            {#if $multi_order_object.orders.map(o => o.products).flat().map(o => o.amount).reduce((a,b) => a + b, 0) > 0 }
            <span class="cart_icon cart_four">
              {$multi_order_object.orders.map(o => o.products).flat().map(o => o.amount).reduce((a,b) => a + b)}
            </span>
            {/if}
          </div>
          Multi Order
        </a> -->
			</div>
		</div>
		{#if links_shown}
			<div
				transition:fly|global={{
					delay: 0,
					duration: 300,
					x: -window.innerWidth,
					y: 0,
					opacity: 0.5
				}}
				id="links_wrapper"
			>
				<button
					class="trackable"
					id="links_toggle"
					on:click={() => {
						links_shown = !links_shown;
					}}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="1em"
						height="1em"
						class="icon"
						viewBox="0 0 16 16"
					>
						<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
						<path
							d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
						/>
					</svg>
				</button>
				<div id="links">
					<a
						data-sveltekit-preload-code="eager"
						on:click={() => (links_shown = false)}
						class="link trackable"
						id="home_navbar"
						href="/">Home</a
					>
					<a
						data-sveltekit-preload-code="eager"
						on:click={() => (links_shown = false)}
						class="link trackable"
						id="products_navbar"
						href="/products/">Products</a
					>
					<!-- <a
						data-sveltekit-preload-code="eager"
						on:click={() => (links_shown = false)}
						class="link trackable"
						id="FAQ_navbar"
						href="/FAQ">FAQ</a
					> -->
					<a
						data-sveltekit-preload-code="eager"
						on:click={() => (links_shown = false)}
						class="link trackable"
						id="About-us_navbar"
						href="/blog/post/about_us">About-us</a
					>
					<!-- <a
						data-sveltekit-preload-code="eager"
						class="link trackable"
						id="Gifts_navbar"
						href="/gifts">Gifts</a
					>
					<a
						data-sveltekit-preload-code="eager"
						on:click={() => (links_shown = false)}
						class="link trackable"
						id="multi_order_navbar"
						href="/multi_order"
					>
						<div class="multi_cart_icon_wrapper">
							<svg
								id="cart_icon"
								xmlns="http://www.w3.org/2000/svg"
								width="1.2rem"
								height="1.2rem"
								class="trackable cart_icon cart_one"
								viewBox="0 0 16 16"
							>
								<path
									d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"
								/>
							</svg>
							<svg
								id="cart_icon"
								xmlns="http://www.w3.org/2000/svg"
								width="1.2rem"
								height="1.2rem"
								class="trackable cart_icon cart_two"
								viewBox="0 0 16 16"
							>
								<path
									d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
								/>
							</svg>
							<svg
								id="cart_icon"
								xmlns="http://www.w3.org/2000/svg"
								width="1.2rem"
								height="1.2rem"
								class="trackable cart_icon cart_three"
								viewBox="0 0 16 16"
							>
								<path
									d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
								/>
							</svg>
							{#if $multi_order_object.orders
								.map((o) => o.products)
								.flat()
								.map((o) => o.amount)
								.reduce((a, b) => a + b, 0) > 0}
								<span class="cart_icon cart_four">
									{$multi_order_object.orders
										.map((o) => o.products)
										.flat()
										.map((o) => o.amount)
										.reduce((a, b) => a + b)}
								</span>
							{/if}
						</div>
						Multi Order
					</a> -->
				</div>
			</div>
		{/if}

		<div id="top_logo_wrapper">
			<a href="/" class="trackable" id="top_logo">
				<Logo />
				Black Tie Aminos
			</a>
		</div>

		<div id="icons">
			<CartDrawer />
		</div>
	</header>
</div>

<style>
	#multi_order_navbar {
		text-decoration: none;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		transition: all 0.3s ease;
		/* word-break: keep-all; */
		text-align: center;
	}
	#multi_order_navbar:hover {
		transform: scale(1.1);
	}
	.multi_cart_icon_wrapper {
		position: relative;
		display: grid;
		grid-template-columns: 1em;
		grid-template-rows: 1em;
	}
	.multi_cart_icon_wrapper > .cart_icon {
		position: absolute;
		fill: var(--accent-200);
	}

	@media only screen and (max-width: 600px) {
		.multi_cart_icon_wrapper > .cart_one {
			bottom: 0.1em;
			left: 0;
		}
		.multi_cart_icon_wrapper > .cart_two {
			bottom: 0.25em;
			left: 0.2em;
		}
		.multi_cart_icon_wrapper > .cart_three {
			bottom: 0.4em;
			left: 0.45em;
		}
		.multi_cart_icon_wrapper > .cart_four {
			bottom: 0.8em;
			left: 0.8em;
			background-color: var(--accent-800);
			border-radius: 100%;
			padding: 0 4px;
			z-index: 0;
		}
	}
	@media only screen and (min-width: 600px) {
		.multi_cart_icon_wrapper > .cart_one {
			bottom: 0.1em;
			left: 0;
		}
		.multi_cart_icon_wrapper > .cart_two {
			bottom: 0.3em;
			left: 0.2em;
		}
		.multi_cart_icon_wrapper > .cart_three {
			bottom: 0.5em;
			left: 0.35em;
		}
		.multi_cart_icon_wrapper > .cart_four {
			bottom: 0.8em;
			left: 0.8em;
			background-color: var(--accent-800);
			border-radius: 100%;
			padding: 0 4px;
			z-index: 0;
		}
	}

	@media only screen and (max-width: 600px) {
		#links_wrapper_desktop {
			display: none;
		}
		#links_toggle {
			background: none;
			cursor: pointer;
			font-size: 2rem;
			padding: 0.5rem;
			justify-self: start;
		}
		#links_wrapper {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;

			width: 90vw;
			padding: 1rem 5vw;

			background-color: var(--accent-color);
			z-index: 3;

			box-shadow: 0 0 10px black;
			fill: inherit;
		}
		#links {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			padding: 1rem 1rem;
		}
		#links .link {
			margin-bottom: 1rem;
			font-size: 1.4em;
		}
		#icons {
			display: flex;
			flex-direction: row;
			padding: 1rem 0.5em 0 0;
			justify-content: flex-end;
			align-items: flex-end;
			gap: 0.5em;
		}
		#icons * {
			/* margin: 0 .25rem 0 0; */
		}
		#top_logo {
			font-size: 1.25rem;
			max-height: 10vh;
			/* max-width: 33vw; */
		}
		header {
			display: grid;
			grid-template-columns: 1fr 3fr 1fr;
			gap: 15px;
			align-items: end;
			justify-items: center;
			padding: 0 0 5px 0;
		}
		.announcement {
			padding: 1ch;
			font-size: 0.9em;
		}
		#multi_order_navbar {
			display: flex;
			flex-direction: row;
			gap: 1em;
		}
	}

	@media only screen and (min-width: 600px) {
		#links_toggle {
			background: none;
			display: none;
		}
		#links {
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			align-items: flex-end;
			padding: 1rem 0;
		}
		#links .link {
			padding: 0.5rem 0.5rem;
			font-size: 1em;
		}
		#icons * {
			margin: 0 1rem 0 0;
		}
		#icons {
			display: flex;
			flex-direction: row;
			padding: 1rem 0;
			justify-content: space-evenly;
			align-items: flex-end;
		}
		#top_logo {
			font-size: 1.5rem;
			max-height: 10vh;
		}
		header {
			display: grid;
			grid-template-columns: 2fr 1fr 2fr;
			gap: 30px;
			align-items: end;
			justify-items: center;

			padding: 10px 0 10px 0;
		}
		.announcement {
			padding: 2ch;
			font-size: 1em;
		}
	}

	@media only screen and (min-width: 850px) {
		#links .link {
			padding: 0.5rem 0.5rem;
			font-size: 1.4em;
		}
		.announcement {
			padding: 0.5rem;
			font-size: larger;
		}
	}

	#user_icon {
		font-size: 2.25rem;
	}

	.nav {
		background-color: var(--accent-700);
		color: var(--accent-100);
		fill: var(--accent-100);
		box-shadow: 0 0 10px black;
	}
	.transparent.nav {
		background-color: rgba(0, 0, 0, 0);
		color: var(--accent-900);
		fill: var(--accent-900);
		opacity: 0;
	}
	.transitionable {
		transition: all 0.5s ease;
	}

	#links .link {
		border-radius: 0;
		border: 2px solid rgba(0, 0, 0, 0);
		text-overflow: clip;
		text-decoration: none;
		transition: all 0.5s ease;
		word-break: keep-all;
	}

	#links .link:hover {
		background-color: var(--accent-700);
		border: 2px solid var(--accent-200);
		border-radius: 10px;
	}
	.transparent #links .link:hover {
		background-color: var(--accent-300);
		border: 2px solid var(--accent-700);
		border-radius: 10px;
	}

	.announcement {
		position: sticky;
		top: 0;
		background-color: var(--accent-200);
		color: white;
		text-align: center;
	}
	.transparent.announcement {
		position: sticky;
		top: 0;
		background-color: rgba(0, 0, 0, 0);
		color: white;
		text-align: center;
	}

	.transparent #top_logo {
		fill: var(--accent-700);
	}
	#top_logo {
		fill: var(--accent-200);
	}
	#top_logo {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-decoration: none;
		font-weight: 700;
		width: 20ch;
	}

	.nav {
		position: fixed;
		z-index: 5;
		width: 100%;
	}
	.force_visible.nav {
		position: sticky;
		transition: all 0.5s ease;
		top: 0;
	}
</style>
