<script>
	import Header from "$lib/header.svelte";
    import { page } from '$app/stores';
    import "$lib/main.css";

    let title = $page.url.searchParams.get("title");
</script>

<div id="wrapper">
    <Header {title}/>
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