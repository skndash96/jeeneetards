import { browser } from '$app/environment';
import { error } from '@sveltejs/kit';
import "./typedef";

export const ssr = false;

export async function load({ url, fetch }) {
    let [ metaId, title, practice ] = [url.searchParams.get("metaId"), url.searchParams.get("title"), url.searchParams.get("practice")];

    if (metaId && title) {
        let res = await fetch(`/pyqs/${metaId}.json`);
        
        /**
         * @type {Subject[]} 
         */
        let qList = await res.json();

        let qi = 0;

        /**
         * Cumulative Subject Length - Used to find subject using qi.
         * @type number[]
         */
        let csl = qList.reduce((/**@type {number[]}*/acc,s,i) => {
            acc.push((acc[acc.length-1] || 0) + s.questions.length);
            return acc;
        }, []);
        
        qList.map((s,si) => {
            s.si = si;
            
            s.questions = s.questions.map(q => {
                q.si = si;
                q.qi = qi;

                qi += 1;

                return q;
            });

            return s;
        });

        return {
            metaId,
            title,
            practice: !!practice,
            qList,
            csl
        };
    }

    error(404, "Not Found");
}