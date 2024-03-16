import { browser } from '$app/environment';
import { error } from '@sveltejs/kit';
import Test from "./utils.ts";

export const ssr = false;

export async function load({ url, fetch }) {
    let [ metaId, title, practice ] = [url.searchParams.get("metaId"), url.searchParams.get("title"), url.searchParams.get("practice")];

    if (metaId && title) {
        let res = await fetch(`/pyqs/${metaId}.json`);
        
        let qs = await res.json();
        let test = new Test(!!practice, qs);

        let lastResponse;
        
        if (browser) {
            lastResponse = window.localStorage.getItem("lastResponse");
            lastResponse = lastResponse && JSON.parse(lastResponse);

            if (!lastResponse || !lastResponse.length) {
                lastResponse = null;
            }
        }

        return {
            metaId, title, test, lastResponse
        };
    }

    error(404, "Not Found");
}