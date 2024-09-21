<script lang="ts">
	import SponsorList from './../lib/components/SponsorList.svelte';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import Sec1 from './../lib/components/Sec1.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import Sec2 from '$lib/components/Sec2.svelte';
	import Sec3 from '$lib/components/Sec3.svelte';
	import Team from '$lib/components/Team.svelte';
	import Newsletter from '$lib/components/Newsletter.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import InlineGallery from '$lib/components/InlineGallery.svelte';
	import { enhance } from '$app/forms';

	let authenticated = false;
	let image: string | null = null;
	let showOtherMajor = false;
	let major: string = '';

	export let data;

	export let form;

	onMount(() => {
		if (data.isAuthenticated) {
			authenticated = true;
			image = data.user.picture;
		}

		if (localStorage.getItem('file_code')) {
			const url = localStorage.getItem('file_code');
			localStorage.removeItem('file_code');
			goto(`/file/add/${url}`);
		}
	});

	function handleMajorChange(event) {
		major = event.target.value;
		showOtherMajor = major === 'Other';
	}

	let suggestions = [
		'Aerospace Engineering',
		'Mechanical Engineering',
		'Computer Science (CS/CSE/CE)'
	];
</script>

<Hero {image}></Hero>
<InlineGallery></InlineGallery>
<Sec1></Sec1>
<SponsorList></SponsorList>
<Sec2></Sec2>
<Sec3></Sec3>
<Team></Team>

<div id="contact" class="base-color relative isolate">
	<div class="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
		<div class="relative px-6 pb-20 pt-24 sm:pt-32 lg:static lg:px-8 lg:py-48">
			<div class="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
				<div
					class="absolute inset-y-0 left-0 -z-10 w-full overflow-hidden ring-1 ring-white/5 lg:w-1/2"
				>
					<svg
						class="absolute inset-0 h-full w-full stroke-gray-700 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
						aria-hidden="true"
					>
						<defs>
							<pattern
								id="54f88622-e7f8-4f1d-aaf9-c2f5e46dd1f2"
								width="200"
								height="200"
								x="100%"
								y="-1"
								patternUnits="userSpaceOnUse"
							>
								<path d="M130 200V.5M.5 .5H200" fill="none" />
							</pattern>
						</defs>
						<svg x="100%" y="-1" class="overflow-visible fill-gray-800/20">
							<path d="M-470.5 0h201v201h-201Z" stroke-width="0" />
						</svg>
						<rect
							width="100%"
							height="100%"
							stroke-width="0"
							fill="url(#54f88622-e7f8-4f1d-aaf9-c2f5e46dd1f2)"
						/>
					</svg>
					<div
						class="absolute -left-56 top-[calc(100%-13rem)] transform-gpu blur-3xl lg:left-[max(-14rem,calc(100%-59rem))] lg:top-[calc(50%-7rem)]"
						aria-hidden="true"
					>
						<div
							class="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-br from-[#80caff] to-[#4f46e5] opacity-20"
							style="clip-path: polygon(74.1% 56.1%, 100% 38.6%, 97.5% 73.3%, 85.5% 100%, 80.7% 98.2%, 72.5% 67.7%, 60.2% 37.8%, 52.4% 32.2%, 47.5% 41.9%, 45.2% 65.8%, 27.5% 23.5%, 0.1% 35.4%, 17.9% 0.1%, 27.6% 23.5%, 76.1% 2.6%, 74.1% 56.1%)"
						></div>
					</div>
				</div>
				<h2 class="text-3xl font-bold tracking-tight text-white">Get involved</h2>
				<p class="mt-6 text-lg leading-8 text-gray-300">
					Join UAS@UCLA to gain hands-on experience in drone technology. Participate in technical
					workshops, industry networking events, and research projects. No prior experience is
					required—just a passion for innovation.
				</p>
				<dl class="mt-10 space-y-4 text-base leading-7 text-gray-300">
					<div class="flex gap-x-4">
						<dt class="flex-none">
							<span class="sr-only">Address</span>
							<svg
								class="h-7 w-6 text-gray-400"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								aria-hidden="true"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z"
								/>
							</svg>
						</dt>
						<dd>Boelter 2730D<br />420 Westwood Plaza<br />Los Angeles, CA 90095-1597</dd>
					</div>

					<div class="flex gap-x-4">
						<dt class="flex-none">
							<span class="sr-only">Email</span>
							<svg
								class="h-7 w-6 text-gray-400"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								aria-hidden="true"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
								/>
							</svg>
						</dt>
						<dd>
							<a class="hover:text-white" href="mailto:uas@g.ucla.edu">uas@g.ucla.edu</a>
						</dd>
					</div>
				</dl>
			</div>
		</div>
		<form
			action="?/contact"
			method="POST"
			class="px-6 pb-24 pt-20 sm:pb-32 lg:px-8 lg:py-48"
			use:enhance
		>
			<div class="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
				<div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
					<div class="sm:col-span-2">
						<label for="name" class="required block text-sm font-semibold leading-6 text-white"
							>Name</label
						>
						<div class="mt-2.5">
							<input
								type="text"
								name="name"
								id="name"
								autocomplete="name"
								class="block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
								required
							/>
						</div>
					</div>
					<div class="sm:col-span-2">
						<label for="email" class="required block text-sm font-semibold leading-6 text-white"
							>Email</label
						>
						<div class="mt-2.5">
							<input
								type="email"
								name="email"
								id="email"
								autocomplete="email"
								class="block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
								required
							/>
						</div>
					</div>
					<div class="sm:col-span-2">
						<label for="major" class="required block text-sm font-semibold leading-6 text-white"
							>Major</label
						>
						<div class="mt-2.5">
							<input
								list="majors"
								name="major"
								id="major"
								class="block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
								required
								on:change={handleMajorChange}
							/>
							<datalist id="majors">
								{#each suggestions as suggestion}
									<option value={suggestion}></option>
								{/each}
							</datalist>
						</div>
					</div>

					<div class="sm:col-span-2">
						<label class="required block text-sm font-semibold leading-6 text-white">Year</label>
						<div class="mt-2.5">
							<div class="contact-options">
								<div class="flex items-center">
									<input
										type="radio"
										name="year"
										id="freshman"
										value="Freshman"
										class="mr-2"
										required
									/>
									<label for="freshman" class="text-white">Freshman</label>
								</div>
								<div class="flex items-center">
									<input
										type="radio"
										name="year"
										id="sophomore"
										value="Sophomore"
										class="mr-2"
										required
									/>
									<label for="sophomore" class="text-white">Sophomore</label>
								</div>
								<div class="flex items-center">
									<input
										type="radio"
										name="year"
										id="junior"
										value="Junior"
										class="mr-2"
										required
									/>
									<label for="junior" class="text-white">Junior</label>
								</div>
								<div class="flex items-center">
									<input
										type="radio"
										name="year"
										id="senior"
										value="Senior"
										class="mr-2"
										required
									/>
									<label for="senior" class="text-white">Senior</label>
								</div>
								<div class="flex items-center">
									<input
										type="radio"
										name="year"
										id="first-year-transfer"
										value="First Year Transfer"
										class="mr-2"
										required
									/>
									<label for="first-year-transfer" class="text-white">1st Year Transfer</label>
								</div>
								<div class="flex items-center">
									<input
										type="radio"
										name="year"
										id="second-year-transfer"
										value="Second Year Transfer"
										class="mr-2"
										required
									/>
									<label for="second-year-transfer" class="text-white">2nd Year Transfer</label>
								</div>
							</div>
						</div>
					</div>
					<div class="sm:col-span-2">
						<label class="required block text-sm font-semibold leading-6 text-white"
							>Interests</label
						>
						<div class="mt-2.5">
							<div class="contact-options">
								<div class="flex items-center">
									<input
										type="checkbox"
										name="interest"
										id="hardware"
										value="Hardware"
										class="mr-2"
									/>
									<label for="hardware" class="text-white">Hardware</label>
								</div>
								<div class="flex items-center">
									<input
										type="checkbox"
										name="interest"
										id="flight-software"
										value="Flight Software"
										class="mr-2"
									/>
									<label for="flight-software" class="text-white">Flight Software</label>
								</div>
								<div class="flex items-center">
									<input type="checkbox" name="interest" id="vision" value="Vision" class="mr-2" />
									<label for="vision" class="text-white">Vision</label>
								</div>
							</div>
						</div>
					</div>
					<div class="sm:col-span-2">
						<label class="required block text-sm font-semibold leading-6 text-white"
							>How did you hear about us?</label
						>
						<div class="mt-2.5">
							<div class="contact-options">
								<div class="flex items-center">
									<input
										type="radio"
										name="reference"
										id="campus-event"
										value="Campus Event"
										class="mr-2"
										required
									/>
									<label for="campus-event" class="text-white">Campus Event</label>
								</div>
								<div class="flex items-center">
									<input
										type="radio"
										name="reference"
										id="ucla-website"
										value="UCLA Website"
										class="mr-2"
										required
									/>
									<label for="ucla-website" class="text-white">UCLA Website</label>
								</div>
								<div class="flex items-center">
									<input
										type="radio"
										name="reference"
										id="friends"
										value="Friends"
										class="mr-2"
										required
									/>
									<label for="friends" class="text-white">Friends</label>
								</div>
								<div class="flex items-center">
									<input
										type="radio"
										name="reference"
										id="social-media"
										value="Social Media"
										class="mr-2"
										required
									/>
									<label for="social-media" class="text-white">Social Media</label>
								</div>

								<div class="flex items-center">
									<input
										type="radio"
										name="reference"
										id="aiaa-uas-meeting"
										value="AIAA/UAS Meeting"
										class="mr-2"
										required
									/>
									<label for="aiaa-uas-meeting" class="text-white">AIAA/UAS Meeting</label>
								</div>
								<div class="flex items-center">
									<input
										type="radio"
										name="reference"
										id="discord"
										value="Discord"
										class="mr-2"
										required
									/>
									<label for="discord" class="text-white">Discord</label>
								</div>
								<div class="flex items-center">
									<input type="radio" name="reference" id="eaf" value="EAF" class="mr-2" required />
									<label for="eaf" class="text-white">EAF</label>
								</div>
								<div class="flex items-center">
									<input
										type="radio"
										name="reference"
										id="engineering-fair"
										value="Engineering Fair"
										class="mr-2"
										required
									/>
									<label for="engineering-fair" class="text-white">Engineering Fair</label>
								</div>
							</div>
						</div>
					</div>
					<div class="sm:col-span-2">
						<label for="questions-comments" class="block text-sm font-semibold leading-6 text-white"
							>Questions/comments</label
						>
						<div class="mt-2.5">
							<textarea
								name="comments"
								id="questions-comments"
								rows="4"
								class="block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
							></textarea>
						</div>
					</div>
				</div>
				<div class="mt-8 flex justify-end">
					<button
						type="submit"
						class="rounded-md bg-indigo-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
						>Send message</button
					>
				</div>
				<div class="mt-5 text-sm text-gray-200">
					{#if form?.success}
						<p class="">{@html form.message}</p>
					{:else if form?.error}
						<p class="">{@html form.message}</p>
					{/if}
				</div>
			</div>
		</form>
	</div>
</div>
