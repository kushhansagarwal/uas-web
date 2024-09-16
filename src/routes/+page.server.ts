import clientPromise from '$lib/mongodb';

/** @type {import('./$types').Actions} */
export const actions = {
	contact: async (event) => {
		const formData = await event.request.formData();
		const values = [];
		let researchProjects = [];

		for (const [key, value] of formData.entries()) {
			// console.log(`${key}: ${value}`);
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

		const db = await clientPromise;
		const collection = db.db('website').collection('interests');

		try {
			const result = await collection.insertOne({
				data: values,
				createdAt: new Date()
			});
			// console.log('Data inserted successfully:', result);
		} catch (error) {
			console.error('Error inserting data:', error);
		}
	},

	newsletter: async (event) => {
		const formData = await event.request.formData();
		const values = [];

		const email = formData.get('email-address');
		if (email) {
			values.push(email);
		}

		const db = await clientPromise;
		const collection = db.db('website').collection('newsletters');

		try {
			const result = await collection.insertOne({
				email: values[0],
				createdAt: new Date()
			});
			// console.log('Email inserted successfully:', result);
		} catch (error) {
			console.error('Error inserting email:', error);
		}
	}
};
