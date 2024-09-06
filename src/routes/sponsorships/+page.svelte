<script lang="ts">
	import { onMount } from 'svelte';
	import Nav from '$lib/components/Nav.svelte';
	import logo from '$lib/assets/logo.svg';

	import type { PageData } from './$types';

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
	<div class="mx-auto max-w-7xl px-5 pb-24 pt-20 sm:pb-32 lg:flex lg:px-8 lg:py-20">
		<div class="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-40">
			<img class="h-11" src={logo} alt="Your Company" />

			<h1 class="mt-5 text-4xl font-bold tracking-tight text-white sm:text-6xl">
				<span class="gradient-text">Sponsor</span> us
			</h1>
			<p class="mt-6 text-lg leading-8 text-gray-300">
				We are UCLA's premier aerial robotics team with years of experience with autonomous drones
				and planes. Our technical subteams cover various aerospace, mechanical, electrical and
				computer science disciplines. We design our frames, create and maintain software for
				communication, develop algorithms for target detection and identification, create mechanisms
				for various in-air missions and a lot more.
			</p>
		</div>
		<div class=" flex sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:flex-none xl:ml-32">
			<div class="w-full"></div>
		</div>
	</div>
	<div class="mx-auto mt-10 max-w-7xl px-5 md:flex md:items-center md:justify-between lg:px-8">
		<div class="min-w-0 flex-1">
			<h3>Sponsorship Package</h3>

			<embed
				src="src/lib/assets/UAS Sponsorship Package.pdf"
				type="application/pdf"
				width="100%"
				height="1000px"
			/>
		</div>
	</div>
</div>
