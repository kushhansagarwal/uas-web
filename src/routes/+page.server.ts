import clientPromise from '$lib/mongodb';

/** @type {import('./$types').Actions} */
export const actions = {
	contact: async (event) => {
		const formData = await event.request.formData();
		const values = [];
		let researchProjects = [];

		for (const [key, value] of formData.entries()) {
			if (key === 'research-project') {
				researchProjects.push(value);
			} else {
				values.push(value);
			}
		}

		if (researchProjects.length > 0) {
			values.push(researchProjects.join(', '));
		}

		const db = await clientPromise;
		const collection = db.db('website').collection('interests');

		try {
			const email = values[1]; // Assuming the email is the second value in the array
			const userCollection = db.db('website').collection('users'); // Assuming there's a users collection
			const user = await userCollection.findOne({ email: email });

			await collection.insertOne({
				data: values,
				createdAt: new Date()
			});

			if (user) {
				return { success: true, message: 'Your account has been updated with this information!' };
			} else {
				return { success: true, message: 'Thank you for filling out the form! Make a new account <a class="text-indigo-500" href="/api/auth/register">here</a>!' };
			}
		} catch (error) {
			console.error('Error inserting data:', error);
			return { success: false, message: 'We encountered an issue while processing your submission. Please try again later.' };
		}
	},

	newsletter: async (event) => {
		const formData = await event.request.formData();
		const email = formData.get('email-address');

		if (!email) {
			return { success: false, message: 'Email address is required.' };
		}

		const db = await clientPromise;
		const collection = db.db('website').collection('newsletters');

		try {
			await collection.insertOne({
				email: email,
				createdAt: new Date()
			});
			return { success: true, message: 'Thank you for subscribing to our newsletter!' };
		} catch (error) {
			console.error('Error inserting email:', error);
			return { success: false, message: 'We encountered an issue while processing your subscription. Please try again later.' };
		}
	}
};
