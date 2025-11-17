<script lang="ts">
	import logo from './ColoradoToffee_full.png';
	import CartDrawer from '$lib/cart/CartDrawer.svelte';
	import { blur, fly } from 'svelte/transition';
	import { cubicOut, cubicIn } from 'svelte/easing';
	import { beforeNavigate } from '$app/navigation';
	import { browser } from '$app/environment';
	import Bear from '$lib/icons/Bear.svelte';

	export let announcement;

	beforeNavigate(() => {
		links_shown = false;
	});
	let links_shown = false;
</script>

<div class="nav">
	{#if announcement}
		<div class="announcement">{announcement}</div>
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
					href="/#product_section">Products</a
				>
				<!-- <a data-sveltekit-preload-code="eager" class="link trackable" id="FAQ_navbar" href="/#faq">FAQ</a> -->
				<a
					data-sveltekit-preload-code="eager"
					class="link trackable"
					id="About-us_navbar"
					href="/blog/post/about_us">About-us</a
				>
			</div>
		</div>
		{#if links_shown}
			<div
				transition:blur|global={{ amount: 10, easing: cubicOut, duration: 100 }}
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
						href="/#product_section">Products</a
					>
					<a
						data-sveltekit-preload-code="eager"
						on:click={() => (links_shown = false)}
						class="link trackable"
						id="FAQ_navbar"
						href="/#faq">FAQ</a
					>
					<a
						data-sveltekit-preload-code="eager"
						on:click={() => (links_shown = false)}
						class="link trackable"
						id="About-us_navbar"
						href="/blog/post/about_us">About-us</a
					>
				</div>
			</div>
		{/if}

		<div id="top_logo_wrapper">
			<a href="/" class="trackable" id="top_logo">
				<Bear width="100%" />
				Colorado Toffee
			</a>
		</div>

		<div id="icons">
			<!-- <a class="link" href="/users/profile/">
        <svg class="trackable icon" id="user_icon" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="black" viewBox="0 0 16 16">
          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
        </svg>
      </a> -->
			<CartDrawer />
		</div>
	</header>
</div>

<style>
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
			padding: 1rem 1rem;
		}
		#links .link {
			margin-bottom: 1rem;
			font-size: 1.4em;
		}
		#icons {
			display: flex;
			flex-direction: row;
			padding: 1rem 0;
			justify-content: flex-end;
			align-items: flex-end;
		}
		#icons * {
			margin: 0 0.25rem 0 0;
		}
		#top_logo {
			font-size: 1.25rem;
			max-height: 10vh;
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
			padding: 0.25rem;
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
			font-size: 2rem;
			max-height: 13vh;
		}
		header {
			display: grid;
			grid-template-columns: 2fr 2fr 2fr;
			gap: 30px;
			align-items: end;
			justify-items: center;

			padding: 10px 0 10px 0;
		}
		.announcement {
			padding: 0.5rem;
		}
	}

	@media only screen and (min-width: 850px) {
		#links .link {
			padding: 0.5rem 0.5rem;
			font-size: 1.4em;
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

	#links .link {
		border-radius: 0;
		border: 2px solid rgba(0, 0, 0, 0);
		text-overflow: clip;
		transition: all 0.5s ease;
	}

	#links .link:hover {
		background-color: var(--accent-700);
		border: 2px solid var(--accent-200);
		border-radius: 10px;
	}

	.announcement {
		position: sticky;
		top: 0;
		background-color: var(--accent-200);
		color: white;
		text-align: center;
		font-size: larger;
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
	}

	.nav {
		position: sticky;
		z-index: 5;
		width: 100%;
		transition: all 0.5s ease;
		top: 0;
	}
</style>
