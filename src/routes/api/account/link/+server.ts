import type { RequestHandler } from './$types';
import { GOOGLE_SHEETS_API } from '$env/static/private';
import clientPromise from '$lib/mongodb';
import { verifyToken } from '$lib/verifyToken';

export const POST: RequestHandler = async ({ request }) => {
	const start = Date.now(); // Start timing the entire process
	try {
		const token = request.headers.get('Authorization')?.split(' ')[1];
		if (!token) {
			throw new Error('No token provided');
		}
		const email = await verifyToken(token);

		const db = await clientPromise;
		const usersCollection = db.db('website').collection('users');
		const user = await usersCollection.findOne({ email });

		if (!user) {
			throw new Error('User not found');
		}

		const credentialsStart = Date.now();
		const credentials = JSON.parse(GOOGLE_SHEETS_API);
		// console.log(`Credentials parsing took ${Date.now() - credentialsStart}ms`);

		const formStart = Date.now();
		const form = await request.formData();
		// console.log(`Form data retrieval took ${Date.now() - formStart}ms`);

		const link = form.get('link') as string;
		const title = form.get('title') as string;
		const date = form.get('date') as string;
		const publicFlag = form.get('public') as string;
		const code = form.get('code') as string;
		const description = form.get('description') as string;

		if (!link) {
			throw new Error('No link provided');
		}

		// Save the link information and other details to MongoDB
		const dbStart = Date.now();
        
		const linksCollection = db.db('website').collection('links');
		await linksCollection.insertOne({
			title,
			description,
			code,
			link,
			public: publicFlag,
			date: new Date()
		});
		// console.log(`Database insertion took ${Date.now() - dbStart}ms`);

		const headers = new Headers();
		headers.set('Access-Control-Allow-Origin', '*');
		headers.set('Access-Control-Allow-Methods', 'POST');
		headers.set('Access-Control-Allow-Headers', 'Content-Type');

		// console.log(`Total processing time: ${Date.now() - start}ms`);
		return new Response('Link uploaded and data saved successfully', { status: 200, headers });
	} catch (error) {
		console.error('Error uploading link:', error);

		const headers = new Headers();
		headers.set('Access-Control-Allow-Origin', '*');
		headers.set('Access-Control-Allow-Methods', 'POST');
		headers.set('Access-Control-Allow-Headers', 'Content-Type');

		return new Response('Error uploading link', { status: 500, headers });
	}
};
