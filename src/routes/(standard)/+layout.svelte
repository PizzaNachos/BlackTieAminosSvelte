<script lang="ts">
	import { blur } from 'svelte/transition';
	import '../../app.css';
	import Footer from '$lib/banners/footer/Footer.svelte';
	import HeaderScroll from '$lib/banners/header/Header_scroll.svelte';
	// import {
	//   mount_socket,
	//   new_api_healthy,
	//   new_socket,
	// } from "$lib/stores/interactions";
	// import { afterNavigate } from "$app/navigation";

	// mount_socket();
	// afterNavigate((url) => {
	//   const interaction = {
	//     t: "navigate",
	//     d: {
	//       from: url?.from?.url?.pathname,
	//       to: url?.to?.url?.pathname,
	//     },
	//   };
	//   console.log("emitting", interaction);
	//   new_socket?.emit("interaction", interaction);
	// });
</script>

<HeaderScroll announcement="Free US Shipping!" force_visible={true} />

<main in:blur|global={{ delay: 100 }}>
	<slot />
</main>

<Footer />

<style>
	main {
		margin: auto;
	}
</style>
