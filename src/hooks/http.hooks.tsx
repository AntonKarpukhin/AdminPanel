import {useCallback} from "react";

export const HttpHooks = () => {

	const request = useCallback(async function <T> (url:string, method = "GET", body: string | null = null, headers = {'Content-Type': 'application/json'}): Promise<T> {

		try {
			const response = await fetch(url, {method, body, headers});

			if (!response.ok) {
				throw new Error(`Could not fetch ${url}, status: ${response.status}`);
			}

			const data : T = await response.json();

			return await data;

		} catch (err) {
			throw err;
		}
	}, []);

	return {request}
}