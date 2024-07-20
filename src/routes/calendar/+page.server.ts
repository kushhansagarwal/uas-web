import { GOOGLE_SHEETS_API } from '$env/static/private';
import type { PageServerLoad } from './$types';
import { google } from 'googleapis';


export const load = (async () => {
	let credentials;
	try {
		credentials = JSON.parse(GOOGLE_SHEETS_API);
		
	} catch (error) {
		console.error('Error parsing SHEETS_API:', error);
		return { events: [] };
	}

	const auth = new google.auth.GoogleAuth({
		credentials,
		scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly']
	});

	const sheets = google.sheets({ version: 'v4', auth });

	const spreadsheetId = '1IkwNC3AsIANwCl4JnknNMqNNWGbUgu1PbXnx7WbWBYw'; // Replace with your actual spreadsheet ID
	const range = 'Calendar!A:G'; // Adjust the range as needed

	try {
		const response = await sheets.spreadsheets.values.get({
			spreadsheetId,
			range
		});

		const rows = response.data.values || [];
		const events = rows.slice(1).map((row) => ({
			id: row[0],
			title: row[1],
			description: row[2],
			date: row[3],
			location: row[4],
			image: row[5],
			rsvp: row[6] === 'TRUE'
		}));

		return { events };
	} catch (error) {
		console.error('Error fetching data:', error);
		return { events: [] };
	}
}) satisfies PageServerLoad;