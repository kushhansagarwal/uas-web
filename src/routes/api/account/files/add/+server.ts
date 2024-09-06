import type { RequestHandler } from '@sveltejs/kit';
import clientPromise from '$lib/mongodb';

export const POST: RequestHandler = async ({ request }) => {
	const db = await clientPromise;
	const usersCollection = db.db('website').collection('users');
	const { email, code } = await request.json();

	try {
		const result = await usersCollection.updateOne({ email }, { $push: { files: code } });

		return new Response(JSON.stringify({ message: 'File code added successfully', result }), {
			status: 200
		});
	} catch (error) {
		console.error('Failed to add file code:', error);
		return new Response(JSON.stringify({ message: 'Failed to add file code' }), { status: 500 });
	}
};
