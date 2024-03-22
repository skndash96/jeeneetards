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
        qList.map((s,si) => {
            s.si = si;
            
            s.questions = s.questions.map((q,qi) => {
                q.qi = qi;
                q.si = si;
                return q;
            });

            return s;
        });

        // let lastResponse;
        // if (browser) {
        //     lastResponse = window.localStorage.getItem("lastResponse");
        //     lastResponse = lastResponse && JSON.parse(lastResponse);

        //     if (!lastResponse || !lastResponse.length) {
        //         lastResponse = null;
        //     }
        // }

        return {
            metaId,
            title,
            practice: !!practice,
            qList
        };
    }

    error(404, "Not Found");
}