<script>
	export let /**@type {ResponseSheet} */ response_sheet,
		/**@type {Subject[]} */ qList,
		/**@type {function}*/ set_qi,
		/**@type {boolean[]}*/ review,
		/**@type {number}*/ currentQ;
	
	let menuOpen = false;

	/**
	 * @param {number} qi
	 * @returns {boolean}
	 */
	function check_stat(qi) {
		return !!response_sheet[qi]?.length;
	}
</script>

<div id="stat" class:open={menuOpen}>
	<button class="palette" on:click={() => (menuOpen = !menuOpen)}>
		{#if menuOpen}
			<strong style="display: inline-block; transform: rotate(45deg);">+</strong>
		{:else}
			<span> &gt;Palette </span>
		{/if}
	</button>

	<div id="palette" class="palette">
		{#each qList as sub, si}
			<h3>{sub.title}</h3>
			<div class="substat">
				{#each sub.questions as { qi }}
					{#key response_sheet[qi]}
					<button
						style="pointer-events: initial;"
						class="qstat"
						class:tick={check_stat(qi)}
						class:review={review[qi]}
						class:selected={qi===currentQ}
						on:click={() => {
							menuOpen = false;
							set_qi(qi);
						}}
					>
						{qi + 1}
					</button>
					{/key}
				{/each}
			</div>
		{/each}
	</div>
</div>

<style>
	#stat {
		position: fixed;
		width: 100vw;
		top: 0;
		left: 0;
		bottom: 0;
		z-index: 1000;
		transform: translateX(100%);
		background-color: #00000011;
		transition: all ease-out 100ms;
	}
	#stat * {
		color: var(--txt);
	}
	:global(html.dark #stat) {
		background: #000000aa;
	}
	#stat.open {
		pointer-events: initial;
		transform: translateX(0);
	}

	div.palette {
		width: 75vw;
		max-width: 32rem;
		margin-left: auto;
		padding: 2rem 0.5rem 2rem 1rem;
		color: white;
		box-shadow: inset 0px 2px 10px rgba(0, 0, 0, 5);
		height: 100%;
		overflow-y: auto;
		pointer-events: initial;
		background: var(--pri);
	}

	button.palette {
		color: white !important;
		background: var(--pri);
		padding: 0.5rem;
		box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.3);
		font-weight: 600;
		position: absolute;
		top: 5rem;
		right: 0;
		margin-right: 105vw;
		pointer-events: initial;
		cursor: pointer;
	}
	#stat.open button.palette {
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
	button.qstat {
		display: block;
		background: var(--elevate);
		color: white;
		text-align: center;
		font-size: 0.9rem;
		width: 1.75rem;
		height: 1.75rem;
		position: relative;
	}
	:global(button.qstat.tick) {
		background: green !important;
	}
	:global(button.qstat.review) {
		background: blueviolet !important;
	}
	:global(button.qstat.selected) {
		border: 3px solid cyan;
	}
	:global(button.qstat.review.tick::before) {
		content: "";
		width: .5rem;
		height: .5rem;
		border-radius: 100%;
		background: lightgreen;
		z-index: 2;
		position: absolute;
		bottom: 0;
		right: 0;
	}

	/*996px*/
	@media (min-width: 996px) {
		#stat {
			flex-shrink: 1;
			flex-grow: 0;
			transform: unset;
			position: unset;
			width: unset;
			z-index: 1;
		}

		div.palette {
			max-width: unset;
			max-height: unset;
			width: unset;
			background: var(--elevate);
		}
		button.palette {
			display: none;
		}
	}

	:root {
		--size: 10px;
		--thumb: cornflowerblue;
		--track: #6494ed5a;
	}

	div.palette {
		scrollbar-width: var(--size);
		scrollbar-color: var(--thumb) var(--track);
	}

	div.palette::-webkit-scrollbar {
		background: var(--track);
		width: var(--size);
		height: var(--size);
	}

	div.palette::-webkit-scrollbar-thumb {
		background: var(--thumb);
	}
</style>
