<script lang="ts">
	import Footer from './../../lib/components/Footer.svelte';
	import logo from '$lib/assets/logo.svg';
	import bp4 from '$lib/assets/bp-4.svg';
	import bp5 from '$lib/assets/bp-5.svg';
	import bp6 from '$lib/assets/bp-6.svg';
	import bp7 from '$lib/assets/bp-7.svg';
	import { onMount } from 'svelte';
	import Nav from '$lib/components/Nav.svelte';

	let words = ['innovate', 'cutting-edge', 'meaningful'];
	let currentWordIndex = 0;
	let changingText = words[currentWordIndex];
	let displayText = '';

	function typeWriterEffect() {
		let typingSpeed = 80; // milliseconds

		function type() {
			let word = words[currentWordIndex];
			let i = 0;

			function typeChar() {
				if (i < word.length) {
					displayText += word.charAt(i);
					changingText = displayText;
					i++;
					setTimeout(typeChar, typingSpeed);
				} else {
					setTimeout(erase, 2000); // wait 2 seconds before erasing
				}
			}

			function erase() {
				if (i >= 0) {
					displayText = word.substring(0, i);
					changingText = displayText;
					i--;
					setTimeout(erase, typingSpeed);
				} else {
					currentWordIndex = (currentWordIndex + 1) % words.length;
					setTimeout(type, 500); // wait 0.5 seconds before typing the next word
				}
			}

			typeChar();
		}

		type();
	}

	import type { PageData } from './$types';
	export let data: PageData;
	let image: string | null = null;

	onMount(() => {
		typeWriterEffect();

		if (data.isAuthenticated) {
			image = data.user.picture;
		}
	});
</script>


<div class="relative isolate overflow-hidden bg-gray-900">
	<Nav {image} active="research"></Nav>
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
	<div
		class="absolute left-[calc(50%-4rem)] top-10 -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)]"
		aria-hidden="true"
	>
		<div
			class="aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-20"
			style="clip-path: polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)"
		></div>
	</div>
	<div class="mx-auto max-w-7xl px-5 pb-24 pt-20 sm:pb-32 lg:flex lg:px-8 lg:py-20">
		<div class="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-40">
			<img class="h-11" src={logo} alt="Your Company" />

			<h1 class="mt-5 text-4xl font-bold tracking-tight text-white sm:text-6xl">
				Engage in <span class="gradient-text">{displayText}</span> research
			</h1>
			<p class="mt-6 text-lg leading-8 text-gray-300">
				At UAS@UCLA, our research projects are at the heart of our mission to advance drone technology and provide unparalleled hands-on experience to our members. Our projects are designed to foster innovation, practical applications, and interdisciplinary collaboration, creating a dynamic environment where students can explore cutting-edge technology and its real-world applications.

			</p>
		</div>
		<div
			class="mx-auto flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32"
		>
			<div class="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
				<img
					src={bp4}
					alt="App screenshot"
					width="2432"
					height="1442"
					class="w-[76rem] rounded-md"
				/>
			</div>
		</div>
	</div>
</div>
<div id="solarplane" class="bg-gray-900 pb-24">
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<div class="mx-auto max-w-5xl sm:text-center">
			<h2 class="text-base font-semibold leading-7 text-indigo-400">
				For Mechanical & Electrical Engineering Majors
			</h2>
			<p class="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">Solar Plane</p>
			<p class="mt-6 text-lg leading-8 text-gray-300">
				This project involves research into the development of solar-powered planes, aimed at
				exploring sustainable aviation solutions. The team will work on optimizing the efficiency of
				solar energy utilization in flight, including the design and integration of solar panels,
				energy storage systems, and lightweight structures. Participants will gain hands-on
				experience in aerodynamics, renewable energy technologies, and environmental impact
				assessment, contributing to the advancement of green aviation.
			</p>
		</div>
	</div>
	<div class="relative overflow-hidden pt-16">
		<div class="mx-auto max-w-7xl px-6 lg:px-8">
			<img src={bp5} alt="App screenshot" class="mb-[-12%]" width="2432" height="1442" />
			<div class="relative" aria-hidden="true">
				<div class="absolute -inset-x-20 bottom-0 bg-gradient-to-t from-gray-900 pt-[7%]"></div>
			</div>
		</div>
	</div>
	<div class="mx-auto mt-16 max-w-7xl px-6 sm:mt-20 md:mt-24 lg:px-8">
		<dl
			class="mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 text-base leading-7 text-gray-300 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16"
		>
			<div class="relative pl-9">
				<dt class="inline font-semibold text-white">
					<svg
						class="absolute left-1 top-1 h-5 w-5 text-indigo-500"
						viewBox="0 0 20 20"
						fill="currentColor"
						aria-hidden="true"
					>
						<path
							fill-rule="evenodd"
							d="M5.5 17a4.5 4.5 0 01-1.44-8.765 4.5 4.5 0 018.302-3.046 3.5 3.5 0 014.504 4.272A4 4 0 0115 17H5.5zm3.75-2.75a.75.75 0 001.5 0V9.66l1.95 2.1a.75.75 0 101.1-1.02l-3.25-3.5a.75.75 0 00-1.1 0l-3.25 3.5a.75.75 0 101.1 1.02l1.95-2.1v4.59z"
							clip-rule="evenodd"
						/>
					</svg>
					Push to deploy.
				</dt>
				<dd class="inline">
					Lorem ipsum, dolor sit amet consectetur adipisicing elit aute id magna.
				</dd>
			</div>
			<div class="relative pl-9">
				<dt class="inline font-semibold text-white">
					<svg
						class="absolute left-1 top-1 h-5 w-5 text-indigo-500"
						viewBox="0 0 20 20"
						fill="currentColor"
						aria-hidden="true"
					>
						<path
							fill-rule="evenodd"
							d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
							clip-rule="evenodd"
						/>
					</svg>
					SSL certificates.
				</dt>
				<dd class="inline">
					Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.
				</dd>
			</div>
			<div class="relative pl-9">
				<dt class="inline font-semibold text-white">
					<svg
						class="absolute left-1 top-1 h-5 w-5 text-indigo-500"
						viewBox="0 0 20 20"
						fill="currentColor"
						aria-hidden="true"
					>
						<path
							fill-rule="evenodd"
							d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H3.989a.75.75 0 00-.75.75v4.242a.75.75 0 001.5 0v-2.43l.31.31a7 7 0 0011.712-3.138.75.75 0 00-1.449-.39zm1.23-3.723a.75.75 0 00.219-.53V2.929a.75.75 0 00-1.5 0V5.36l-.31-.31A7 7 0 003.239 8.188a.75.75 0 101.448.389A5.5 5.5 0 0113.89 6.11l.311.31h-2.432a.75.75 0 000 1.5h4.243a.75.75 0 00.53-.219z"
							clip-rule="evenodd"
						/>
					</svg>
					Simple queues.
				</dt>
				<dd class="inline">Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus.</dd>
			</div>
			<div class="relative pl-9">
				<dt class="inline font-semibold text-white">
					<svg
						class="absolute left-1 top-1 h-5 w-5 text-indigo-500"
						viewBox="0 0 20 20"
						fill="currentColor"
						aria-hidden="true"
					>
						<path
							fill-rule="evenodd"
							d="M10 2.5c-1.31 0-2.526.386-3.546 1.051a.75.75 0 01-.82-1.256A8 8 0 0118 9a22.47 22.47 0 01-1.228 7.351.75.75 0 11-1.417-.49A20.97 20.97 0 0016.5 9 6.5 6.5 0 0010 2.5zM4.333 4.416a.75.75 0 01.218 1.038A6.466 6.466 0 003.5 9a7.966 7.966 0 01-1.293 4.362.75.75 0 01-1.257-.819A6.466 6.466 0 002 9c0-1.61.476-3.11 1.295-4.365a.75.75 0 011.038-.219zM10 6.12a3 3 0 00-3.001 3.041 11.455 11.455 0 01-2.697 7.24.75.75 0 01-1.148-.965A9.957 9.957 0 005.5 9c0-.028.002-.055.004-.082a4.5 4.5 0 018.996.084V9.15l-.005.297a.75.75 0 11-1.5-.034c.003-.11.004-.219.005-.328a3 3 0 00-3-2.965zm0 2.13a.75.75 0 01.75.75c0 3.51-1.187 6.745-3.181 9.323a.75.75 0 11-1.186-.918A13.687 13.687 0 009.25 9a.75.75 0 01.75-.75zm3.529 3.698a.75.75 0 01.584.885 18.883 18.883 0 01-2.257 5.84.75.75 0 11-1.29-.764 17.386 17.386 0 002.078-5.377.75.75 0 01.885-.584z"
							clip-rule="evenodd"
						/>
					</svg>
					Advanced security.
				</dt>
				<dd class="inline">
					Lorem ipsum, dolor sit amet consectetur adipisicing elit aute id magna.
				</dd>
			</div>
			<div class="relative pl-9">
				<dt class="inline font-semibold text-white">
					<svg
						class="absolute left-1 top-1 h-5 w-5 text-indigo-500"
						viewBox="0 0 20 20"
						fill="currentColor"
						aria-hidden="true"
					>
						<path
							fill-rule="evenodd"
							d="M7.84 1.804A1 1 0 018.82 1h2.36a1 1 0 01.98.804l.331 1.652a6.993 6.993 0 011.929 1.115l1.598-.54a1 1 0 011.186.447l1.18 2.044a1 1 0 01-.205 1.251l-1.267 1.113a7.047 7.047 0 010 2.228l1.267 1.113a1 1 0 01.206 1.25l-1.18 2.045a1 1 0 01-1.187.447l-1.598-.54a6.993 6.993 0 01-1.929 1.115l-.33 1.652a1 1 0 01-.98.804H8.82a1 1 0 01-.98-.804l-.331-1.652a6.993 6.993 0 01-1.929-1.115l-1.598.54a1 1 0 01-1.186-.447l-1.18-2.044a1 1 0 01.205-1.251l1.267-1.114a7.05 7.05 0 010-2.227L1.821 7.773a1 1 0 01-.206-1.25l1.18-2.045a1 1 0 011.187-.447l1.598.54A6.993 6.993 0 017.51 3.456l.33-1.652zM10 13a3 3 0 100-6 3 3 0 000 6z"
							clip-rule="evenodd"
						/>
					</svg>
					Powerful API.
				</dt>
				<dd class="inline">
					Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.
				</dd>
			</div>
			<div class="relative pl-9">
				<dt class="inline font-semibold text-white">
					<svg
						class="absolute left-1 top-1 h-5 w-5 text-indigo-500"
						viewBox="0 0 20 20"
						fill="currentColor"
						aria-hidden="true"
					>
						<path
							d="M4.632 3.533A2 2 0 016.577 2h6.846a2 2 0 011.945 1.533l1.976 8.234A3.489 3.489 0 0016 11.5H4c-.476 0-.93.095-1.344.267l1.976-8.234z"
						/>
						<path
							fill-rule="evenodd"
							d="M4 13a2 2 0 100 4h12a2 2 0 100-4H4zm11.24 2a.75.75 0 01.75-.75H16a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75h-.01a.75.75 0 01-.75-.75V15zm-2.25-.75a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75H13a.75.75 0 00.75-.75V15a.75.75 0 00-.75-.75h-.01z"
							clip-rule="evenodd"
						/>
					</svg>
					Database backups.
				</dt>
				<dd class="inline">Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus.</dd>
			</div>
		</dl>
	</div>
</div>

<div id="3dmapping" class="bg-gray-900 pb-24">
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<div class="mx-auto max-w-5xl sm:text-center">
			<h2 class="text-base font-semibold leading-7 text-indigo-400">For Computer Science Majors</h2>
			<p class="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">3D Mapping</p>
			<p class="mt-6 text-lg leading-8 text-gray-300">
				Focused primarily on Computer Science majors, this project aims to develop sophisticated
				software and vision systems for 3D mapping using automated drones. The goal is to create
				accurate and detailed 3D models of various terrains and environments. Team members will work
				on algorithms for data collection, processing, and visualization, as well as drone
				navigation and control. Collaboration with the VECTR lab will provide additional resources
				and expertise, enhancing the project's scope and capabilities.
			</p>
		</div>
	</div>
	<div class="relative overflow-hidden pt-16">
		<div class="mx-auto max-w-7xl px-6 lg:px-8">
			<img
				src={bp6}
				alt="App screenshot"
				class="mb-[-12%] rounded-2xl"
				width="2432"
				height="1442"
			/>
			<div class="relative" aria-hidden="true">
				<div class="absolute -inset-x-20 bottom-0 bg-gradient-to-t from-gray-900 pt-[7%]"></div>
			</div>
		</div>
	</div>
	<div class="mx-auto mt-16 max-w-7xl px-6 sm:mt-20 md:mt-24 lg:px-8">
		<dl
			class="mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 text-base leading-7 text-gray-300 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16"
		>
			<div class="relative pl-9">
				<dt class="inline font-semibold text-white">
					<svg
						class="absolute left-1 top-1 h-5 w-5 text-indigo-500"
						viewBox="0 0 20 20"
						fill="currentColor"
						aria-hidden="true"
					>
						<path
							fill-rule="evenodd"
							d="M5.5 17a4.5 4.5 0 01-1.44-8.765 4.5 4.5 0 018.302-3.046 3.5 3.5 0 014.504 4.272A4 4 0 0115 17H5.5zm3.75-2.75a.75.75 0 001.5 0V9.66l1.95 2.1a.75.75 0 101.1-1.02l-3.25-3.5a.75.75 0 00-1.1 0l-3.25 3.5a.75.75 0 101.1 1.02l1.95-2.1v4.59z"
							clip-rule="evenodd"
						/>
					</svg>
					Push to deploy.
				</dt>
				<dd class="inline">
					Lorem ipsum, dolor sit amet consectetur adipisicing elit aute id magna.
				</dd>
			</div>
			<div class="relative pl-9">
				<dt class="inline font-semibold text-white">
					<svg
						class="absolute left-1 top-1 h-5 w-5 text-indigo-500"
						viewBox="0 0 20 20"
						fill="currentColor"
						aria-hidden="true"
					>
						<path
							fill-rule="evenodd"
							d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
							clip-rule="evenodd"
						/>
					</svg>
					SSL certificates.
				</dt>
				<dd class="inline">
					Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.
				</dd>
			</div>
			<div class="relative pl-9">
				<dt class="inline font-semibold text-white">
					<svg
						class="absolute left-1 top-1 h-5 w-5 text-indigo-500"
						viewBox="0 0 20 20"
						fill="currentColor"
						aria-hidden="true"
					>
						<path
							fill-rule="evenodd"
							d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H3.989a.75.75 0 00-.75.75v4.242a.75.75 0 001.5 0v-2.43l.31.31a7 7 0 0011.712-3.138.75.75 0 00-1.449-.39zm1.23-3.723a.75.75 0 00.219-.53V2.929a.75.75 0 00-1.5 0V5.36l-.31-.31A7 7 0 003.239 8.188a.75.75 0 101.448.389A5.5 5.5 0 0113.89 6.11l.311.31h-2.432a.75.75 0 000 1.5h4.243a.75.75 0 00.53-.219z"
							clip-rule="evenodd"
						/>
					</svg>
					Simple queues.
				</dt>
				<dd class="inline">Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus.</dd>
			</div>
			<div class="relative pl-9">
				<dt class="inline font-semibold text-white">
					<svg
						class="absolute left-1 top-1 h-5 w-5 text-indigo-500"
						viewBox="0 0 20 20"
						fill="currentColor"
						aria-hidden="true"
					>
						<path
							fill-rule="evenodd"
							d="M10 2.5c-1.31 0-2.526.386-3.546 1.051a.75.75 0 01-.82-1.256A8 8 0 0118 9a22.47 22.47 0 01-1.228 7.351.75.75 0 11-1.417-.49A20.97 20.97 0 0016.5 9 6.5 6.5 0 0010 2.5zM4.333 4.416a.75.75 0 01.218 1.038A6.466 6.466 0 003.5 9a7.966 7.966 0 01-1.293 4.362.75.75 0 01-1.257-.819A6.466 6.466 0 002 9c0-1.61.476-3.11 1.295-4.365a.75.75 0 011.038-.219zM10 6.12a3 3 0 00-3.001 3.041 11.455 11.455 0 01-2.697 7.24.75.75 0 01-1.148-.965A9.957 9.957 0 005.5 9c0-.028.002-.055.004-.082a4.5 4.5 0 018.996.084V9.15l-.005.297a.75.75 0 11-1.5-.034c.003-.11.004-.219.005-.328a3 3 0 00-3-2.965zm0 2.13a.75.75 0 01.75.75c0 3.51-1.187 6.745-3.181 9.323a.75.75 0 11-1.186-.918A13.687 13.687 0 009.25 9a.75.75 0 01.75-.75zm3.529 3.698a.75.75 0 01.584.885 18.883 18.883 0 01-2.257 5.84.75.75 0 11-1.29-.764 17.386 17.386 0 002.078-5.377.75.75 0 01.885-.584z"
							clip-rule="evenodd"
						/>
					</svg>
					Advanced security.
				</dt>
				<dd class="inline">
					Lorem ipsum, dolor sit amet consectetur adipisicing elit aute id magna.
				</dd>
			</div>
			<div class="relative pl-9">
				<dt class="inline font-semibold text-white">
					<svg
						class="absolute left-1 top-1 h-5 w-5 text-indigo-500"
						viewBox="0 0 20 20"
						fill="currentColor"
						aria-hidden="true"
					>
						<path
							fill-rule="evenodd"
							d="M7.84 1.804A1 1 0 018.82 1h2.36a1 1 0 01.98.804l.331 1.652a6.993 6.993 0 011.929 1.115l1.598-.54a1 1 0 011.186.447l1.18 2.044a1 1 0 01-.205 1.251l-1.267 1.113a7.047 7.047 0 010 2.228l1.267 1.113a1 1 0 01.206 1.25l-1.18 2.045a1 1 0 01-1.187.447l-1.598-.54a6.993 6.993 0 01-1.929 1.115l-.33 1.652a1 1 0 01-.98.804H8.82a1 1 0 01-.98-.804l-.331-1.652a6.993 6.993 0 01-1.929-1.115l-1.598.54a1 1 0 01-1.186-.447l-1.18-2.044a1 1 0 01.205-1.251l1.267-1.114a7.05 7.05 0 010-2.227L1.821 7.773a1 1 0 01-.206-1.25l1.18-2.045a1 1 0 011.187-.447l1.598.54A6.993 6.993 0 017.51 3.456l.33-1.652zM10 13a3 3 0 100-6 3 3 0 000 6z"
							clip-rule="evenodd"
						/>
					</svg>
					Powerful API.
				</dt>
				<dd class="inline">
					Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.
				</dd>
			</div>
			<div class="relative pl-9">
				<dt class="inline font-semibold text-white">
					<svg
						class="absolute left-1 top-1 h-5 w-5 text-indigo-500"
						viewBox="0 0 20 20"
						fill="currentColor"
						aria-hidden="true"
					>
						<path
							d="M4.632 3.533A2 2 0 016.577 2h6.846a2 2 0 011.945 1.533l1.976 8.234A3.489 3.489 0 0016 11.5H4c-.476 0-.93.095-1.344.267l1.976-8.234z"
						/>
						<path
							fill-rule="evenodd"
							d="M4 13a2 2 0 100 4h12a2 2 0 100-4H4zm11.24 2a.75.75 0 01.75-.75H16a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75h-.01a.75.75 0 01-.75-.75V15zm-2.25-.75a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75H13a.75.75 0 00.75-.75V15a.75.75 0 00-.75-.75h-.01z"
							clip-rule="evenodd"
						/>
					</svg>
					Database backups.
				</dt>
				<dd class="inline">Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus.</dd>
			</div>
		</dl>
	</div>
</div>

<div id="delivery" class="bg-gray-900 pb-24">
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<div class="mx-auto max-w-5xl sm:text-center">
			<h2 class="text-base font-semibold leading-7 text-indigo-400">For All Majors</h2>
			<p class="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">Drone Delivery</p>
			<p class="mt-6 text-lg leading-8 text-gray-300">
				This project explores the innovative use of drones for delivery services. The objective is
				to design and test systems that ensure efficient and reliable package delivery. Team members
				will tackle challenges such as navigation in urban environments, payload handling, and
				delivery accuracy. The project will cover aspects of logistics, flight control, and system
				integration, offering participants valuable insights into the future of automated delivery
				systems and the potential for commercial applications.
			</p>
		</div>
	</div>
	<div class="relative overflow-hidden pt-16">
		<div class="mx-auto max-w-7xl px-6 lg:px-8">
			<img src={bp7} alt="App screenshot" class="mb-[-12%]" width="2432" height="1442" />
			<div class="relative" aria-hidden="true">
				<div class="absolute -inset-x-20 bottom-0 bg-gradient-to-t from-gray-900 pt-[7%]"></div>
			</div>
		</div>
	</div>
	<div class="mx-auto mt-16 max-w-7xl px-6 sm:mt-20 md:mt-24 lg:px-8">
		<dl
			class="mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 text-base leading-7 text-gray-300 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16"
		>
			<div class="relative pl-9">
				<dt class="inline font-semibold text-white">
					<svg
						class="absolute left-1 top-1 h-5 w-5 text-indigo-500"
						viewBox="0 0 20 20"
						fill="currentColor"
						aria-hidden="true"
					>
						<path
							fill-rule="evenodd"
							d="M5.5 17a4.5 4.5 0 01-1.44-8.765 4.5 4.5 0 018.302-3.046 3.5 3.5 0 014.504 4.272A4 4 0 0115 17H5.5zm3.75-2.75a.75.75 0 001.5 0V9.66l1.95 2.1a.75.75 0 101.1-1.02l-3.25-3.5a.75.75 0 00-1.1 0l-3.25 3.5a.75.75 0 101.1 1.02l1.95-2.1v4.59z"
							clip-rule="evenodd"
						/>
					</svg>
					Push to deploy.
				</dt>
				<dd class="inline">
					Lorem ipsum, dolor sit amet consectetur adipisicing elit aute id magna.
				</dd>
			</div>
			<div class="relative pl-9">
				<dt class="inline font-semibold text-white">
					<svg
						class="absolute left-1 top-1 h-5 w-5 text-indigo-500"
						viewBox="0 0 20 20"
						fill="currentColor"
						aria-hidden="true"
					>
						<path
							fill-rule="evenodd"
							d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
							clip-rule="evenodd"
						/>
					</svg>
					SSL certificates.
				</dt>
				<dd class="inline">
					Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.
				</dd>
			</div>
			<div class="relative pl-9">
				<dt class="inline font-semibold text-white">
					<svg
						class="absolute left-1 top-1 h-5 w-5 text-indigo-500"
						viewBox="0 0 20 20"
						fill="currentColor"
						aria-hidden="true"
					>
						<path
							fill-rule="evenodd"
							d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H3.989a.75.75 0 00-.75.75v4.242a.75.75 0 001.5 0v-2.43l.31.31a7 7 0 0011.712-3.138.75.75 0 00-1.449-.39zm1.23-3.723a.75.75 0 00.219-.53V2.929a.75.75 0 00-1.5 0V5.36l-.31-.31A7 7 0 003.239 8.188a.75.75 0 101.448.389A5.5 5.5 0 0113.89 6.11l.311.31h-2.432a.75.75 0 000 1.5h4.243a.75.75 0 00.53-.219z"
							clip-rule="evenodd"
						/>
					</svg>
					Simple queues.
				</dt>
				<dd class="inline">Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus.</dd>
			</div>
			<div class="relative pl-9">
				<dt class="inline font-semibold text-white">
					<svg
						class="absolute left-1 top-1 h-5 w-5 text-indigo-500"
						viewBox="0 0 20 20"
						fill="currentColor"
						aria-hidden="true"
					>
						<path
							fill-rule="evenodd"
							d="M10 2.5c-1.31 0-2.526.386-3.546 1.051a.75.75 0 01-.82-1.256A8 8 0 0118 9a22.47 22.47 0 01-1.228 7.351.75.75 0 11-1.417-.49A20.97 20.97 0 0016.5 9 6.5 6.5 0 0010 2.5zM4.333 4.416a.75.75 0 01.218 1.038A6.466 6.466 0 003.5 9a7.966 7.966 0 01-1.293 4.362.75.75 0 01-1.257-.819A6.466 6.466 0 002 9c0-1.61.476-3.11 1.295-4.365a.75.75 0 011.038-.219zM10 6.12a3 3 0 00-3.001 3.041 11.455 11.455 0 01-2.697 7.24.75.75 0 01-1.148-.965A9.957 9.957 0 005.5 9c0-.028.002-.055.004-.082a4.5 4.5 0 018.996.084V9.15l-.005.297a.75.75 0 11-1.5-.034c.003-.11.004-.219.005-.328a3 3 0 00-3-2.965zm0 2.13a.75.75 0 01.75.75c0 3.51-1.187 6.745-3.181 9.323a.75.75 0 11-1.186-.918A13.687 13.687 0 009.25 9a.75.75 0 01.75-.75zm3.529 3.698a.75.75 0 01.584.885 18.883 18.883 0 01-2.257 5.84.75.75 0 11-1.29-.764 17.386 17.386 0 002.078-5.377.75.75 0 01.885-.584z"
							clip-rule="evenodd"
						/>
					</svg>
					Advanced security.
				</dt>
				<dd class="inline">
					Lorem ipsum, dolor sit amet consectetur adipisicing elit aute id magna.
				</dd>
			</div>
			<div class="relative pl-9">
				<dt class="inline font-semibold text-white">
					<svg
						class="absolute left-1 top-1 h-5 w-5 text-indigo-500"
						viewBox="0 0 20 20"
						fill="currentColor"
						aria-hidden="true"
					>
						<path
							fill-rule="evenodd"
							d="M7.84 1.804A1 1 0 018.82 1h2.36a1 1 0 01.98.804l.331 1.652a6.993 6.993 0 011.929 1.115l1.598-.54a1 1 0 011.186.447l1.18 2.044a1 1 0 01-.205 1.251l-1.267 1.113a7.047 7.047 0 010 2.228l1.267 1.113a1 1 0 01.206 1.25l-1.18 2.045a1 1 0 01-1.187.447l-1.598-.54a6.993 6.993 0 01-1.929 1.115l-.33 1.652a1 1 0 01-.98.804H8.82a1 1 0 01-.98-.804l-.331-1.652a6.993 6.993 0 01-1.929-1.115l-1.598.54a1 1 0 01-1.186-.447l-1.18-2.044a1 1 0 01.205-1.251l1.267-1.114a7.05 7.05 0 010-2.227L1.821 7.773a1 1 0 01-.206-1.25l1.18-2.045a1 1 0 011.187-.447l1.598.54A6.993 6.993 0 017.51 3.456l.33-1.652zM10 13a3 3 0 100-6 3 3 0 000 6z"
							clip-rule="evenodd"
						/>
					</svg>
					Powerful API.
				</dt>
				<dd class="inline">
					Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.
				</dd>
			</div>
			<div class="relative pl-9">
				<dt class="inline font-semibold text-white">
					<svg
						class="absolute left-1 top-1 h-5 w-5 text-indigo-500"
						viewBox="0 0 20 20"
						fill="currentColor"
						aria-hidden="true"
					>
						<path
							d="M4.632 3.533A2 2 0 016.577 2h6.846a2 2 0 011.945 1.533l1.976 8.234A3.489 3.489 0 0016 11.5H4c-.476 0-.93.095-1.344.267l1.976-8.234z"
						/>
						<path
							fill-rule="evenodd"
							d="M4 13a2 2 0 100 4h12a2 2 0 100-4H4zm11.24 2a.75.75 0 01.75-.75H16a.75.75 0 01.75.75v.01a.75.75 0 01-.75.75h-.01a.75.75 0 01-.75-.75V15zm-2.25-.75a.75.75 0 00-.75.75v.01c0 .414.336.75.75.75H13a.75.75 0 00.75-.75V15a.75.75 0 00-.75-.75h-.01z"
							clip-rule="evenodd"
						/>
					</svg>
					Database backups.
				</dt>
				<dd class="inline">Ac tincidunt sapien vehicula erat auctor pellentesque rhoncus.</dd>
			</div>
		</dl>
	</div>
</div>
