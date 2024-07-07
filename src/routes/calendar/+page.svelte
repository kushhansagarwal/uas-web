<script lang="ts">
	import { onMount } from 'svelte';
	import Nav from '$lib/components/Nav.svelte';

	let events: {
		title: string;
		id: string;
		description: string;
		date: string;
		location: string;
		image: string;
		rsvp: boolean;
	}[] = [
		{
			title: 'AIAA Drone Building',
			id: '1',
			description:
				'We would be building a drone for the AIAA competition. There are 3 teams competing and we need to decide which one we want to take home.',
			date: 'January 30, 2025',
			location: 'Boelter Hall',
			image:
				'https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZHJvbmVzfGVufDB8fDB8fHww',
			rsvp: true
		}
	];

	import type { PageData } from './$types';
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

<div class="relative isolate min-h-screen overflow-hidden bg-gray-900">
	<Nav {image} active="calendar"></Nav>
	<svg
		class="absolute inset-0 -z-10 h-full w-full stroke-white/10 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
		aria-hidden="true"
	>
		<defs>
			<pattern
				id="983e3e4c-de6d-4c3f-8d64-b9761d1534cc"
				width="200"
				height="200"
				x="50%"
				y="-1"
				patternUnits="userSpaceOnUse"
			>
				<path d="M.5 200V.5H200" fill="none" />
			</pattern>
		</defs>
		<svg x="50%" y="-1" class="overflow-visible fill-gray-800/20">
			<path
				d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
				stroke-width="0"
			/>
		</svg>
		<rect
			width="100%"
			height="100%"
			stroke-width="0"
			fill="url(#983e3e4c-de6d-4c3f-8d64-b9761d1534cc)"
		/>
	</svg>
	<div class="mx-auto mt-10 max-w-7xl px-10 md:flex md:items-center md:justify-between lg:px-8">
		<div class="min-w-0 flex-1">
			<h2 class="text-2xl font-bold leading-7 text-white sm:truncate sm:text-3xl sm:tracking-tight">
				Calendar
			</h2>

			<h3
				class="mt-5 text-xl font-bold leading-7 text-white sm:truncate sm:text-2xl sm:tracking-tight"
			>
				Upcoming events
			</h3>
			<ul
				role="list"
				class="mx-auto mt-5 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3"
			>
				{#each events as eventItem}
					<li>
						<img
							class="aspect-[3/2] w-full rounded-2xl object-cover"
							src={eventItem.image}
							alt=""
						/>
						<div>
							<h3 class="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-300">
								{eventItem.title} <span class="text-gray-400">@ {eventItem.location}</span>
							</h3>
						</div>
						<p class="text-base leading-7 text-gray-300">{eventItem.date}</p>
						<p class="mt-2 text-base leading-7 text-gray-500">{eventItem.description}</p>
						{#if eventItem.rsvp}
							<div class="mt-5">
								<a
									href="/api/auth/login"
									class="rounded-md bg-indigo-500 px-3.5 py-2.5 pt-5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
									>RSVP <span aria-hidden="true">→</span></a
								>
							</div>
						{/if}
					</li>
				{/each}
			</ul>
		</div>
	</div>
</div>
