<script>
	import Header from "$lib/header.svelte";
    import "$lib/main.css"
	import TopScroll from "$lib/topScroll.svelte";
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
    @media (min-width: 996px) {
        :global(#topscroll) {
            right: 30vw !important;
        }
    }
</style>