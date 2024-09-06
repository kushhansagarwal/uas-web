import type { RequestEvent } from '@sveltejs/kit';

export async function load({ locals, params }: RequestEvent) {
	const { isAuthenticated, user } = locals;
	const { code } = params;

	console.log(code);

	return {
		isAuthenticated,
		user,
		code
	};
}
