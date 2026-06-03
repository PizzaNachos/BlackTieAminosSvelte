<script lang="ts">
	export let width = 'auto';
	export let height = 'auto';
</script>

<img src="/logo.png" alt="Logo" style:width={width} style:height={height} />

<style>
	img {
		display: block;
		max-width: 100%;
		max-height: 100%;
		object-fit: contain;
	}
</style>
