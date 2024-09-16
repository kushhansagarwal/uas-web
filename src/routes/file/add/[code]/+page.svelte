<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';

	export let data: PageData;

	onMount(async () => {
		const { isAuthenticated, user, code } = data;

		if (!isAuthenticated) {
            localStorage.setItem("file_code", code || "");
			goto('/api/auth/login');
		} else {

            // console.log("logged in now, adding gile with code", code);
            
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

<div class="flex flex-col items-center justify-center h-screen">

    <div class="flex flex-col items-center justify-center">
        <h1 class="text-2xl font-bold">Adding file...</h1>
		<p class="text-gray-500">This may take a few seconds...</p>
	</div>
</div>