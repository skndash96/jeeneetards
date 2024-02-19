<script>
    export let question, question_id, type, qIdx, subIdx, answerResponse;

</script>

<div id={question_id} class="qTile">
    <strong class="qno">
		Question {qIdx + 1}
		{#if type === "mcqm"} <span style="margin-left: 1rem; font-size: 0.8rem; opacity: 0.8;"> (Multiple ans) </span> {/if}
	</strong>
    <p>
        {@html question.content}
    </p>

    <div class="options">
        {#if type == 'integer'}
            <input
                style="colspan: 2;"
                type="integer"
                placeholder="Answer here"
                on:change={({ target }) => answerResponse(subIdx, qIdx, target)}
            />
        {:else}
            {#each question.options as opt}
                <button
                    name={question_id}
                    value={opt.identifier}
                    on:click={({ target }) => answerResponse(subIdx, qIdx, target)}
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
		padding: 2.5rem;
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

	:global(div.qlist.result .selected) {
		border-width: 5px !important;
	}
	:global(div.qlist.result button) {
		border-width: 5px !important;
	}
	:global(div.options .correct) {
		background: lightgreen !important;
	}
	:global(div.options .wrong) {
		background: lightcoral !important;
	}
</style>