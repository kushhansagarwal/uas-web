import type { RequestHandler } from './$types';
import { GoogleAuth } from 'google-auth-library';
import { google } from 'googleapis';
import fs from 'fs';
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

		const isAdmin = user.email === 'kushhansagarwal@gmail.com';
		if (!isAdmin) {
			throw new Error('User does not have admin privileges');
		}

		const credentialsStart = Date.now();
		const credentials = JSON.parse(GOOGLE_SHEETS_API);
		console.log(`Credentials parsing took ${Date.now() - credentialsStart}ms`);

		const formStart = Date.now();
		const form = await request.formData();
		console.log(`Form data retrieval took ${Date.now() - formStart}ms`);

		const file = form.get('file') as File;
		const title = form.get('title') as string;
		const date = form.get('date') as string;
		const code = form.get('code') as string;
		const description = form.get('description') as string;

		if (!file) {
			throw new Error('No file uploaded');
		}

		const tempFilePath = `/tmp/${file.name}`;
		const bufferStart = Date.now();
		const buffer = await file.arrayBuffer();
		fs.writeFileSync(tempFilePath, Buffer.from(buffer));
		console.log(`File writing took ${Date.now() - bufferStart}ms`);

		const authStart = Date.now();
		const auth = new GoogleAuth({
			credentials,
			scopes: 'https://www.googleapis.com/auth/drive'
		});
		console.log(`Authentication setup took ${Date.now() - authStart}ms`);

		const serviceStart = Date.now();
		const service = google.drive({ version: 'v3', auth });
		console.log(`Google Drive service initialization took ${Date.now() - serviceStart}ms`);

		const requestBody = {
			name: file.name,
			parents: ['13CQtuDDYaomYlbnGRvZtG3NrFaq0lrEJ'],
			fields: 'id'
		};
		const media = {
			mimeType: file.type,
			body: fs.createReadStream(tempFilePath)
		};

		const uploadStart = Date.now();
		const uploadedFile = await service.files.create({
			requestBody,
			media: media
		});
		console.log(`File upload took ${Date.now() - uploadStart}ms`);
		console.log('File Id:', uploadedFile.data.id);

		// Save the file information and other details to MongoDB
		const dbStart = Date.now();
		const filesCollection = db.db('website').collection('files');
		await filesCollection.insertOne({
			title,
			description,
			code,
			fileId: uploadedFile.data.id,
			fileName: file.name,
			fileType: file.type,
			date: new Date()
		});
		console.log(`Database insertion took ${Date.now() - dbStart}ms`);

		const headers = new Headers();
		headers.set('Access-Control-Allow-Origin', '*');
		headers.set('Access-Control-Allow-Methods', 'POST');
		headers.set('Access-Control-Allow-Headers', 'Content-Type');

		console.log(`Total processing time: ${Date.now() - start}ms`);
		return new Response('File uploaded and data saved successfully', { status: 200, headers });
	} catch (error) {
		console.error('Error uploading file:', error);

		const headers = new Headers();
		headers.set('Access-Control-Allow-Origin', '*');
		headers.set('Access-Control-Allow-Methods', 'POST');
		headers.set('Access-Control-Allow-Headers', 'Content-Type');

		return new Response('Error uploading file', { status: 500, headers });
	}
};
