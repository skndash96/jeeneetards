export const ssr = false;

export async function load() {
    //Source: https://github.com/benhoneywill/stoic-quotes

    let quote = await fetch("/quotes.json")
        .then(res => res.json())
        .then(quotes => quotes[Math.floor(Math.random()*quotes.length)])
        .catch(e => console.error(e));
    
    return { quote };
}