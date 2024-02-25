<script>
// @ts-nocheck
	export let question, question_id, type, qIdx, subIdx, respond, practice;

	let sol = false;

	function toggleExplanation({ target }) {
		sol = !sol;

		let el = target.parentElement;
		
		sol
		? el.classList.add("explain")
		: el.classList.remove("explain");
	}
</script>

<div id={question_id} class="qTile">
	<strong class="qno">
		Question {qIdx + 1}
		{#if type === 'mcqm'}
			<span style="margin-left: 1rem; font-size: 0.8rem; opacity: 0.8;"> (Multiple ans) </span>
		{/if}
	</strong>
	<p>
		{#if question.direction}
			{@html question.direction}
		{/if}
		{#if question.comprehension}
			{@html question.comprehension}
		{/if}
	</p>
	<p>
		{@html question.content}
	</p>

	<div class="options">
		{#if type == 'integer'}
			<input
				name={question_id}
				style="colspan: 2;"
				type="integer"
				placeholder="Answer here"
				on:change={({ target }) => respond(subIdx, qIdx, target)}
			/>
		{:else}
			{#each question.options as opt}
				<button
					name={question_id}
					value={opt.identifier}
					on:click={({ target }) => respond(subIdx, qIdx, target)}
				>
					<span>{opt.identifier}</span>
					{@html opt.content}
				</button>
			{/each}
		{/if}
	</div>

	{#if practice}
	<button class="explanation" on:click={toggleExplanation}>
		{#if sol} &lt;
		{:else} &gt;
		{/if}
		Solution
	</button>
	{/if}
	
	<p class="explanation" >
		Solution:
		{@html question.explanation || "Currently not available."}
	</p>
</div>

<style>
	div.qTile {
		padding: 10rem 0.5rem 0 0.5rem;
		margin-top: -5rem;
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
		margin: 0.5rem;
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
	:global(div.qTile.explain button.explanation) {
		display: block;
	}
	p.explanation {
		background: #fff20011;
		padding: 1rem;
		display: none;
	}
	:global(div.qTile.explain p.explanation) {
		border: 2px solid var(--highlight);
		display: block;
	}

	:global(div.qTile .correct) {
		background: lightgreen !important;
		color: black !important;
	}
	:global(div.qTile button.pcorrect) {
		border: 3px solid lightgreen !important;
	}
	:global(div.qTile .wrong) {
		background: lightcoral !important;
		color: black !important;
	}
	:global(div.qTile span.correct) {
		padding: 0.5rem;
	}
</style>
