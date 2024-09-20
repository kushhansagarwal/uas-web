import type { RequestEvent } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

export async function load({ locals }: RequestEvent) {
	const { isAuthenticated, user, token } = locals;

	if (!isAuthenticated) {
		throw redirect(302, '/api/auth/register');
	}
	return {
		isAuthenticated,
		user,
		token
	};
}
