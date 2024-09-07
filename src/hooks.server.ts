// src/hooks.server.ts
import { sessionHooks, type Handler } from '@kinde-oss/kinde-auth-sveltekit';
import type { RequestEvent } from '@sveltejs/kit';
import { kindeAuthClient, type SessionManager } from '@kinde-oss/kinde-auth-sveltekit';
import clientPromise from './lib/mongodb';
import { GOOGLE_SHEETS_API, SENDGRID } from '$env/static/private';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(SENDGRID);

export const handle: Handler = async ({ event, resolve }) => {
	const start = Date.now();
	sessionHooks({ event });
	console.log(`Session hooks took ${Date.now() - start}ms`);

	const authStart = Date.now();
	const isAuthenticated = await kindeAuthClient.isAuthenticated(
		event.request as unknown as SessionManager
	);
	let token = '';
	console.log(`Authentication check took ${Date.now() - authStart}ms`);

	let user = {
		family_name: '',
		given_name: '',
		picture: null as string | null,
		email: '',
		id: ''
	};

	if (isAuthenticated) {
		const userFetchStart = Date.now();
		user = await kindeAuthClient.getUser(event.request as unknown as SessionManager);
		token = await kindeAuthClient.getToken(event.request as unknown as SessionManager);
		console.log(`Fetching user took ${Date.now() - userFetchStart}ms`);

		const db = await clientPromise;
		const usersCollection = db.db('website').collection('users');

		const existingUser = await usersCollection.findOne({ email: user.email });

		if (!existingUser) {
			const newUser = {
				email: user.email,
				given_name: user.given_name,
				family_name: user.family_name,
				level: 'General Member', // Replace with actual level
				privileges: 'None', // Replace with actual privileges
				createdAt: new Date(),
				files: []
			};

			const msg = {
				to: user.email,
				from: {
					email: 'uas@g.ucla.edu',
					name: 'UAS @ UCLA'
				},
				subject: 'UAS @ UCLA',
				templateId: 'd-4cbb9a79f02346358539151afbda6f4d'
			};
			await sgMail.send(msg);

			const insertStart = Date.now();
			await usersCollection.insertOne(newUser);
			console.log(`Inserting user into MongoDB took ${Date.now() - insertStart}ms`);
		}
	}

	event.locals.isAuthenticated = isAuthenticated;
	event.locals.user = user;
	event.locals.token = token;

	const resolveStart = Date.now();
	const response = await resolve(event);
	console.log(`Resolving event took ${Date.now() - resolveStart}ms`);
	return response;
};
