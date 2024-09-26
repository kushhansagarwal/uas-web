import type { RequestEvent } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import clientPromise from '$lib/mongodb';

export async function load({ locals, url }: RequestEvent) {
	const { isAuthenticated, user, token } = locals;

	// Check if the user is authenticated
	if (!isAuthenticated) {
		const redirectTo = encodeURIComponent(url.pathname);
		throw redirect(302, `/api/auth/register?redirectTo=${redirectTo}`); // Redirect to register page if not authenticated
	}

	const db = await clientPromise;
	const usersCollection = db.db('website').collection('users');
	const dbUser = await usersCollection.findOne({ email: user.email });

	// Check if the user is an admin
	if (!dbUser || dbUser.privileges !== 'Admin') {
		throw redirect(302, '/'); // Redirect to home page if not an admin
	}

	const interestsCollection = db.db('website').collection('interests');
	const interests = await interestsCollection.find({}).toArray();

	// Convert ObjectId and createdAt to string
	const serializableInterests = await Promise.all(interests.map(async (interest) => {
		const emailPrefix = interest.email.split('@')[0]; // Get the part before '@'
		const userWithInterest = await usersCollection.findOne({ email: { $regex: new RegExp(`^${emailPrefix}`) } });
		return {
			...interest,
			_id: interest._id.toString(),
			hasAccount: !!userWithInterest // Set hasAccount to true if the user exists in the users collection
		};
	}));

	return {
		isAuthenticated,
		user,
		token,
		isAdmin: true,
		interests: serializableInterests
	};
}