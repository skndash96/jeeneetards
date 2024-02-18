<script>
	import "../lib/main.css";
    
    import TopScroll from "$lib/topScroll.svelte";
    import Header from '$lib/header.svelte';
    import Footer from '$lib/footer.svelte';
</script>

<div class="container">
    <TopScroll />
	<Header/>

    <div class="content">
        <div class="top">
            <div class="icon">
                <img width="50px" height="50px" alt="icon" src="https://styles.redditmedia.com/t5_311ttu/styles/communityIcon_j5nctdyq50rb1.jpg?width=256&format=pjpg&s=d3c60085835254bbf6bef6c16c79fe4848081df6" />
            </div>
            <h2> <a href="/"> r/JEENEETards </a> </h2>
        </div>

        <div id="start"></div>
        <slot />

        <Footer />
    </div>
</div>

<style>
    div.container {
        height: 100vh;
        display: flex;
        flex-direction: row;
        width: 100vw;
    }
    
    div.content {
        overflow-y: scroll;
        position: relative;
        flex-grow: 1;
    }

    @media screen and (min-width: 776px) {
        div.content::after {
            content: none;
        }
    }
    
    div.top {
        padding: .2rem 1rem;
        backdrop-filter: blur(4px);
        width: 100%;
        display: flex;
        align-items: center;
        position: sticky;
        top: 0;
        left: 0;
        right: 0;
        z-index: 99;
        backdrop-filter: blur(4px) invert(10%);
    }
    div.top div.icon {
        margin-right: 1rem;
        display: inline-block;
    }
    div.top div.icon img {
        width: 2.5rem;
        height: 2.5rem;
        height: none;
        border-radius: 100%;
    }
    
    </style>