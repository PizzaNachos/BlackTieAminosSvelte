<script lang="ts">
	import '../../app.css';
	import HeaderScroll from '$lib/banners/header/Header_scroll.svelte';
	import Footer from '$lib/banners/footer/Footer.svelte';
	import { afterNavigate } from '$app/navigation';
	export const prerender = true;
</script>

<HeaderScroll announcement="Free US Shipping!" />
<main>
	<slot />
</main>

<Footer />

<style>
	main {
		margin: auto;
	}
</style>
