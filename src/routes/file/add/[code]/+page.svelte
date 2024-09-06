<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';

	export let data: PageData;

	onMount(async () => {
		const { isAuthenticated, user, code } = data;

		if (!isAuthenticated) {
			goto('/api/auth/login');
		} else {
			// Append code to user's files array in MongoDB
			const response = await fetch('/api/account/files/add', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ email: user.email, code })
			});

			if (response.ok) {
				// Redirect to /account
				goto('/account');
			} else {
				// Handle error
				console.error('Failed to add file code');
			}
		}
	});
</script>

<!-- Optionally, you can add some loading or error handling UI here -->
