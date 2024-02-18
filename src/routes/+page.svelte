<script>
let quote = "The impedement to action advances action, what stands in the way becomes the way.";
</script>

<div class="container">
    <div class="quote">
        <span>"</span>
        <span> {quote} </span>
        <span>"</span> <br>
        <span> - Marcus Aurelius </span>
    </div>

    <section class="about sm">
        <div class="banner">
            <!-- <img alt="banner" width="400" src="https://images2.imgbox.com/d6/76/Ptxnkdlm_o.png" /> -->
        </div>
        
        <div class="stats">
            <div>
                <span> 101,353 </span><br>
                <span> Active Users </span>
            </div>
            <div>
                <span> 1269 </span><br>
                <span> Lurking </span>
            </div>
        </div>

        <hr>

        <p>Welcome to our Subreddit dedicated to India's beloved entrance exams, JEE and NEET. Whether you're seeking serious guidance or looking for some lighthearted shitposting, you'll find everything related to JEE and NEET here.</p>
        
        <section class="cards lg">
            <div>
                <h3> Compassion </h3>
                <p> Imagine a virtual bonfire where souls gather to share tales of triumph and tribulation. Yeah, that's us. </p>
            </div>
            
            <div>
                <h3> Support </h3>
                <p>  Navigate the beloved entrance exams with expert tips and pep talks from seasoned mentors, keeping your motivation at an all-time high. </p>
            </div>
            
            <div>
                <h3> Motivational Hangouts </h3>
                <p> Chill with a crew of driven individuals, swapping success tales and pumping up each other’s spirits for unstoppable exam domination </p>
            </div>
            
            <div>
                <h3> Diversity </h3>
                <p> Diversity rocks our world, fuels creativity, and sparks innovation. It's our secret sauce for crushing goals and forging bonds that last a lifetime. </p>
            </div>
        </section>
    </section>

    </div>

<style>
    div.container {
        font-size: 1.1rem;
    }
    div.quote {
        width: fit-content;
        margin: auto;
        font-weight: 600;
        padding: 2rem;
        font-size: 1.3rem;
    }
    div.quote span:nth-of-type(odd) {
        color: var(--sec);
        display: inline-block;
        transform: scale(2.5) translate(0, .1rem);
        margin: .2rem .5rem;
    }
    div.quote span:last-child {
        display: block;
        text-align: right;
        opacity: 0.7;
        margin-top: 1rem;
    }

    section.about {
        padding: 1rem;
        width: inherit;
        max-width: none;
        position: relative;
        margin-bottom: 0;
    }

    div.stats {
        width: fit-content;
        margin: 0 auto;
        padding: 1rem;
        display: flex;
        flex-direction: row;
    }

    div.stats > div:first-child {
        padding-right: 1.5rem;
        border-right: 2px solid var(--txt);
    }

    div.stats > div:last-child {
        padding-left: 1.5rem;
    }
    div.stats > div > span:first-child {
        font-weight: 700;
        font-size: 2rem;
    }
    div.stats > div > span:last-child {
        color: var(--sec);
    }

    section.about hr {
        border: none;
        margin: 0 auto 2rem auto;
        width: fit-content;
        max-width: 50vw;
    }
    
    section.about hr::after{
        content: '∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿∿';
        /* Ratio -> font-size/letter-spacing = 6.25 */
        letter-spacing: calc(-2rem/6.25);
        font-size: 2rem;
        opacity: .75;
        transform: scale(0.5);
    }

    section.about p {
        max-width: 32rem;
        margin: 0 auto;
        font-weight: 400;
        line-height: 2rem;
    }

    .cards {
        display: flex;
        flex-direction: row;
        gap: 1rem;
        max-width: fit-content;
        flex-wrap: wrap;
    }
    .cards > div {
        padding: 1rem;
        border: 1px solid white;
        max-width: 16rem;
        margin: 0 auto;
    }
    .cards h3 {
        color: var(--sec);
    }
    .cards p {
        opacity: .75;
    }
</style>