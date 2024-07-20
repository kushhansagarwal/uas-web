import type { RequestHandler } from './$types';
import { google } from 'googleapis';
import { GOOGLE_SHEETS_API } from '$env/static/private';

export const POST: RequestHandler = async ({ request }) => {
	const { email } = await request.json(); // Get email from the request body

	let credentials;
	try {
		credentials = JSON.parse(GOOGLE_SHEETS_API);
	} catch (error) {
		console.error('Error parsing SHEETS_API:', error);
		return new Response('Error parsing credentials', { status: 500 });
	}

	const auth = new google.auth.GoogleAuth({
		credentials,
		scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly']
	});

	const sheets = google.sheets({ version: 'v4', auth });

	const usersSpreadsheetId = '1IkwNC3AsIANwCl4JnknNMqNNWGbUgu1PbXnx7WbWBYw'; // Replace with your actual spreadsheet ID
	const usersRange = 'Users!A:G'; // Adjust range to include email and codes

	try {
		const userResponse = await sheets.spreadsheets.values.get({
			spreadsheetId: usersSpreadsheetId,
			range: usersRange
		});

		const userRows = userResponse.data.values || [];
		const userRow = userRows.find((row) => row[0] === email); // Find the row corresponding to the user's email

		if (!userRow) {
			return new Response('User not found', { status: 404 });
		}

		const userCodes = userRow[6].split(',').map((code: string) => code.trim()); // Split codes from column G and trim whitespace

		console.log(userCodes);

		const filesSpreadsheetId = '1IkwNC3AsIANwCl4JnknNMqNNWGbUgu1PbXnx7WbWBYw'; // Replace with your actual spreadsheet ID
		const filesRange = 'Files!A:E'; // Code column in Files sheet

		const filesResponse = await sheets.spreadsheets.values.get({
			spreadsheetId: filesSpreadsheetId,
			range: filesRange
		});

		const filesRows = filesResponse.data.values || [];
		const matchingFiles = filesRows.filter((row) => userCodes.includes(row[0])); // Filter files based on user codes

		console.log(matchingFiles);

		return new Response(
			JSON.stringify({
				userData: {
					email: email,
					givenName: userRow[1], // Assuming column B is Given Name
					familyName: userRow[2], // Assuming column C is Family Name
					level: userRow[3], // Assuming column D is Level
					privileges: userRow[4], // Assuming column E is Privileges
					created: userRow[5], // Assuming column F is Created
					files: matchingFiles
				},
				files: matchingFiles
			}),
			{
				status: 200,
				headers: {
					'Content-Type': 'application/json'
				}
			}
		);
	} catch (error) {
		console.error('Error fetching data from Google Sheets:', error);
		return new Response('Error fetching data', { status: 500 });
	}
};
