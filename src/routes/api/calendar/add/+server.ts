import type { RequestHandler } from './$types';
import { GOOGLE_SHEETS_API } from '$env/static/private';
import clientPromise from '$lib/mongodb';
import ImageKit from "imagekit";


const imagekit = new ImageKit({
    publicKey: "public_+D6ca1yfDFZ7zP2FONap1SfPihE=",
    urlEndpoint: "https://ik.imagekit.io/wy49ay1bjy4c",
    privateKey: "private_s1WB0ijaT5ez9JdT2IViRcs1K/A="
});

export const POST: RequestHandler = async ({ request }) => {
	const start = Date.now(); // Start timing the entire process
	try {
		const credentialsStart = Date.now();
		const credentials = JSON.parse(GOOGLE_SHEETS_API);
		console.log(`Credentials parsing took ${Date.now() - credentialsStart}ms`);

		const formStart = Date.now();
		const form = await request.formData();
		console.log(`Form data retrieval took ${Date.now() - formStart}ms`);

		const file = form.get('file') as File;
		const title = form.get('title') as string;
		const date = form.get('date') as string;
		const description = form.get('description') as string;
		const location = form.get('location') as string;
		const rsvp = form.get('rsvp') === 'true';

		if (!file) {
			throw new Error('No file uploaded');
		}

		const bufferStart = Date.now();
		const buffer = await file.arrayBuffer();
		console.log(`File buffer creation took ${Date.now() - bufferStart}ms`);

		const uploadStart = Date.now();
		const uploadResult = await imagekit.upload({
			file: Buffer.from(buffer), // required
			fileName: file.name, // required
			tags: ["tag1"]
		});
		console.log(`File upload took ${Date.now() - uploadStart}ms`);
		console.log('File URL:', uploadResult.url);

		// Save the file information and other details to MongoDB
		const dbStart = Date.now();
		const db = await clientPromise;
		const filesCollection = db.db('website').collection('events');

		const result = await filesCollection.insertOne({
			title,
			description,
			fileId: uploadResult.fileId,
			fileName: file.name,
			fileType: file.type,
			date: new Date(),
			image: uploadResult.url,
			location,
			rsvp
		});

		const insertedObject = await filesCollection.findOne({ _id: result.insertedId });
		console.log(`Database insertion took ${Date.now() - dbStart}ms`);

		const headers = new Headers();
		headers.set('Access-Control-Allow-Origin', '*');
		headers.set('Access-Control-Allow-Methods', 'POST');
		headers.set('Access-Control-Allow-Headers', 'Content-Type');

		console.log(`Total processing time: ${Date.now() - start}ms`);
		return new Response(JSON.stringify(insertedObject), { status: 200, headers });
	} catch (error) {
		console.error('Error uploading file:', error);

		const headers = new Headers();
		headers.set('Access-Control-Allow-Origin', '*');
		headers.set('Access-Control-Allow-Methods', 'POST');
		headers.set('Access-Control-Allow-Headers', 'Content-Type');

		return new Response(JSON.stringify({ error: 'Error uploading file' }), {
			status: 500,
			headers
		});
	}
};
