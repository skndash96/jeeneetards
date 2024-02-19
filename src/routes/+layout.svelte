<script>    
	import '../lib/main.css';

	import TopScroll from '$lib/topScroll.svelte';
	import Header from '$lib/header.svelte';
	import Footer from '$lib/footer.svelte';
</script>

<div class="container">
	<TopScroll />

	<Header />

	<div id="start">
        <h2 class="logo"> r/JEENEETards </h2>
    </div>

	<slot />
    
	<Footer />
</div>

<style>
    :global(div.container > div.container) {
        animation: slidein 100ms 1;
    }

    div#start {
        padding-top: 5rem;
        width: fit-content;
        margin: 0 auto;
        margin-top: -3rem;
    }

    @media (min-width: 728px) {
        div#start h2 {
            display: none;
        }
    }
</style>
