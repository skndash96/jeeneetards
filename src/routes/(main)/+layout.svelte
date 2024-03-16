<script>    
	import '../../lib/main.css';

	import TopScroll from '$lib/topScroll.svelte';
	import Header from '$lib/header.svelte';
	import Footer from '$lib/footer.svelte';
</script>

<div id="wrapper">
	<TopScroll to_id="start" />

	<Header />

	<div id="start"></div>

	<slot />
    
	<Footer />
</div>

<style>
    div#start {
        padding-top: 7rem;
        width: fit-content;
        margin: 0 auto;
        margin-top: -7rem;
    }
</style>
