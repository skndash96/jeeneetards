<script>
	import { page } from '$app/stores';
	import QuestionTile from '$lib/questionTile.svelte';
	import { onMount } from 'svelte';

	let metaId = $page.url.searchParams.get('metaId');
	let title = $page.url.searchParams.get('title');

	let menuOpen = false;

	let currentSub = 0;

	let subjects = [],
		response = [];

	onMount(async () => {
		let result = await fetch(`/pyqs/${metaId}.json`);
		subjects = await result.json();

		response = subjects.map((/** @type {{ questions: string | any[]; }} */ sub) =>
			new Array(sub.questions.length).fill(null)
		);

		return;
	});

	/**
	 * @param {number} subIdx
	 * @param {number} qIdx
	 * @param {EventTarget} target
	 */

	function answerResponse(subIdx, qIdx, target) {
		let elems = document.querySelectorAll(`button[name="${target.name}"]`);
		let mcqm = subjects[subIdx].questions[qIdx].type === "mcqm";
		
		let prevRes = response[subIdx][qIdx];
		
		elems.forEach((el) => {
			el.classList.remove('selected');
		});

		if (prevRes === target.value) {
			response[subIdx][qIdx] = null;
		}
		
		else if (mcqm) {
			prevRes = prevRes || new Set();

			prevRes.has(target.value)
			? prevRes.delete(target.value)
			: prevRes.add(target.value);

			response[subIdx][qIdx] = prevRes;
			elems.forEach(el => {
				prevRes.has(el.value) && el.classList.add("selected")
			});
		}
		
		else {
			response[subIdx][qIdx] = target.value;
			target.value !== '' && target.classList.add('selected');
		}
	}

	function finish() {
		if (!window.confirm('Confirm Finish Test?')) return;

		let total = 0;
		let max = 0;

		response.forEach((sub, subIdx) => {
			sub.forEach((q, qIdx) => {
				let { type, marks, negMarks, question: { answer, correct_options } } = subjects[subIdx].questions[qIdx];

				max += marks;

				if (q === null || q === undefined) return;

				if (type === 'mcq') {
					total += correct_options.includes(q) ? marks : -1 * negMarks;
				}
				
				else if (type === "mcqm") {
					q = Array.from(q);

					if (q.some(opt => !correct_options.includes(q))) {
						total -= negMarks;
					} else {
						total += correct_options.length === 4
						? q.length
						: correct_options.length === 3
						? (q.length === 3 ? 4 : q.length)
						: correct_options.length === 2
						? (q.length === 2 ? 4 : q.length)
						: q.length !== 0
						? 4
						: 0;
					}
				}
				
				else if (type === 'integer') {
					total += answer === q ? marks : -1 * negMarks;
				}
			});
		});

		showResult(total, max);
	}
	
	function showResult(total, max) {
		let subEls = document.querySelectorAll("div.qlist");
		
		document.querySelectorAll("div.qlist")
		.forEach(el => el.classList.add("result"));
		
		document.querySelectorAll("div.qlist button, div.qlist input").forEach(el => (el.disabled = true));

		subjects.forEach((sub, subIdx) => {
			let subEl = subEls[subIdx];
			
			sub.questions.forEach(({ type, question: {correct_options, answer} }, qIdx) => {
				let qEl = subEl.children[qIdx];
				let opts = qEl.querySelectorAll(".selected");
				
				if (!opts.length) return;
					
				if (type === "mcq") {
					opts[0].value === correct_options[0]
					? opts[0].classList.add("correct")
					: opts[0].classList.add("wrong");
				}
				
				else if (type === "mcqm") {
					opts.forEach(opt => {
						console.log(subIdx, qIdx, opt.value, correct_options);

						correct_options.includes(opt.value)
						? opt.classList.add("correct")
						: opt.classList.add("wrong");
					});
				}
				
				else if (type === "integer") {
					opts[0].value === answer
					? opts[0].classList.add("correct")
					: opts[0].classList.add("wrong");
				}
			});
		});
		
		alert(`You scored ${total}/${max}. Proceed to check the answers.`);
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
	{#if typeof subjects !== 'object'}
		...Loading
	{:else}
		<div>
			<h3>
				{title}
			</h3>
			<div class="menu">
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

			{#each subjects as sub, subIdx}
				<div id={sub.title} class="qlist" class:hidden={currentSub !== subIdx}>
					{#each sub.questions as { question, type, question_id }, qIdx}
						<QuestionTile {question} {question_id} {type} {qIdx} {subIdx} {answerResponse} } />
					{/each}
				</div>
			{/each}
		</div>

		<div class="stat" class:open={menuOpen}>
			<div>
				<button class="palette" on:click={() => (menuOpen = !menuOpen)}>
					{#if menuOpen}
						Close
					{:else}
						Open
					{/if}
				</button>

				<div>
					{#each response as sub, subIdx}
						<h3>{subjects[subIdx].title}</h3>
						<div class="substat">
							{#each sub as q, qIdx}
								<a
									style="pointer-events: initial;"
									href={'#' + (subjects[subIdx].questions[qIdx].question_id || '')}
									class="qstat"
									class:tick={q !== null && q !== ''}
									on:click={() => {
										currentSub = subIdx;
										menuOpen = false;
									}}
								>
									{qIdx + 1}
								</a>
							{/each}
						</div>
					{/each}
				</div>
			</div>
		</div>
	{/if}

	<!-- <script>
		MathJax.Hub.Configured();
	</script> -->
</div>

<style>
	:global(ul.menu a span) {
		display: none !important;
	}

	div.container {
		position: relative;
	}
	div.menu {
		display: flex;
		gap: 1rem;
		margin-top: 2rem;
		flex-wrap: wrap;
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

	div.container div:first-child {
		padding: 2rem 1rem;
	}
	div.stat {
		position: absolute;
		right: 0;
		top: 0;
		left: 0;
		bottom: 0;
		pointer-events: none;
	}
	div.stat > div {
		margin-left: auto;
		color: white;
		width: 60vw;
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		transform: translateX(100%);
		transition: all ease-out 100ms;
		background: var(--pri);
		padding: 2rem;
	}
	div.stat.open {
		backdrop-filter: blur(4px);
	}
	div.stat.open > div {
		transform: translateX(0);
	}

	div.stat button.palette {
		color: white;
		font-weight: 600;
		background: var(--pri);
		padding: 0.5rem;
		margin-left: -5rem;
		box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.3);
		pointer-events: initial;
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
		background: grey;
		color: white;
		text-align: center;
	}
	:global(a.qstat.tick) {
		background: green !important;
	}

	div.menu button.finish {
		background: white;
		color: var(--pri);
		border: 2px solid var(--txt);
		font-weight: bold;
	}

	div.qlist {
		max-width: var(--md);
		margin: 0 auto;
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
