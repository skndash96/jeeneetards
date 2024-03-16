<script>
	import '../../lib/main.css';
    import TopScroll from '$lib/topScroll.svelte';
</script>

<div>
    <TopScroll to_id="start" />
    <slot />
</div>