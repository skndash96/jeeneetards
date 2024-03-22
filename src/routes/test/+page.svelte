<script>
	import { onMount } from 'svelte';
	import './typedef';
	import TestStat from '$lib/testStat.svelte';
	import QuestionTile from '$lib/questionTile.svelte';
	import TopScroll from '$lib/topScroll.svelte';

	export let data;

	let loaded = false,
		menuOpen = false,
		currentSub = 0;
    
	let {
        metaId,
        title,
        practice,
        qList
    } = data;

	/**
	 * @type {ResponseSheet}
	 */
	let response_sheet = qList.map((sub) => Array(sub.questions.length).fill(null));

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
	 *@param {Question} q
	 *@param {HTMLInputElement} t
	 */
	function respond(q, t) {
		let pre = response_sheet[q.si][q.qi] || [];
		let v = t.value;
		let idx = pre.findIndex((x) => x === v);

		if (idx !== -1) {
			pre.splice(idx, 1);
		} else {
			if (q.type === 'mcqm') pre.push(v);
			else pre = [v];
		}

		update_stat(q, pre, t);
	}

	/**
	 * @param {Question} q
	 * @param {string[] | null} to
	 * @param {HTMLInputElement} target
	 */
	function update_stat({ si, qi, type, answer, correct_options }, to, target) {
		response_sheet[si][qi] = to;
		response_sheet = response_sheet;

		target.parentElement?.querySelectorAll(`*[name='${target.name}']`).forEach((el) => {
			// @ts-ignore
			if (el.value && to.includes(el.value)) el.classList.add('selected');
			else el.classList.remove('selected', 'correct', 'wrong');

			// @ts-ignore
			if (practice && to.includes(el.value)) {
				// @ts-ignore
				correct_options.includes(el.value) || answer === el.value
					? el.classList.add('correct')
					: el.classList.add('wrong');

				if (type === 'integer') appendIntegerAnswer(target.parentElement, answer);
			}
		});
	}

	/**
	 * @param {HTMLElement|null} target
	 * @param {string} answer
	 */
	function appendIntegerAnswer(target, answer) {
		let el = document.createElement('span');
		el.classList.add('correct');
		el.textContent = 'Answer: ' + answer;

		target?.appendChild(el);
	}

    function finish() {
        if (practice) return;

        if (window.confirm("Do you want to FINISH this test?")) {
            document.querySelectorAll(".qTile > input, .qTile > button")
				//@ts-ignore
				.forEach(el => (el.disabled = true));
            
            let score = 0;
            let maxMarks = 0;

            for (let si = 0; si < response_sheet.length; si++) {
                for (let qi = 0; qi < response_sheet[si].length; qi++) {
                    let { correct_options, answer, question_id, type, marks, negMarks } = qList[si].questions[qi];
                    let val = response_sheet[si][qi];

                    //Reveal MCQ answer
                    document.querySelectorAll(`*[name='${question_id}']`).forEach(el => {
                        //@ts-ignore
						let is_c = correct_options.includes(el.value) || answer === el.value;
                        let is_s = el.classList.contains("selected");
                        
                        if (is_s) el.classList.add(is_c ? "correct" : "wrong");
                        if (is_c) el.classList.add("pcorrect");
                    });
            
                    //Append Integer answer
                    if (type === "integer") appendIntegerAnswer(
                        document.querySelector(`#${question_id} > div.options`),
                        answer
                    );
                    
                    maxMarks += marks;
                    
                    if (!val?.length) continue;
                    
                    //Add to score
                    if (type === "mcqm") {
                        score += val.every(o => correct_options.includes(o))
                            ? (correct_options.length === val.length ? marks : val.length)
                            : -negMarks;
                    } else {
                        score += correct_options[0] === val[0] || answer === val[0] ? marks : -negMarks;
                    }
                }
            }

			//@ts-ignore
            document.getElementById("score").textContent = `You scored ${score}/${maxMarks}`;
			
			Array.from(document.querySelectorAll("div.options button, div.options input"))
				//@ts-ignore
				.forEach(el => (el.disabled = true));
        }
    }
</script>

<div id="container">
	<div class="test">
		<h3>{title}</h3>

		<p id="score"></p><br/>

		<div class="menu">
			<div id="start"></div>


			{#each qList as sub}
				<button
					class="classic"
					disabled={currentSub === sub.si}
					on:click={() => (currentSub = sub.si)}
				>
					{sub.title}
				</button>
			{/each}

			{#if !practice}
				<button class="classic finish" on:click={finish}> FINISH </button>
			{/if}
		</div>

        <div class="qContainer">
            {#each qList as sub}
            <div class="qList" class:visible={currentSub === sub.si} >
                {#each sub.questions as q}
					<QuestionTile {q} {respond} {practice} />
                {/each}
            </div>
            {/each}
        </div>
	</div>

	<TestStat bind:response_sheet bind:currentSub {qList} />
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
	
	div#start {
		margin-top: -5rem;
		padding-top: 5rem;
	}
	div.test {
		flex-grow: 1;
		flex-shrink: 0;
		flex-basis: 75vw;
		overflow: scroll;
		scroll-behavior: smooth;
	}

	div.test > h3 {
		padding: 2rem 2rem 0 2rem;
		text-align: center;
	}
    
	div.qList {
		max-width: var(--md);
		margin: 0 auto;
		max-height: 0;
		overflow: hidden;
	}
	div.qList.visible {
		max-height: unset;
		overflow: unset;
		animation-name: slidein;
		animation-duration: 0.5s;
		animation-iteration-count: 1;
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
		margin-top: 2rem;
		padding: .5rem;
		flex-wrap: wrap;
		margin: auto;
		width: fit-content;
	}
	div.menu button {
		padding: 0.5rem;
		margin: 0.25rem;
		background: var(--sec);
		color: white;
		font-weight: 500;
		letter-spacing: 0.1rem;
	}
	div.menu button:disabled {
		background: var(--pri);
	}
	div.menu button.finish {
		background: white;
		color: var(--pri);
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
