<script lang="ts">
	import { blur } from 'svelte/transition';
	import '../../app.css';
	import Footer from '$lib/banners/footer/Footer.svelte';
	import HeaderScroll from '$lib/banners/header/Header_scroll.svelte';
	import RuoAcknowledgement from '$lib/RuoAcknowledgement.svelte';
</script>

<HeaderScroll announcement="Free US Shipping!" force_visible={true} />
<RuoAcknowledgement />

<main in:blur|global={{ delay: 100 }}>
	<slot />
</main>

<Footer />

<style>
	main {
		margin: auto;
	}
</style>
