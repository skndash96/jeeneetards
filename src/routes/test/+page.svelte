<script>
	import { onMount } from 'svelte';
	import './typedef';
	import TestStat from '$lib/testStat.svelte';
	import QuestionTile from '$lib/questionTile.svelte';

	export let data;

	let loaded = false,
		currentSub = 0,
		currentQ = 0,
		reveal_ans = false;

	let { metaId, title, practice, qList, csl } = data;

	const TOTAL_QS = csl[csl.length - 1];

	/**
	 * @type {ResponseSheet}
	 */
	let response_sheet = new Array(TOTAL_QS).fill(null);

	/**
	 * @type {boolean[]}
	 */
	let review = new Array(TOTAL_QS).fill(false);

	onMount(async () => {
		//@ts-ignore
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
		script.src =
			'https://cdn.jsdelivr.net/npm/mathjax@3.0.1/es5/tex-mml-chtml.min.js?config=TeX-AMS-MML_HTMLorMML';
		script.async = true;

		document.head.append(script);

		script.addEventListener('load', async () => {
			let qs = Array.from(document.querySelectorAll('div.qTile'));

			try {
				//@ts-ignore
				await window.MathJax.typesetPromise(qs);

				loaded = true;
			} catch (e) {
				console.error('TYPESET Failed', e);
			}
		});

		return;
	});

	/**
	 * @param {number} qi
	 */
	function set_qi(qi) {
		let si = csl.findIndex((l) => l > qi);

		if (si === -1) return;

		currentQ = qi;
		currentSub = si;
	}

	/**
	 * @param {number} qi
	 * @returns {Question}
	 */
	function get_q(qi) {
		let si = csl.findIndex((l) => l > qi);
		let new_qi = qi - (csl[si - 1] || 0);

		return qi >= 0 ? qList[si].questions[new_qi] : qList[si].questions[qi];
	}

	function next() {
		set_qi(currentQ + 1);
	}
	function previous() {
		set_qi(currentQ - 1);
	}

	function finish() {
		if (practice) return;

		if (window.confirm('Do you want to FINISH this test?')) {
			document
				.querySelectorAll('.qTile > input, .qTile > button')
				//@ts-ignore
				.forEach((el) => (el.disabled = true));

			let score = 0;
			let maxMarks = 0;

			for (let qi = 0; qi < response_sheet.length; qi++) {
				let { correct_options, answer, question_id, type, marks, negMarks } = get_q(qi);
				let val = response_sheet[qi];

				maxMarks += marks;

				if (!val?.length) continue;

				//Add to score
				if (type === 'mcqm') {
					score += val.every((o) => correct_options.includes(o))
						? correct_options.length === val.length
							? marks
							: val.length
						: -negMarks;
				} else {
					score += correct_options[0] === val[0] || answer === val[0] ? marks : -negMarks;
				}
			}

			//@ts-ignore
			document.getElementById('score').textContent = `You scored ${score}/${maxMarks}`;
			
			reveal_ans = true;
		}
	}
</script>

<div id="container">
	<div class="test">
		<h3>{title}</h3>

		<p id="score"></p>

		<div class="qContainer">
			{#key currentQ}
				<QuestionTile
					q={get_q(currentQ)}
					bind:response_sheet={response_sheet}
					bind:review={review}
					is_test_and_over={reveal_ans}
					{practice}
				/>
			{/key}
		</div>

		<div class="navigation">
			<button style="background: none; color: var(--ter);" class="finish" on:click={finish}>submit</button>
			<group>
				<button disabled={currentQ===0} on:click={previous}>previous</button>
				<button disabled={currentQ===TOTAL_QS} on:click={next}>Next</button>
			</group>
		</div>
	</div>

	<TestStat bind:review bind:response_sheet {set_qi} {qList} />
</div>

<style>
	#container {
		display: flex;
		flex-direction: row;
		width: 100vw;
		height: 100%;
		overflow: hidden;
		flex-grow: 1;
		align-items: stretch;
	}

	div.test {
		flex-grow: 1;
		flex-shrink: 0;
		flex-basis: 75vw;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	div.test > h3 {
		padding: 2rem 2rem 0 2rem;
		text-align: center;
	}

	div.test div.qContainer {
		flex-grow: 1;
		overflow: scroll;
	}
	p#score {
		font-size: 1.2rem;
		font-weight: 500;
		margin-bottom: 1rem;
		width: fit-content;
		margin: auto;
		background: var(--highlight);
	}

	div.navigation button {
		padding: 0.5rem;
		background: var(--sec);
		color: white;
		font-weight: 500;
		letter-spacing: 0.1rem;
	}

	div.navigation {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		background: var(--bg);
		margin: 0.5rem 0;
		padding: 1rem;
	}
	div.navigation button {
		margin: 0 1rem;
	}

	/*996px*/
	@media (min-width: 996px) {
		:global(#wrapper) {
			overflow: hidden;
		}

		#container {
			position: relative;
			display: flex;
			flex-direction: row;
		}

		div.test {
			flex-grow: 1;
			flex-shrink: 0;
			flex-basis: 75vw;
		}
	}

	:root {
		--size: 10px;
		--thumb: cornflowerblue;
		--track: #6494ed5a;
	}

	div.test {
		scrollbar-width: var(--size);
		scrollbar-color: var(--thumb) var(--track);
	}

	div.test::-webkit-scrollbar {
		background: var(--track);
		width: var(--size);
		height: var(--size);
	}

	div.test::-webkit-scrollbar-thumb {
		background: var(--thumb);
	}
</style>
