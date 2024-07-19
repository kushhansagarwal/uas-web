<script lang="ts">
	import { onMount } from 'svelte';
	import Nav from '$lib/components/Nav.svelte';
	import type { PageData } from '../gallery/$types';
	import { goto } from '$app/navigation';
	import Footer from '$lib/components/Footer.svelte';

	export let data: PageData;
	let image: string | null = null;

	const gallery: Record<string, string[]> | undefined= data.gallery;

	onMount(() => {
		console.log(data);

		if (data.isAuthenticated) {
			image = data.user.picture;
		}
	});
</script>

<div class="relative isolate min-h-screen overflow-hidden bg-gray-900">
	<Nav {image} active="gallery"></Nav>
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
			{#each Object.entries(gallery || {}) as [category, images]}
				<h3 class="mt-5 text-xl font-bold leading-7 text-white sm:truncate sm:text-2xl sm:tracking-tight">
					{category}
				</h3>
				<div class="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
					{#each images as image}
						<div class="group relative">
							<img
								class="aspect-[4/3] w-full rounded-md object-cover"
								src={image}
								alt={category}
							/>
						</div>
					{/each}
				</div>
			{/each}
		</div>
	</div>
</div>
