// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
		interface Locals {
			isAuthenticated: boolean;
			user: {
				family_name: string;
				given_name: string;
				picture: string | null;
				email: string;
				id: string;
			};
		}
	}
}

export {};