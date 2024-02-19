<script>
	 export let title, metaId;
</script>

<div class="paper">
	<strong> {title} </strong>
	
	<div class="actions">
		<a href={`/test?title=${title}&metaId=${metaId}&practice=true`}>
			Practice
		</a>
		<a href={`/test?title=${title}&metaId=${metaId}`}>
			Take Test
		</a>
	</div>
</div>

<style>
	div.paper {
		background: var(--elevate);
		padding: 1rem;
	}

	div.actions {
		display: flex;
		gap: 1rem;
		margin-top: .5rem;
	}
	div.actions > a {
		color: var(--txt);
		font-weight: 500;
		background: var(--elevate);
		padding: .5rem;
	}
</style>