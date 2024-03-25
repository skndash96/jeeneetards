<script>
	import { onMount } from "svelte";

	export let
		/**@type {Question} */q,
		/**@type {ResponseSheet}*/ response_sheet,
		/**@type {boolean[]}*/ review,
		/**@type {boolean}*/ practice;

	let sol = false;
	
	/**
	 *@param {Question} q
	 *@param {EventTarget|null} t
	 *@param {"mark-review" | "mark-answer"} type
	 */
	 function respond(q, t, type) {
		if (type === "mark-review") {
			review[q.qi] = !review[q.qi];
		}
		
		else if (type === "mark-answer") {
			let pre = response_sheet[q.qi] || [];
			//@ts-ignore
			let v = t.value;
			let idx = pre.findIndex((x) => x === v);

			if (idx !== -1) {
				pre.splice(idx, 1);
			} else {
				if (q.type === 'mcqm') pre.push(v);
				else pre = [v];
			}

			response_sheet[q.qi] = pre;
			response_sheet = response_sheet;
		}
	}
	
	function toggleExplanation() {
		sol = !sol;
	}

	/**
	 * @param {EventTarget|null} target
	 * @param {string} answer
	 */
	 function appendIntegerAnswer(target, answer) {
		let el = document.createElement('span');
		el.classList.add('correct');
		el.textContent = 'Answer: ' + answer;

		//@ts-ignore
		if (target.parentElement.children.length < 2) target.parentElement.appendChild(el);
	}
</script>

<div id={q.question_id} class="qTile">
	<div class="info">
		<strong class="qno">
			Question {q.qi + 1}
			{#if q.type === 'mcqm'}
				<span style="margin-left: 1rem; font-size: 0.8rem; opacity: 0.8;"> (Multiple ans) </span>
			{/if}
		</strong>

		<button on:click={({ target }) => respond(q,target,"mark-review")} >
			Review Later
		</button>
	</div>

	<p>
		{#if q.direction}
			{@html q.direction}
		{/if}
		{#if q.comprehension}
			{@html q.comprehension}
		{/if}
		<br />
	<p>
		{@html q.content}
	</p>

	<div class="options">
		{#if q.type == 'integer'}
			{@const response = response_sheet[q.qi]}
			<input
				name={q.question_id}
				style="colspan: 2;"
				type="number"
				class:selected={!!response?.[0]}
				class:correct={practice && q.answer === response?.[0]}
				class:wrong={practice && q.answer !== response?.[0]}
				value={response?.[0]}
				placeholder="Answer here"
				on:change={({ target }) => respond(q, target, "mark-answer")}
				on:change={({ target }) => appendIntegerAnswer(target, q.answer)}
			/>
		{:else}
			{@const response = response_sheet[q.qi]}
			{#each q.options as {identifier, content}}
				<button
					name={q.question_id}
					class:selected={response?.includes(identifier)}
					class:correct={practice && q.correct_options.includes(identifier)}
					class:wrong={practice && response?.includes(identifier) && q.correct_options.includes(identifier)}
					value={identifier}
					on:click={({ target }) => respond(q, target, "mark-answer")}
				>
					<span style="background-color: lightgrey; font-weight: 600; color: black; padding: .1rem;">{identifier}</span>
					{@html content}
				</button>
			{/each}
		{/if}
	</div>

	<button class="explanation" class:test={!practice} on:click={toggleExplanation}>
		{#if sol} &lt;
		{:else} &gt;
		{/if}
		Solution
	</button>
	
	<p class="explanation" class:show={sol}>
		Solution:
		{@html q.explanation || "Currently not available."}
	</p>
</div>

<style>
	div.qTile {
		padding: 0 2rem 10rem 1rem;
		width: fit-content;
		min-width: 60vw;
		margin: auto;
	}

	div.info {
		display: flex;
		justify-content: space-between; 
	}
	div.info button {
		color: var(--ter);
	}
	div.info .qno {
		font-size: 1.25rem;
	}

	div.options {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 1fr 1fr;
		place-items: center;
		gap: .5rem;
		margin: .5rem 0;
	}

	
	div.options button::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		cursor: pointer;
	}

	div.options button {
		justify-self: stretch;
		align-self: stretch;
		padding: 0.5rem;
		color: var(--txt);
		position: relative;
		display: flex;
		align-items: center;
		gap: .5rem;
		border: 2px solid var(--elevate);
	}
	div.options button:not(disabled):hover {
		background: var(--elevate);
	}
	div.options input {
		background: var(--elevate);
		color: var(--txt);
		border: 2px solid var(--elevate);
		padding: 0.5rem;
		margin-top: 1rem;
	}
	div.options input:focus {
		border: 2px solid white;
	}
	
	div.options :global(button.selected),
	div.options :global(input.selected) {
		border: 2px solid var(--ter);
	}

	button.explanation {
		color: var(--txt);
	}
	button.explanation:hover {
		color: var(--sec);
	}

	button.test.explanation {
		display: none;
	}
	:global(div.qTile.explain button.test.explanation) {
		display: block;
	}

	p.explanation {
		background: #fff20011;
		padding: 1rem;
		display: none;
	}
	p.explanation.show {
		border: 2px solid var(--highlight);
		display: block;
	}

	:global(div.qTile .correct) {
		background: lightgreen !important;
		border-color: lightgreen !important;
		color: black !important;
	}
	:global(div.qTile button.pcorrect) {
		border: 3px solid lightgreen !important;
	}
	:global(div.qTile .wrong) {
		background: lightcoral !important;
		border-color: lightcoral !important;
		color: black !important;
	}
	:global(div.qTile span.correct) {
		padding: 0.5rem;
	}
</style>
