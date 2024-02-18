<script>
	 export let title, metaId;
</script>

<div class="paper">
	<a href={`/test?title=${title}&metaId=${metaId}`}> {title} </a>
</div>

<style>
	div.paper {
		background: var(--elevate);
		padding: 1rem;
	}
</style>