<script>
	export let question, question_id, type, qIdx, subIdx, respond;
</script>

<div id={question_id} class="qTile">
	<strong class="qno">
		Question {qIdx + 1}
		{#if type === 'mcqm'}
			<span style="margin-left: 1rem; font-size: 0.8rem; opacity: 0.8;"> (Multiple ans) </span>
		{/if}
	</strong>
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
	div.options button {
		border: 2px solid var(--elevate);
		justify-self: stretch;
		align-self: stretch;
		margin: 0.5rem;
		padding: 0.5rem;
		color: var(--txt);
		position: relative;
		display: flex;
		align-items: center;
		gap: .5rem;
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
	div.options button:hover,
	div.options input {
		background: var(--elevate);
		width: 100%;
		margin-top: 1rem;
		padding: 0.5rem;
		color: var(--txt);
	}
	div.options input:focus {
		border: 1px solid white;
	}

	div.options :global(button.selected),
	div.options :global(input.selected) {
		border: 2px solid var(--ter);
	}

	:global(div.qlist.result .selected) {
		border-width: 5px !important;
	}
	:global(div.qlist.result button) {
		border-width: 5px !important;
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
