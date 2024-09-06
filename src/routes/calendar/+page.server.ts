import clientPromise from '$lib/mongodb';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	try {
		const db = await clientPromise;
		const collection = db.db('website').collection('events');

		const events = await collection.find({}).project({ _id: 0 }).toArray();

		return { events };
	} catch (error) {
		console.error('Error fetching data:', error);
		return { events: [] };
	}
}) satisfies PageServerLoad;