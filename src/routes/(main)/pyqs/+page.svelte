<script>
	// @ts-nocheck
	import PaperTile from '$lib/paperTile.svelte';
	import exams from '$lib/exams.json';
</script>

<svelte:head>
	<title> Past Year Question Papers </title>
	<meta name="title" content="Past Year Question Papers" />
	<meta name="description" content="Collection of PYQs for you solve or write a test." />
</svelte:head>

<div class="container">
	<div class="new">
		<h3> New </h3>
		<ul>
			<li>Use Keybindings to navigate through questions.</li>
			<li>ArrowRight -> Next Question</li>
			<li>ArrowLeft -> Previous Question</li>
			<li>Letter "r" -> Mark for Review</li>
			<li>Delete button -> Clear Response</li>
		</ul>
	</div>

	<h2>Index</h2>

	<div class="index">
		<ol>
			{#each exams as { title, yearwise }}
				<li>
					<a href={'#' + title}> {title.split("-").join(" ").toUpperCase()} </a>
					{#if yearwise}
						<ul>
							{#each yearwise as [year, _]}
								<li>
									<a href={'#' + title + year}> {year} </a>
								</li>
							{/each}
						</ul>
					{/if}
				</li>
			{/each}
		</ol>
	</div>

	{#each exams as { title, papers, yearwise }}
	<div class="examlist">
		{#if yearwise}
			<h3 id={title} class="exam">
				{title.split('-').join(' ').toUpperCase()}
			</h3>

			<div class="yearwiselist">
				{#each yearwise as [year, range]}
					<h3 id={title + year} class="yearwise">
						Year {year}
					</h3>

					<div class="exam">
						{#each papers.slice(...range) as paper}
							<PaperTile title={paper.title} metaId={paper.metaId} />
						{/each}
					</div>
				{/each}
			</div>
		{:else}
		<h3 id={title} class="exam">
			{title.split('-').join(' ').toUpperCase()}
		</h3>

			<div class="exam">
				{#each papers as paper}
					<PaperTile title={paper.title} metaId={paper.metaId} />
				{/each}
			</div>
		{/if}
	</div>
	{/each}
</div>

<style>
	div.container {
		padding: 2rem;
		max-width: var(--lg);
		margin: 0 auto;
	}

	div.new {
		float: right;
	}

	div.index ol {
		margin-left: 3rem;
		color: var(--ter);
	}
	div.index ul {
		list-style-type: none;
		margin-left: 3rem;
	}
	div.index li {
		margin-top: 1rem;
	}

	h3.yearwise {
		color: var(--sec);
		font-weight: bolder;
	}
	h3.exam, h3.yearwise {
		padding: 3rem 1rem 0 1rem;
		width: fit-content;
	}
	
	div.exam {
		display: grid;
		grid-template-columns: 1fr;
		gap: 2rem;
		width: fit-content;
		margin: 2rem auto 2rem 0;
	}
	@media screen and (min-width: 556px) {
		div.exam {
			grid-template-columns: 1fr 1fr;
		}
	}
	@media screen and (min-width: 996px) {
		div.exam {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	h3:target {
		background: var(--highlight);
	}
</style>