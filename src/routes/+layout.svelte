<script>    
	import '../lib/main.css';

	import TopScroll from '$lib/topScroll.svelte';
	import Header from '$lib/header.svelte';
	import Footer from '$lib/footer.svelte';
</script>

<div class="container">
	<TopScroll />

	<Header />

	<div id="start"></div>

	<slot />
    
	<Footer />
</div>

<style>
    :global(div.container > div.container) {
        padding-top: 2rem;
        /* animation: slidein 100ms 1; */
    }

    div#start {
        padding-top: 7rem;
        width: fit-content;
        margin: 0 auto;
        margin-top: -7rem;
    }
</style>
