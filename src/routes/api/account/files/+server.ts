import type { RequestHandler } from './$types';
import clientPromise from '$lib/mongodb';

export const POST: RequestHandler = async ({ request }) => {
	const { email } = await request.json(); // Get email from the request body

	const db = await clientPromise;
	const usersCollection = db.db('website').collection('users');
	const filesCollection = db.db('website').collection('files');

	try {
		const user = await usersCollection.findOne({ email }); // Find the user by email

		if (!user) {
			return new Response('User not found', { status: 404 });
		}

		let matchingFiles;

		console.log(user.privileges);

		if (user.privileges === 'Admin') {
			matchingFiles = await filesCollection.find({}).toArray(); // Return all files if user is Admin
		} else {
			const userCodes = user.files;
			console.log(userCodes);
			matchingFiles = await filesCollection.find({ code: { $in: userCodes } }).toArray(); // Filter files based on user codes
		}

		console.log(matchingFiles);

		return new Response(
			JSON.stringify({
				userData: {
					email: user.email,
					givenName: user.given_name, // Assuming user document has given_name
					familyName: user.family_name, // Assuming user document has family_name
					level: user.level, // Assuming user document has level
					privileges: user.privileges, // Assuming user document has privileges
					created: user.createdAt // Assuming user document has createdAt
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
		console.error('Error fetching data from MongoDB:', error);
		return new Response('Error fetching data', { status: 500 });
	}
};
