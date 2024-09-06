import type { PageServerLoad } from './$types';

export const load = (async () => {
	const url = 'https://api.imagekit.io/v1/files';
	const options = {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			Authorization: 'Basic cHJpdmF0ZV9ka293VldIMldpd0RiSUczeXY0Mm9qUmJTMFE9Og=='
		}
	};

	try {
		const response = await fetch(url, options);
		const data = await response.json();

		const galleryDict: Record<string, string[]> = {};

		// Regular expression to match the desired file paths
		const pattern = /^\/gallery\/([^/]+)\/[^/]+\.[a-zA-Z]+$/;

		// Iterate over each file in the data
		data.forEach((file) => {
			const filePath = file.filePath || '';
			const match = filePath.match(pattern);
			if (match) {
				const category = match[1];
				const url = file.url || '';
				if (!galleryDict[category]) {
					galleryDict[category] = [];
				}
				galleryDict[category].push(url);
			}
		});

		return { gallery: galleryDict };
	} catch (error) {
		console.error(error);
		return { error: 'Failed to fetch data' };
	}
}) satisfies PageServerLoad;
