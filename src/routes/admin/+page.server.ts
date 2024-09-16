import type { RequestEvent } from '@sveltejs/kit';
import clientPromise from '$lib/mongodb';

export async function load({ locals, url }: RequestEvent) {
	const { isAuthenticated, user, token } = locals;

	const isAdmin = user.email === 'kushhansagarwal@gmail.com';

	let allUsers: any[] = [];
	if (isAdmin) {
		const db = await clientPromise;
		const usersCollection = db.db('website').collection('users');
		allUsers = await usersCollection.find({}).project({ _id: 0 }).toArray();
	}

	// console.log(isAdmin);

	return {
		isAuthenticated,
		user,
		token,
		isAdmin,
		allUsers
	};
}
