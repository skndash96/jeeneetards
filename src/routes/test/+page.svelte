<script>
	// @ts-nocheck
	import QuestionTile from '$lib/questionTile.svelte';
	import { onMount } from 'svelte';

	export let data;
	let { metaId, title, test, lastResponse } = data;

	let loaded = false,
	menuOpen = false,
	currentSub = 0;

	onMount(async () => {
		window.MathJax = {
			tex: {
				inlineMath: [
					['$', '$'],
					['\\(', '\\)'],
					['$$', '$$']
				],
				displayMath: [['$$$', '$$$']]
			},
			svg: {
				fontCache: 'global'
			},
			startup: {
				typeset: false
			}
		};

		let script = document.createElement('script');
		script.src = "https://cdn.jsdelivr.net/npm/mathjax@3.0.1/es5/tex-mml-chtml.min.js?config=TeX-AMS-MML_HTMLorMML";
		script.async = true;

		document.head.append(script);

		script.addEventListener("load", async () => {
			let qs = Array.from(document.querySelectorAll("div.qTile"));

			try {
				await MathJax.typesetPromise(qs);

				loaded = true;
			} catch (e) {
				console.error("TYPESET Failed", e);
			}
		});

		return;
	});

	function finish() {
		test.finish();
	}
</script>

<svelte:head>
	<title>Test Interface</title>
	<meta name="title" content="Test Interface" />
</svelte:head>

<div class="container">
	{#if !metaId || !title}
		BROKEN URL. <a href="/pyqs">Go to PYQs</a>
	{:else}
		<div class="main">
			<div id="start"></div>
			
			{#if !loaded}
				<span style="font-size: 2rem;">...Loading</span>
			{/if}

			<h3 class="title">
				{title}
			</h3>

			<p id="score"></p>

			<div class="menu">
				{#each test.qList as sub}
					<button
						class="classic"
						class:active={currentSub === sub.si}
						on:click={() => (currentSub = sub.si)}
					>
						{sub.title}
					</button>
				{/each}

				{#if !test.is_practice}
					<button class="classic finishTest" on:click={finish}> FINISH </button>
				{/if}
			</div>

			{#each test.qList as sub}
				<div id={sub.title} class="qlist" class:visible={currentSub === sub.si}>
					{#each sub.questions as q}
						<QuestionTile
							{q}
							bind:test={test}
						/>
					{/each}
				</div>
			{/each}
		</div>

		{#if !test.is_practice}
			<div class="stat" class:open={menuOpen}>
				<button class="palette" on:click={() => (menuOpen = !menuOpen)}>
					{#if menuOpen}
						<strong style="display: inline-block; transform: rotate(45deg);">+</strong>
					{:else}
						<span> >Palette </span>
					{/if}
				</button>

				<div id="palette" class="palette">
					{#each test.response_sheet as sub, si}
						<h3>{test.qList[si].title}</h3>
						<div class="substat">
							{#each sub as q, qi}
								<a
									style="pointer-events: initial;"
									href={'#' + (test.qList[si].questions[qi].question_id || '')}
									class="qstat"
									name={`${si}_${qi}`}
									on:click={() => {
										currentSub = si;
										menuOpen = false;
									}}
								>
									{qi + 1}
								</a>
							{/each}
						</div>
					{/each}
				</div>
			</div>
		{/if}
	{/if}
</div>

<style>
	:global(div#start h2.logo) {
		display: none;
	}

	div.main {
		padding: 2rem 1rem;
		padding-top: 0;
	}

	div.main > h3 {
		padding: 2rem;
		text-align: center;
	}

	p#score {
		font-size: 1.2rem;
		font-weight: 500;
		margin-bottom: 1rem;
		width: fit-content;
		margin: auto;
		background: var(--highlight);
	}

	div.menu {
		display: flex;
		gap: 1rem;
		margin-top: 2rem;
		flex-wrap: wrap;
		margin: auto;
		width: fit-content;
	}
	div.menu button {
		padding: 0.5rem 1rem;
		background: var(--sec);
		color: white;
		font-weight: 500;
		letter-spacing: 0.1rem;
	}
	div.menu button.active {
		background: var(--pri);
		transform: scale(0.95);
	}

	div.stat {
		position: fixed;
		width: 100vw;
		top: 0;
		left: 0;
		bottom: 0;
		z-index: 1000;
		transform: translateX(100%);
		background-color: #000000aa;
		transition: all ease-out 100ms;
	}
	div.stat.open {
		pointer-events: initial;
		transform: translateX(0);
	}
	div.palette {
		width: 75vw;
		max-width: 32rem;
		margin-left: auto;
		padding: 2rem .5rem 2rem 1rem;
		color: white;
		box-shadow: inset 0px 2px 10px rgba(0, 0, 0, 5);
		max-height: 80vh;
		overflow-y: scroll;
		pointer-events: initial;
		background: var(--pri);
	}

	button.palette {
		color: white;
		background: var(--pri);
		padding: 0.5rem;
		box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.3);
		font-weight: 600;
		position: absolute;
		top: 6rem;
		right: 0;
		margin-right: 105vw;
		pointer-events: initial;
		cursor: pointer;
	}
	div.stat.open button.palette {
		margin-right: min(80vw, 35rem);
		transform: scale(1.5);
	}

	div.substat {
		margin-bottom: 1rem;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 0.2rem;
	}
	a.qstat {
		display: block;
		width: 2rem;
		height: 2rem;
		background: var(--elevate);
		color: white;
		text-align: center;
	}
	:global(a.qstat.tick) {
		background: green !important;
	}

	div.menu button.finishTest {
		background: white;
		color: var(--pri);
		border: 2px solid var(--txt);
		font-weight: bold;
	}

	div.qlist {
		max-width: var(--md);
		margin: 0 auto;
		max-height: 0;
		overflow: hidden;
	}
	div.qlist.visible {
		max-height: unset;
		overflow: unset;
		animation-name: slidein;
		animation-duration: 0.5s;
		animation-iteration-count: 1;
	}

	/*996px*/
	@media (min-width: 996px) {
		div.container {
			position: relative;
			height: 100vh;
			height: 100dvh;
			display: flex;
			flex-direction: row;
			flex-direction: row;
		}

		div.main {
			flex-grow: 1;
			flex-shrink: 0;
			flex-basis: 70vw;
			height: 100%;
			overflow: scroll;
			scroll-behavior: smooth;
		}

		div.stat {
			flex-shrink: 1;
			flex-grow: 0;
			transform: unset;
			position: unset;
			width: unset;
			overflow-y: scroll;
			z-index: 1;
		}
		div.palette {
			max-width: unset;
			max-height: unset;
			width: unset;
			background: var(--elevate);
		}
	
		button.palette {
			display: none;
		}

		div.stat::-webkit-scrollbar, div.main::-webkit-scrollbar {
			background: rgba(100, 148, 237, 0.351);
			width: 10px;
			height: 10px;
		}

		div.stat::-webkit-scrollbar-thumb, div.main::-webkit-scrollbar-thumb {
			background: cornflowerblue;
		}

	}

	/*
	#wrapper
		header
		scrolltop
		.container
			.main
			.stat
				.palette
		footer
	*/

</style>
