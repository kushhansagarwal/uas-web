import clientPromise from '$lib/mongodb';

/** @type {import('./$types').Actions} */
export const actions = {
	contact: async (event) => {
		const formData = await event.request.formData();
		let interest = formData.getAll('interest');
		if (interest.length === 1) {
			interest = interest[0] as string;
		}

		const db = await clientPromise;
		const userCollection = db.db('website').collection('users');
		const user = await userCollection.findOne({ email: formData.get('email') });

		const data = {
			name: formData.get('name'),
			email: formData.get('email'),
			major: formData.get('major'),
			year: formData.get('year'),
			interest: interest,
			reference: formData.get('reference'),
			comments: formData.get('comments'),
			createdAt: new Date(),
			hasAccount: !!user
		};

		const collection = db.db('website').collection('interests');

		try {
			await collection.insertOne(data);

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
