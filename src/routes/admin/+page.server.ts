import type { RequestEvent } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';
import clientPromise from '$lib/mongodb';

export async function load({ locals, url }: RequestEvent) {
	const { isAuthenticated, user, token } = locals;

	// Check if the user is authenticated
	if (!isAuthenticated) {
		throw redirect(302, '/api/auth/register'); // Redirect to register page if not authenticated
	}

	const isAdmin = user.email === 'kushhansagarwal@gmail.com';

	// Check if the user is an admin
	if (!isAdmin) {
		throw redirect(302, '/'); // Redirect to home page if not an admin
	}

	const db = await clientPromise;
	const usersCollection = db.db('website').collection('users');
	const allUsers = await usersCollection.find({}).project({ _id: 0 }).toArray();

	return {
		isAuthenticated,
		user,
		token,
		isAdmin,
		allUsers
	};
}