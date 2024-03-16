<script>
// @ts-nocheck
	export let q, test;

	let sol = false;

	function toggleExplanation() {
		sol = !sol;
	}
</script>

<div id={q.question_id} class="qTile">
	<strong class="qno">
		Question {q.qi + 1}
		{#if q.type === 'mcqm'}
			<span style="margin-left: 1rem; font-size: 0.8rem; opacity: 0.8;"> (Multiple ans) </span>
		{/if}
	</strong>
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
			<input
				name={q.question_id}
				style="colspan: 2;"
				type="number"
				placeholder="Answer here"
				on:change={({ target }) => test.respond(q, target)}
			/>
		{:else}
			{#each q.options as opt}
				<button
					name={q.question_id}
					value={opt.identifier}
					on:click={({ target }) => test.respond(q, target)}
				>
					<span>{opt.identifier}</span>
					{@html opt.content}
				</button>
			{/each}
		{/if}
	</div>

	<button class="explanation" class:test={!test.is_practice} on:click={toggleExplanation}>
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
