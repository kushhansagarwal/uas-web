<script lang="ts">
	import { onMount } from 'svelte';
	import Nav from '$lib/components/Nav.svelte';
	const team1 = 'https://ik.imagekit.io/uas/team1.jpg';
	const team2 = 'https://ik.imagekit.io/uas/team2.jpg';
	const lab1 = 'https://ik.imagekit.io/uas/lab1.jpg';
	const lab2 = 'https://ik.imagekit.io/uas/lab2.jpg';
	const workshop1 = 'https://ik.imagekit.io/uas/workshop1.jpg';
	const veritasium = 'https://ik.imagekit.io/uas/veritasium.jpg';
	const aviata = 'https://ik.imagekit.io/uas/aviata.jpg';
	const spinny = 'https://ik.imagekit.io/uas/spinny.jpg';
	const flyday1 = 'https://ik.imagekit.io/uas/flyday1.jpg';
	const flyday2 = 'https://ik.imagekit.io/uas/flyday2.jpeg';

	let images: {
		url: string;
		title: string;
	}[] = [
		{
			url: team1,
			title: '2024-25 Board'
		},
		{
			url: team2,
			title: 'Flagship Drone'
		},
		{
			url: lab1,
			title: 'Assembly'
		},
		{
			url: lab2,
			title: '2024-25 Board'
		},
		{
			url: workshop1,
			title: '2024-25 Board'
		},
		{
			url: veritasium,
			title: '2024-25 Board'
		},
		{
			url: aviata,
			title: '2024-25 Board'
		},
		{
			url: spinny,
			title: '2024-25 Board'
		},
		{
			url: flyday1,
			title: '2024-25 Board'
		},
		{
			url: flyday2,
			title: '2024-25 Board'
		}
	];

	import type { PageData } from '../gallery/$types';
	import { goto } from '$app/navigation';
	import Footer from '$lib/components/Footer.svelte';

	export let data: PageData;
	let image: string | null = null;

	onMount(() => {
		if (data.isAuthenticated) {
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
	<div class="mx-auto mt-10 max-w-7xl px-5 md:flex md:items-center md:justify-between lg:px-8">
		<div class="min-w-0 flex-1">
			<h2 class="text-2xl font-bold leading-7 text-white sm:truncate sm:text-3xl sm:tracking-tight">
				Gallery
			</h2>
			<div class="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
				{#each images as image}
					<div class="group relative">
						<!-- <h1 class=" text-md text-gray-300">{image.title}</h1> -->
						<img
							class="aspect-[4/3] w-full rounded-md object-cover"
							src={image.url}
							alt={image.title}
						/>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>
