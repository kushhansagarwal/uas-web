import type { RequestHandler } from './$types';
import clientPromise from '$lib/mongodb';
import { verifyToken } from '$lib/verifyToken';

export const POST: RequestHandler = async ({ request }) => {
    try {
        const token = request.headers.get('Authorization')?.split(' ')[1];
        if (!token) {
            return new Response('No token provided', { status: 401 });
        }
        const email = await verifyToken(token);

        const db = await clientPromise;
        const usersCollection = db.db('website').collection('users');

        const updatedUser = await request.json();
        const userEmailToUpdate = updatedUser.email;

        const user = await usersCollection.findOne({ email: userEmailToUpdate });

        if (!user) {
            return new Response('User not found', { status: 404 });
        }

        // Check if the user is trying to edit someone with level 'president'
        if (user.level === 'President') {
            return new Response('Cannot edit user with level president', { status: 403 });
        }

        const result = await usersCollection.updateOne(
            { email: userEmailToUpdate },
            { $set: updatedUser }
        );

        if (result.modifiedCount === 1) {
            return new Response('User updated successfully', { status: 200 });
        } else {
            return new Response('Failed to update user', { status: 500 });
        }
    } catch (error) {
        console.error('Error updating user:', error);
        return new Response('Internal Server Error', { status: 500 });
    }
};
