<script>
    
</script>

<a href="#start" id="topscroll">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M246.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L224 109.3 361.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160zm160 352l-160-160c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L224 301.3 361.4 438.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3z"/></svg>
</a>

<style>
#topscroll {
    display: block;
    position: absolute;
    bottom: 2rem;
    right: 2rem;
    background: var(--pri);
    color: white;
    padding: 1rem;
    border-radius: 100%;
    z-index: 1000;
    box-shadow: 2px 2px 4px rgba(0,0,0,.3);
    transition: all 250ms ease-out;
}
#topscroll:hover {
    transform: translateY(-1rem);
    box-shadow: 3px 3px 10px rgba(0,0,0,.5);
}
#topscroll:hover svg {
    transform: translateY(-0.8rem);
}
svg {
    display: block;
}
</style>