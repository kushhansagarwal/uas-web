import type { RequestEvent } from '@sveltejs/kit';

export async function load({ locals }: RequestEvent) {
	const { isAuthenticated, user } = locals;

	return {
		isAuthenticated,
		user
	};
}
