// src/hooks.server.ts
import { sessionHooks, type Handler } from '@kinde-oss/kinde-auth-sveltekit';
import type { RequestEvent } from '@sveltejs/kit';
import { kindeAuthClient, type SessionManager } from '@kinde-oss/kinde-auth-sveltekit';
import { google } from 'googleapis';
import { GOOGLE_SHEETS_API } from '$env/static/private';

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

		// Check if user exists in Google Sheets
		let credentials;
		try {
			const parseStart = Date.now();
			credentials = JSON.parse(GOOGLE_SHEETS_API);
			console.log(`Parsing GOOGLE_SHEETS_API took ${Date.now() - parseStart}ms`);
		} catch (error) {
			console.error('Error parsing SHEETS_API:', error);
		}

		const authStart = Date.now();
		const auth = new google.auth.GoogleAuth({
			credentials,
			scopes: ['https://www.googleapis.com/auth/spreadsheets']
		});
		console.log(`Google Auth setup took ${Date.now() - authStart}ms`);

		const sheets = google.sheets({ version: 'v4', auth });

		const spreadsheetId = '1IkwNC3AsIANwCl4JnknNMqNNWGbUgu1PbXnx7WbWBYw'; // Replace with your actual spreadsheet ID
		const range = 'Users!A:E'; // Adjust the range as needed

		(async () => {
			try {
				const sheetsGetStart = Date.now();
				const response = await sheets.spreadsheets.values.get({
					spreadsheetId,
					range
				});
				const sheetsCheckStart = Date.now(); // Added timing start for checking user existence
				const rows = response.data.values || [];
				const userExists = rows.some((row) => row[0] === user.email);
				console.log(`Checking user existence in Google Sheets took ${Date.now() - sheetsCheckStart}ms`); // Log time taken to check user existence

				if (!userExists) {
					// Add user to Google Sheets
					const newRow = [
						user.email,
						user.given_name,
						user.family_name,
						'General Member', // Replace with actual level
						'None', // Replace with actual privileges
						Date.now(),
                        "SLDWRKS"
					];

					const appendStart = Date.now();
					await sheets.spreadsheets.values.append({
						spreadsheetId,
						range,
						valueInputOption: 'RAW',
						requestBody: {
							values: [newRow]
						}
					});
					console.log(`Appending data to Google Sheets took ${Date.now() - appendStart}ms`);
				}
			} catch (error) {
				console.error('Error interacting with Google Sheets:', error);
			}
		})();

	}

	event.locals.isAuthenticated = isAuthenticated;
	event.locals.user = user;

	const resolveStart = Date.now();
	const response = await resolve(event);
	console.log(`Resolving event took ${Date.now() - resolveStart}ms`);
	return response;
};
