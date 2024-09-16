<script lang="ts">
	import logo from '$lib/assets/logo.svg';
	import bp1 from '$lib/assets/bp-1.svg';
	import { onMount } from 'svelte';
	import Nav from './Nav.svelte';

	let words = ['design', 'teach', 'research'];
	let currentWordIndex = 0;
	let changingText = words[currentWordIndex];
	let displayText = '';

	export let image: string | null = null;

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

	onMount(() => {
		typeWriterEffect();
	});
</script>

<div class="relative isolate overflow-hidden bg-gray-900 min-h-screen">
	<Nav image={image} active="home"></Nav>
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
	<div class="mx-auto max-w-7xl px-10 pb-24 pt-20 sm:pb-32 lg:flex lg:px-8 lg:py-20">
		<div class="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-40">
			<img class="h-11" src={logo} alt="Your Company" />

			<h1 class="mt-5 text-4xl font-bold tracking-tight text-white sm:text-6xl">
				We <span class="gradient-text">{displayText}</span> the future of drones
			</h1>
			<p class="mt-6 text-lg leading-8 text-gray-300">
				We are UAS@UCLA, the premier undergraduate aerial robotics team at UCLA. Our student-run
				team designs, manufactures, and tests cutting-edge drone hardware and software.
			</p>
			<div class="mt-10 flex items-center gap-x-6">
				<a
					href="./#contact"
					class="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
					>Get involved</a
				>
				<a href="/research" class="text-sm font-semibold leading-6 text-white"
					>Research <span aria-hidden="true">→</span></a
				>
			</div>
		</div>
		<div
			class="mx-auto flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32"
		>
			<div class="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
				<img
					src={bp1}
					alt="App screenshot"
					width="2432"
					height="1442"
					class="w-[76rem] rounded-md"
				/>
			</div>
		</div>
	</div>
</div>
