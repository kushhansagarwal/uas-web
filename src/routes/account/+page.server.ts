import type { RequestEvent } from '@sveltejs/kit';

export async function load({ locals }: RequestEvent) {
	const { isAuthenticated, user, token } = locals;

	
	return {
		isAuthenticated,
		user,
		token
	};
}
