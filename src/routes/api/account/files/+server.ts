import type { RequestHandler } from './$types';
import clientPromise from '$lib/mongodb';
import { verifyToken } from '$lib/verifyToken';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const token = request.headers.get('Authorization')?.split(' ')[1];
		if (!token) {
			throw new Error('No token provided');
		}
		const email = await verifyToken(token);

		const db = await clientPromise;
		const filesCollection = db.db('website').collection('files');

		let user;
		let matchingFiles;

		const usersCollection = db.db('website').collection('users');
		user = await usersCollection.findOne({ email }); // Find the user by email

		if (!user) {
			return new Response('User not found', { status: 404 });
		}

		const linksCollection = db.db('website').collection('links');
		const links = await linksCollection.find({ public: true }).toArray();

		// console.log(user.privileges);

		if (user.privileges === 'Admin') {
			const allUsers = await usersCollection.find({}).toArray(); // Return all users if user is Admin
			matchingFiles = await filesCollection.find({}).toArray(); // Return all files if user is Admin

			return new Response(
				JSON.stringify({
					userData: {
						email: user.email,
						givenName: user.given_name, // Assuming user document has given_name
						familyName: user.family_name, // Assuming user document has family_name
						level: user.level, // Assuming user document has level
						privileges: user.privileges, // Assuming user document has privileges
						created: user.createdAt, // Assuming user document has createdAt
						subteam: user.subteam
					},
					// users: allUsers,
					files: matchingFiles,
					links: links
				}),
				{
					status: 200,
					headers: {
						'Content-Type': 'application/json'
					}
				}
			);
		} else {
			const userCodes = user.files;
			// console.log(userCodes);
			matchingFiles = await filesCollection.find({ code: { $in: userCodes } }).toArray(); // Filter files based on user codes

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
					files: matchingFiles,
					links: links
				}),
				{
					status: 200,
					headers: {
						'Content-Type': 'application/json'
					}
				}
			);
		}
	} catch (error) {
		console.error('Error fetching data from MongoDB:', error);
		return new Response('Error fetching data', { status: 500 });
	}
};
