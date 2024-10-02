import type { RequestHandler } from './$types';
import clientPromise from '$lib/mongodb';
import { verifyToken } from '$lib/verifyToken';

export const POST: RequestHandler = async ({ request }) => {
    const token = request.headers.get('Authorization')?.split(' ')[1];
    if (!token) {
        return new Response('Unauthorized', { status: 401 });
    }

    const email = await verifyToken(token);

    const { subteam } = await request.json();

    if (!subteam) {
        return new Response('Subteam is required', { status: 400 });
    }

    try {
        const db = await clientPromise;
        const usersCollection = db.db('website').collection('users');



        const result = await usersCollection.updateOne(
            { email },
            { $set: { subteam } }
        );

        return new Response('Subteam added successfully', { status: 200 });
    } catch (error) {
        console.error('Error adding subteam:', error);
        return new Response('Internal Server Error', { status: 500 });
    }
};