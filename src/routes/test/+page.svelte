<script>
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	let metaId = $page.url.searchParams.get('metaId');
	let title = $page.url.searchParams.get('title');

	let currentSub = 0;

	/**
	 * @type {{ [x: string]: { [x: string]: any; }; }}
	 */
	let subjects, state;

	onMount(async () => {
		let response = await fetch(`/pyqs/${metaId}.json`);
		subjects = await response.json();

		state = subjects.map((sub) => new Array(sub.questions.length).fill(null));
	});

	function answerState(subIdx, qIdx, target) {
		target.classList.remove('selected');

		let elems = document.querySelectorAll(`button[name="${target.name}"]`);

		elems.forEach((el) => {
			el.classList.remove('selected');
		});

		if (state[subIdx][qIdx] === target.value) {
			state[subIdx][qIdx] = null;
		} else {
			state[subIdx][qIdx] = target.value;
			target.value !== '' && target.classList.add('selected');
		}
	}

	function finish() {
		window.confirm("Confirm Finish Test?");
	}
</script>

<svelte:head>
	<script>
		MathJax = {
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
			}
		};
	</script>

	<script src="https://polyfill.io/v3/polyfill.min.js?features=es6"></script>
	<script
		id="MathJax-script"
		async
		src="https://cdn.jsdelivr.net/npm/mathjax@3.0.1/es5/tex-mml-chtml.js?config=TeX-AMS-MML_HTMLorMML&delayStartupUntil=configured"
	></script>
</svelte:head>

<div class="container">
	{#if subjects === undefined}
		...Loading
	{:else}
		<h3>
			{title}
		</h3>

		<div class="menu">
			<div class="stat">
				{#each state as sub}
					<div class="substat">
						{#each sub as q, q_idx}
							<div class="qstat" class:tick={q !== null && q !== ""}> {q_idx+1} </div>
						{/each}
					</div>
				{/each}
			</div>

			{#each subjects as sub, idx}
				<button
					class="classic"
					class:active={currentSub === idx}
					on:click={() => (currentSub = idx)}
				>
					{sub.title}
				</button>
			{/each}
			
			<button class="classic finish" on:click={finish}> FINISH </button>
		</div>

		<hr />

		{#each subjects as sub, subIdx}
			<div id={sub.title} class="qlist" class:hidden={currentSub !== subIdx}>
				{#each sub.questions as { question, type, question_id }, qIdx}
					<div class="qTile">
						<strong class="qno">Question {qIdx + 1}</strong>
						<p>
							{@html question.content}
						</p>

						<div class="options">
							{#if type == 'integer'}
								<input
									style="colspan: 2;"
									type="integer"
									placeholder="Answer here"
									on:change={({ target }) => answerState(subIdx, qIdx, target)}
								/>
							{:else}
								{#each question.options as opt}
									<button
										name={question_id}
										value={opt.identifier}
										on:click={({ target }) => answerState(subIdx, qIdx, target)}
									>
										<span>{opt.identifier}</span>
										{@html opt.content}
									</button>
								{/each}
							{/if}
						</div>
					</div>
				{/each}
			</div>
		{/each}
	{/if}

	<!-- <script>
		MathJax.Hub.Configured();
	</script> -->
</div>

<style>
	div.container {
		padding: 2rem;
		min-height: 100vh;
	}

	div.menu {
		display: grid;
		grid-template-columns: 3;
		grid-template-rows: 2;
		gap: 1rem;
		margin-top: 2rem;
		max-width: var(--md);
		margin-right: auto;
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
		column-span: 3;
		grid-column-start: 1;
		grid-column-end: 4;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}
	div.substat {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: .2rem;
	}
	div.qstat {
		width: 2rem;
		height: 2rem;
		background: grey;
		color: white;
		text-align: center;
	}
	div.menu div.qstat.tick {
		background: green;
	}

	div.menu button.finish {
		background: white;
		color: var(--pri);
		border: 2px solid var(--txt);
		font-weight: bold;
		column-span: 2;
		grid-column-start: 2;
		grid-column-end: 3;
	}

	hr {
		margin: 1rem 0 2rem 0;
		max-width: var(--md);
		border-color: var(--txt);
	}
	div.qTile {
		margin-top: 1rem;
		padding: 1rem;
	}
	div.qTile .qno {
		font-size: 1.25rem;
	}
	div.options {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 1fr 1fr;
		place-items: center;
	}
	div.options button {
		border: 2px solid var(--elevate);
		justify-self: stretch;
		align-self: stretch;
		margin: 0.5rem;
		padding: 0.5rem;
		color: var(--txt);
		position: relative;
	}
	div.options button::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}
	div.options button:hover,
	div.options input {
		background: var(--elevate);
	}

	div.options input {
		width: 100%;
		margin-top: 1rem;
		padding: 0.5rem;
		color: var(--txt);
	}

	div.options :global(button.selected),
	div.options :global(input.selected) {
		border: 2px solid var(--ter);
	}

	div.qlist.hidden {
		max-height: 0;
		overflow: hidden;
		/* animation-name: slidein;
		animation-duration: 0.5s;
		animation-iteration-count: 1; */
	}

	@keyframes slidein {
		from {
			margin-top: 2rem;
		}

		to {
			margin-top: 0;
		}
	}
</style>
