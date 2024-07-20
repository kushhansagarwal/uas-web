import { google } from 'googleapis';
import { GOOGLE_SHEETS_API, EMAIL } from '$env/static/private';

/** @type {import('./$types').Actions} */
export const actions = {
	contact: async (event) => {
		const formData = await event.request.formData();
		const values = [];
		let researchProjects = [];

		for (const [key, value] of formData.entries()) {
			console.log(`${key}: ${value}`);
			if (key === 'research-project') {
				// Collect all research projects
				researchProjects.push(value);
			} else {
				values.push(value);
			}
		}

		// Add the comma-separated research projects to the values array
		if (researchProjects.length > 0) {
			values.push(researchProjects.join(', '));
		}

		const auth = new google.auth.GoogleAuth({
			credentials: JSON.parse(GOOGLE_SHEETS_API),
			scopes: ['https://www.googleapis.com/auth/spreadsheets']
		});

		const sheets = google.sheets({ version: 'v4', auth });

		const spreadsheetId = '1IkwNC3AsIANwCl4JnknNMqNNWGbUgu1PbXnx7WbWBYw'; // Replace with your actual spreadsheet ID
		const range = 'Interest!A:Z'; // Adjust the range as needed

		try {
			const response = await sheets.spreadsheets.values.append({
				spreadsheetId,
				range,
				valueInputOption: 'USER_ENTERED',
				requestBody: {
					values: [values]
				}
			});

			console.log('Data appended successfully:', response.data);
		} catch (error) {
			console.error('Error appending data:', error);
		}
	},

	newsletter: async (event) => {
		const formData = await event.request.formData();
		const values = [];

		const auth = new google.auth.GoogleAuth({
			credentials: JSON.parse(GOOGLE_SHEETS_API),
			scopes: ['https://www.googleapis.com/auth/spreadsheets']
		});

		const email = formData.get('email-address');
		if (email) {
			values.push(email);
		}

		const sheets = google.sheets({ version: 'v4', auth });

		const spreadsheetId = '1IkwNC3AsIANwCl4JnknNMqNNWGbUgu1PbXnx7WbWBYw'; // Replace with your actual spreadsheet ID
		const range = 'Newsletters!A:Z'; // Adjust the range as needed

		try {
			const response = await sheets.spreadsheets.values.append({
				spreadsheetId,
				range,
				valueInputOption: 'USER_ENTERED',
				requestBody: {
					values: [values]
				}
			});

			console.log('Email appended successfully:', response.data);
		} catch (error) {
			console.error('Error appending email:', error);
		}
	}
};
