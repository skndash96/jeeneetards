<script>
	import Header from "$lib/header.svelte";
    import "$lib/main.css"
</script>

<div id="wrapper">
    <Header />
    <slot />
</div>

<style>
    #wrapper {
        height: 100vh;
        height: 100dvh;
        overflow: hidden;
        display: flex;
        flex-direction: column;
    }
</style>