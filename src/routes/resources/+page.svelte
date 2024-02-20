<script>
	const data = {
		Physics: [
			{
				title: 'HC Verma',
				desc: "It's Short answer questions, Objectives (1, 2) are a MUST even if you don't have the time to attempt exercises, sirf yeh karke chapter ke aadhe misconceptions/doubts duur hojate hai. The exercises are good (but not enough)."
			},
			{
				title: 'DC Pandey',
				desc: "Exhaustive list of different kinds of problems of varying difficulty, categorized in 3 levels. imo not very good for concept clearing (i mean better books exist for that purpose) but it's a very good problem repository and the solutions are available online."
			},
			{
				title: 'IE Irodov',
				desc: "Difficult one, for 11thers with big dreams, don't jump straight in after completing kinematics and NLM as it assumes you already know whole mechanics from the get go. Huge confidence boost when you get a question right. This book was approachable for me after solving HC verma, my coaching material and a few PYQs. Solutions with multiple methods."
			},
			{
				title: 'SS Krotov',
				desc: 'Irodov on steroids, Difficult Math and Physics, do only if you have a lot of time. Very beautiful problems though.'
			},
			{
				title: 'Resnick Halliday (JEE version)',
				desc: "Absolutely amazing for theory, and clearing theoretical doubts, very lucid explanations with real world examples. Don't do any problems tho, waste of time if you're solving above mentioned books."
			},
			{
				title: 'Bukhovtsev problems in elementary physics',
				desc: "This was popular very long ago (when JEE was unpopular) although it's necessary if you solve SBT or Irodov type books but still if you have time you won't regret solving it."
			},
			{
				title: 'BM Sharma',
				desc: "Slightly more difficult than DC pandey, again a large number of problems, don't solve all, solve till you are confident about the chapter."
			},
			{
				title: 'Anurag Sharma',
				desc: "You won't need any other problem solving book for physics for advanced if you do this one. It has mistakes and very much disorganized but still a good book."
			},
			{
				title: 'Physics Galaxy',
				desc: "Amazing theory, covers all concepts and linear difficulty of questions (goes till olympiad level problems). No need to solve above mentioned books if you're doing this one."
			},
			{
				title: 'SBT Problems in Physics',
				desc: "Best book for specifically advanced level relevant questions. If you think you're good at physics, give this book a shot it might change your opinion."
			},
			{
				title: 'PG advanced illustrations',
				desc: "Best for revision, quality 20-60 problems in each chapter. I personally read the question, try to think of what steps I'd take to reach the solution, then look at the given solution."
			},
			{
				title: 'Pathfinder',
				desc: 'SS krotov on cocaine + steroids, not very relevant for JEE but do it if you have A LOT of time and are also preparing for Olympiads. I personally solved some selected problems of electrostatics from this book'
			}
		],
		Chemistry: [
			{
				title: 'JD Lee',
				desc: "Waste of time if you aren't an inorganic loving masochist or aren't preparing for olympiads, read NCERT."
			},
			{
				title: 'Solomons and Fryhle',
				desc: 'Good reference book for organic, for revision I have to open these and notes and read from both, good explanations. Some cheese is missing, Reimer Tiemann if I remember correctly. Also there is some cheese extra so stick to the syllabus.'
			},
			{
				title: 'MS Chouhan',
				desc: "Probably the only problem solving book you'll need for organic. A bit difficult but covers everything in the JEE syllabus."
			},
			{
				title: 'PMS sir digital book',
				desc: 'available for free on his channel, with solutions, the only problem solving book you\'ll need for inorganic. An alternative is "Problems and solutions in Inorganic chemistry" by VJ sir, similar difficulty but the solutions are absent.'
			},
			{
				title: 'Narendra Awasthi / RC mukherjee',
				desc: 'Merging as same difficulty, pick any one. Again, covers everything till advanced syllabus.'
			},
			{
				title: 'Peter Atkins',
				desc: 'Good reference book for physical but only if you have time. Read Equilibrium and Thermodynamics from it, helped a lot.'
			},
			{
				title: 'NL Glinka',
				desc: 'Only chemistry theory book that gets you hooked. Not designed for JEE so checkout with the syllabus'
			}
		],

		Mathematics: [
			{
				title: 'Arihant / Cengage /TMH (Vinay Kumar)',
				desc: "merging all in one as they're pretty much similar in difficulty, download any PDF see if you like any and choose one. A LOT of questions so if you are doing coaching material, don't solve all questions, solve until you are confident in the chapters. Skip if you solve coaching materials religiously."
			},
			{
				title: 'Black Book by Vikas Gupta',
				desc: "Quality questions, difficulty doesn't increase linearly so don't attempt just after learning theory. Calculus syllabus is top-notch, many advanced questions have come from this book. All in All very relevant for advanced."
			},
			{
				title: 'IA Maron',
				desc: "Only for calculus, best book if you already know the basics. Very good selection of questions, theory you'll understand better. (Skip Euler substitution irrelevant for JEE)"
			},
			{
				title: '1000 challenging Problems by Sameer Bansal',
				desc: "As the title says. Do it only after you've completed the syllabus."
			},
			{
				title: 'ISI CMI PYQs',
				desc: "Many people don't know about this, a goldmine for quality math problems. JEE has taken questions from these in the past."
			},
			{
				title: 'Higher Algebra by Hall and Knight',
				desc: 'Good to boost your prep, not a beginner level book. Very good selection of questions.'
			},
			{
				title: 'Vikas Gupta yellow and pink book',
				desc: 'Really good selection of questions specially Algebra.'
			}
		],

		Biology: [
			{
				title: 'NCERT',
				desc: 'That is enough for Biology theory.'
			},
			{
				title: 'MTG',
				desc: 'To practice Problems.'
			},
			{
				title: 'IITian Academy Notes',
				desc: 'Last minute revision.'
			}
		],

		Computer: [
			{
				title: 'Sumita Arora',
				desc: 'sufficient for boards'
			}
		],

		Tests: [
			{
				title: 'ALLEN',
				desc: 'Nurture and Leader 2020'
			},
			{
				title: 'FITJEE AITs',
				desc: '2013-2022'
			},
			{
				title: 'NARAYANA',
				desc: 'Full Tests'
			},
			{
				title: 'Vidya Mandir',
				desc: 'Full syllabus advanced 3hrs tests'
			}
		],

		// https://drive.google.com/drive/folders/1QqbJIbzhtg_e2j5plW7tUTE8CB1DiSu2?usp=sharing

		Playlist_Physics: [
			{
				title: 'Physics Galaxy',
				desc: 'Complete advanced syllabus with separate playlists for Advanced Illustrations.'
			},
			{
				title:
					'ABJ sir -In my opinion best youtube physics teacher for actual JEE advanced preparation, teaches lesser known but important concepts ( for example )',
				desc: "gravitational pressure wala concept sirf yahi pe standard proofs ke saath mila mujhe, thoda high level so don't rush the process, give the concepts enough time and though trust me clear hojayega sab"
			},
			{
				title: 'Physics Wallah',
				desc: 'Old videos are good for mains, new videos by other faculties are very good for both mains + advanced. This is for all 3 subjects.'
			},
			{
				title: 'Unacademy Accelerate',
				desc: 'disorganized hai but has amazing revision series and problem practice sessions, this one is for all the subjects.'
			},
			{
				title: 'Phy with akash goyal',
				desc: 'Physics Galaxy like advanced illustration playlists but 10x tougher'
			},
			{
				title: 'Physics with vinay uppal',
				desc: "new channel so can't say much, but from the videos he's posted looks quite promising for problem practice"
			},
			{
				title: 'Rkh sir',
				desc: 'disorganized but 2 particular playlist (DDPs solution for IIT JEE ADVANCED & TPTs solutions) have very good problems, also his blog has irodov ke saare solutions.'
			},
			{
				title: 'Ganesh Kumar IPS',
				desc: 'for both math and physics, good selection of problems, very clear explanations. His PnC and SHM playlists helped me alot'
			},
			{
				title: 'Lighthouse',
				desc: 'useful for clearing your concepts and developing intuition. imo this channel is the closest indian education comes to actually teaching you the scientific method and developing your interest in physics. Teaching physics for the sake of teaching physics, not to pass an exam'
			}
		],

		Playlist_Mathematics: [
			{
				title: 'Mohit tyagi',
				desc: 'I mean what can i even say, best channel full syllabus hai and acche se padhaaya hai'
			},
			{
				title: 'Mathmerising',
				desc: "a bit more advanced, really good selection of problems and teaches some important concepts which i didn't find even in mohit sir's videos (no disrespect :P) his Pnc playlist particularly made life a lot easier, rest playlists are amazing too"
			},
			{
				title: 'Gradeup sessions by Anshul Sir',
				desc: 'his advanced problem solving sessions have good problems'
			},
			{
				title: 'JEE Maths Unplugged',
				desc: 'very underrated, Complex number problems playlist dekhlo sab samajh jaoge. Exhaustive set of all types of problems, even the theory part is very well explained. Trigo, Pnc, indefinite and complex number playlists in particular helped me alot.'
			},
			{
				title: 'Amit Mahala sir',
				desc: 'his one shot revision series and problem solving videos are second to none'
			},
			{
				title: '3B1B',
				desc: "not a JEE oriented channel, still decided to put it here for just 11th moving peeps jinhe physics me integration differentiation padhni hai. Watch his playlist, very high chance ki you don't get all of it, but just putting in the effort to understand it will make calc easier in the future, bas sabkuch samajhne ka try karna samajh naa bhi aaye no problem rewatch the video a few times if needed"
			}
		],

		Playlist_Chemistry: [
			{
				title: 'IITian Explains',
				desc: 'disorganized but AMAZING like really amazing selection of problems for advanced organic and inorganic'
			},
			{
				title: 'ALK sir',
				desc: 'One of the best playlist for chemistry.'
			},
			{
				title: 'Pahul sir',
				desc: "teaches in english, explains concepts clearly and till advanced level, his 'advanced problem solving' playlist and 'epic GOC' playlist are amazing."
			},
			{
				title: 'Neeraj Saini sir',
				desc: "full advanced syllabus GOC playlist try karlo if you have any doubts. ORM me problem aasakti hai because it's too much to handle sometimes but if you persevere MS chouhan will be a piece of cake for you"
			},
			{
				title: 'Pankaj sir chemistry',
				desc: 'Good for quick but in depth revision.'
			},
			{
				title: 'Piyush Maheshwari',
				desc: "he has uploaded his own digital book with solutions on his channel, on par with Vishal Joshi sir's book, I'd say inke videos se practice karo as VJ sir ki book me solutions utne ache nahi hai, but inhone sab samjahke solution ke saath banai hai videos"
			},
			{
				title: 'Atp star vineet khatri',
				desc: 'good for doubt clearing in organic chemistry'
			}
		],

		Playlist_Biology: [
			{
				title: 'Neela Bakore Tutorials',
				desc: 'Covers NCERT as well as beyond that,best imo in the available lot'
			},
			{
				title: 'Ozone classes Vipin Sharma',
				desc: 'NCERT line to line explanation,can see if you’ve got any doubt'
			},
			{
				title: 'Tarun Sir on PW',
				desc: 'Only available on PW courses,he teaches well . You may check out his questions banks on competition wallah which are free'
			}
		]
	};
</script>

<svelte:head>
	<title> Digital Resources </title>
	<meta name="title" content="Digital Resources" />
	<meta name="description" content="A large Collection of Books, Tests, Notes, Playlist and whatsoever you would need to Rise as an Aspirant." />
</svelte:head>

<div class="container">
	<div class="index">
		<h3>INDEX</h3>
		<ol>
			{#each Object.keys(data) as sub}
				<li>
					<a href="#{sub}"> {sub.split('_').join(' ')} </a>
				</li>
			{/each}
		</ol>
	</div>

	{#each Object.keys(data) as sub}
		<div id={sub} class="subject">
			<h2>{sub.split('_').join(' ')}</h2>

			<ul>
				{#each data[sub] as item, idx}
					<li>
						<strong> {item.title} </strong><br />
						<span> {item.desc} </span>
					</li>
				{/each}
			</ul>
		</div>
	{/each}
</div>

<style>
    div.container {
        padding: 3rem;
		max-width: var(--lg);
		margin: 0 auto;
    }

	div.index ol {
		margin-left: 2rem;
        color: var(--ter);
	}
    div.index ol li {
        margin-top: .5rem;
    }

	div.subject {
		padding: 3rem 0;
	}
    div.subject:target h2 {
        background: var(--highlight);
    }
	div.subject ul li {
		margin-top: 1rem;
	}
	div.subject ul li strong {
		color: var(--ter);
		font-size: 1.1rem;
	}
	div.subject ul li span {
		opacity: 0.8;
	}
</style>
