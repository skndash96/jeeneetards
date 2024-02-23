import { browser } from '$app/environment';
import { error } from '@sveltejs/kit';

export const ssr = false;

export async function load({ url, fetch }) {
    let [ metaId, title, practice ] = [url.searchParams.get("metaId"), url.searchParams.get("title"), url.searchParams.get("practice")];

    if (metaId && title) {
        let res = await fetch(`/pyqs/${metaId}.json`);
        
        let subjects = await res.json();

        let lastResponse;
        
        let response = subjects.map((/** @type {{ questions: string | any[]; }} */ sub) =>
            new Array(sub.questions.length).fill(null)
        );

        if (browser) {
            lastResponse = window.localStorage.getItem("lastResponse");
            lastResponse = lastResponse && JSON.parse(lastResponse);

            if (!lastResponse || !lastResponse.length) {
                lastResponse = null;
            }
        }

        return {
            metaId, title, practice, subjects, response, lastResponse
        };
    }

    error(404, "Not Found");
}