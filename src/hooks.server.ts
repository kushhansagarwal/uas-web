// src/hooks.server.ts
import { sessionHooks, type Handler } from '@kinde-oss/kinde-auth-sveltekit';
import type { RequestEvent } from '@sveltejs/kit';
import { kindeAuthClient, type SessionManager } from '@kinde-oss/kinde-auth-sveltekit';
import clientPromise from './lib/mongodb';

export const handle: Handler = async ({ event, resolve }) => {
	const start = Date.now();
	sessionHooks({ event });
	console.log(`Session hooks took ${Date.now() - start}ms`);

	const authStart = Date.now();
	const isAuthenticated = await kindeAuthClient.isAuthenticated(
		event.request as unknown as SessionManager
	);
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
				files: ['SLDWRKS']
			};

			const insertStart = Date.now();
			await usersCollection.insertOne(newUser);
			console.log(`Inserting user into MongoDB took ${Date.now() - insertStart}ms`);
		}
	}

	event.locals.isAuthenticated = isAuthenticated;
	event.locals.user = user;

	const resolveStart = Date.now();
	const response = await resolve(event);
	console.log(`Resolving event took ${Date.now() - resolveStart}ms`);
	return response;
};
