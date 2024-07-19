<script lang="ts">
	import Nav from '$lib/components/Nav.svelte';

	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	export let data: PageData;
	let image: string | null = null;

	onMount(() => {
		if (!data.isAuthenticated) {
			goto('/api/auth/login');
		} else {
			image = data.user.picture;
		}
	});
</script>



<Nav {image}></Nav>
<section class="mx-auto min-h-screen max-w-7xl px-5 lg:px-8">
	<div class="mt-10 md:flex md:items-center md:justify-between">
		<div class="min-w-0 flex-1">
			<h2 class="text-2xl font-bold leading-7 text-white sm:truncate sm:text-3xl sm:tracking-tight">
				Welcome <span class="gradient-text">{data.user.given_name}</span>,
			</h2>
			<p class="mt-2 text-gray-400">
				This is your UAS@UCLA dashboard. Here you can manage your account settings and view your
				progress.
			</p>
		</div>
	</div>
	<div class="grid lg:grid-cols-4 mt-5">
		<div class="bg-gray-800 rounded-xl p-5">
			<p class="font-bold">Account Settings</p>
			<p class="text-gray-400">
				Here you can manage your account settings.
			</p>
		<div class="mt-5">
			<p class="font-bold">Email:</p>
			<p class="text-gray-400">{data.user.email}</p>
		</div>
		<div class="mt-5">
			<p class="font-bold">Date Joined:</p>
			<p class="text-gray-400">{data.user.dateJoined}</p>
		</div>
		<div class="mt-5">
			<p class="font-bold">Level:</p>
			<p class="text-gray-400">{data.user.level}</p>
		</div>
		<div class="mt-5">
			<p class="font-bold">Privileges:</p>
			<p class="text-gray-400">{data.user.privileges}</p>
		</div>
		</div>
	</div>
</section>
