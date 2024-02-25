<script>
	// @ts-nocheck
	import QuestionTile from '$lib/questionTile.svelte';
	import { onMount } from 'svelte';

	export let data;
	let { metaId, title, practice, subjects, response, lastResponse } = data;

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

		script.addEventListener("load", () => {
			let qs = Array.from(document.querySelectorAll("div.qTile"));

			MathJax.typesetPromise(qs.slice(0, 10))
			.then(() => {
				loaded = true;

				MathJax.typesetPromise(qs.slice(10))
					.catch(err => console.error(err));
			})
			.catch((err) => console.error(err));

		});

		return;
	});

	function appendIntAnswer(answer, el) {
		let newEl = document.createElement('span');
		newEl.classList.add('correct');
		newEl.textContent = 'Answer: ' + answer;

		el.parentElement.append(newEl);
	}

	function showAnswersInTestInPractice(subIdx, qIdx, target) {
		let elems = target.parentNode.querySelectorAll(`*[name="${target.name}"]`);

		let {
			type,
			question: { correct_options, answer }
		} = subjects[subIdx].questions[qIdx];

		elems.forEach((el) => {
			type === 'mcqm' ? el.classList.remove('wrong') : el.classList.remove('wrong', 'correct');
		});

		correct_options.includes(target.value) || target.value === answer
			? target.classList.add('correct')
			: target.classList.add('wrong');

		type === 'integer' && appendIntAnswer(answer, target);
	}

	function selectResponseInTest(subIdx, qIdx, target) {
		let elems = target.parentNode.querySelectorAll(`*[name="${target.name}"]`);

		let mcqm = subjects[subIdx].questions[qIdx].type === 'mcqm';

		let prevRes = response[subIdx][qIdx];

		elems.forEach((el) => {
			el.classList.remove('selected');
		});

		if (prevRes === target.value) {
			response[subIdx][qIdx] = null;
		} else if (mcqm) {
			prevRes = prevRes || new Set();

			prevRes.has(target.value) ? prevRes.delete(target.value) : prevRes.add(target.value);

			response[subIdx][qIdx] = prevRes;
			elems.forEach((el) => {
				prevRes.has(el.value) && el.classList.add('selected');
			});
		} else {
			response[subIdx][qIdx] = target.value;
			
			if (target.value !== "") target.classList.add('selected');
		}
	}

	function finishTest(e) {
		if (!window.confirm('Confirm FinishTest Test?')) return;

		e.target.disabled = true;

		let total = 0;
		let max = 0;

		response.forEach((sub, subIdx) => {
			sub.forEach((q, qIdx) => {
				let {
					type,
					marks,
					negMarks,
					question: { answer, correct_options }
				} = subjects[subIdx].questions[qIdx];

				max += marks;

				if (q === null || q === undefined) return;

				if (type === 'mcq') {
					total += correct_options.includes(q) ? marks : -1 * negMarks;
				} else if (type === 'mcqm') {
					q = Array.from(q);

					if (q.some((opt) => !correct_options.includes(opt))) {
						total -= negMarks;
					} else {
						total += correct_options.length === q.length ? 4 : q.length;
					}
				} else if (type === 'integer') {
					total += answer === q ? marks : -1 * negMarks;
				}
			});
		});

		showAnswersInTest(total, max);
	}

	function showAnswersInTest(total, max) {
		let subEls = document.querySelectorAll('div.qlist');

		document.querySelectorAll('div.qlist').forEach((el) => el.classList.add('result'));

		document
			.querySelectorAll('div.qlist button, div.qlist input')
			.forEach((el) => (el.disabled = true));

		subjects.forEach((sub, subIdx) => {
			let subEl = subEls[subIdx];

			sub.questions.forEach(({ type, question: { correct_options, answer } }, qIdx) => {
				let qEl = subEl.children[qIdx];
				qEl.classList.add("explain");
				
				let opts = qEl.querySelectorAll('div.options > *');

				if (!opts.length) return;

				opts.forEach((opt) => {
					let selected = opt.classList.contains('selected');

					if (correct_options.includes(opt.value) || opt.value === answer) {
						opt.classList.add('pcorrect');
						selected && opt.classList.add('correct');
					} else if (selected) {
						opt.classList.add('wrong');
					}
				});

				type === 'integer' && appendIntAnswer(answer, opts[0]);
			});
		});

		document.getElementById('score').textContent = `You scored ${total}/${max}`;
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
		{#if !loaded}
			...Loading
		{/if}

		<div class:visible={loaded}>
			<h3 class="title">
				{title}
			</h3>

			<p id="score"></p>

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

				{#if !practice}
					<button class="classic finishTest" on:click={finishTest}> FINISH </button>
				{/if}
			</div>

			{#each subjects as sub, subIdx}
				<div id={sub.title} class="qlist" class:visible={currentSub === subIdx}>
					{#each sub.questions as { question, type, question_id }, qIdx}
						<QuestionTile
							{question}
							{question_id}
							{type}
							{qIdx}
							{subIdx}
							respond={practice ? showAnswersInTestInPractice : selectResponseInTest}
							practice={practice}
						/>
					{/each}
				</div>
			{/each}
		</div>

		{#if !practice}
			<div class="stat" class:open={menuOpen}>
				<button class="palette" on:click={() => (menuOpen = !menuOpen)}>
					{#if menuOpen}
						<strong style="display: inline-block; transform: rotate(45deg);">+</strong>
					{:else}
						<span> >Palette </span>
					{/if}
				</button>

				<div class="palette">
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
		{/if}
	{/if}
</div>

<style>
	:global(div#start h2.logo) {
		display: none;
	}

	div.container {
		position: relative;
		overflow-x: scroll;
	}

	div.container > div:first-child {
		padding: 2rem 1rem;
		padding-top: 0;
		visibility: hidden;
	}
	div.container > div.visible:first-child {
		visibility: visible;
	}

	div.container h3.title {
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
		/* backdrop-filter: blur(4px); */
		pointer-events: initial;
		transform: translateX(0);
	}
	div.stat > div.palette {
		width: 75vw;
		max-width: 32rem;
		margin-left: auto;
		padding: 2rem .5rem 2rem 1rem;
		color: white;
		background: var(--pri);
		box-shadow: inset 0px 2px 10px rgba(0, 0, 0, 5);
		max-height: 80vh;
		overflow-y: scroll;
		pointer-events: initial;
	}

	div.stat button.palette {
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
		background: grey;
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
</style>
