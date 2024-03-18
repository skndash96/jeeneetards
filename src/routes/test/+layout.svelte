<script>
	import '../../lib/main.css';
    import TopScroll from '$lib/topScroll.svelte';
	import Header from '$lib/header.svelte';
</script>

<div>
    <TopScroll to_id="start" />
    <div id="wrapper">
        <Header />
        <slot />
    </div>
</div>

<style>
    #wrapper {
        height: 100vh;
        height: 100dvh;
        width: 100vw;
        display: flex;
        flex-direction: column;
    }
</style>