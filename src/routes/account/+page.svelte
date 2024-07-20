<script lang="ts">
	import Nav from '$lib/components/Nav.svelte';

	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	export let data: PageData;
	let image: string | null = null;

	let FilesPromise: Promise<any>;

	interface FilesPromiseData {
		userData: {
			email: string;
			givenName: string;
			familyName: string;
			level: string;
			privileges: string;
			created: string;
		};
		files: Array<Array<string>>;
	}

	let filesPromiseData: FilesPromiseData | null = null;
	let accessCode: string | null = null;
	$: accessCode = accessCode ? accessCode.toLocaleUpperCase() : null;

	const simulate = true;

	let searchFiles = '';

	$: filteredFiles = searchFiles
		? filesPromiseData?.files.filter((file) =>
				Object.values(file).some((value) => value.toLowerCase().includes(searchFiles.toLowerCase()))
			)
		: filesPromiseData?.files;

	onMount(() => {
		if (!data.isAuthenticated) {
			goto('/api/auth/login');
		} else {
			image = data.user.picture;

			if (simulate) {
				filesPromiseData = {
					userData: {
						email: 'kushagarwal@g.ucla.edu',
						givenName: 'KUSH',
						familyName: 'HANSKUMAR AGARWAL',
						level: 'General Member',
						privileges: 'None',
						created: '1721470614667'
					},
					files: [
						[
							'BACAA',
							'Solidworks',
							'Today',
							'This',
							'https://drive.google.com/file/d/1yUkyBLUiuSGRpkxuxHgDW1526-YFRFmY/view?usp=drive_link'
						],
						['BACAC', 'OnShape', 'Yesterday', 'Those', 'Give '],
						[
							'SLDWRKS',
							'SolidWorks License',
							'Today',
							'Instructions on how to access SolidWorks for UCLA Engineering students'
						]
					]
				};
			} else {
				FilesPromise = fetch('/api/account/files', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({ email: data.user.email })
				}).then(async (res) => {
					const jsonData = await res.json();
					filesPromiseData = jsonData;
				});
			}
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
	{#await FilesPromise}
		<div class="mt-5 grid animate-pulse gap-5 lg:grid-cols-4">
			<div>
				<div class="h-96 rounded-xl bg-gray-800 p-5"></div>
			</div>
			<div class="lg:col-span-3">
				<div class="mt-3 grid gap-5">
					<div class="h-24 rounded-xl bg-gray-800 p-5"></div>
				</div>
			</div>
		</div>
	{:then promiseData}
		{#if filesPromiseData}
			<div class="mt-5 grid gap-5 lg:grid-cols-4">
				<div>
					<div class="rounded-xl bg-gray-800 p-5">
						<div class="">
							<p class="font-bold">Email</p>
							<p class="text-gray-400">{filesPromiseData.userData.email}</p>
						</div>
						<div class="mt-5">
							<p class="font-bold">Date Joined</p>
							<p class="text-gray-400">{filesPromiseData.userData.created}</p>
						</div>
						<div class="mt-5">
							<p class="font-bold">Level</p>
							<p class="text-gray-400">{filesPromiseData.userData.level}</p>
						</div>
						{#if filesPromiseData.userData.privileges !== 'None'}
							<div class="mt-5">
								<p class="font-bold">Privileges:</p>
								<p class="text-gray-400">{filesPromiseData.userData.privileges}</p>
							</div>
						{/if}
					</div>
				</div>
				<div class="lg:col-span-3">
					<p class=" text-gray-400">These are the files you have access to.</p>

					<div class="flex grid-cols-2">
						<input
							type="text"
							bind:value={searchFiles}
							class="mt-2 w-full flex-grow rounded-xl border-2 border-gray-800 bg-gray-900 p-2 pl-3"
							placeholder="Search for a file"
						/>
					</div>

					<div class="mt-3 grid gap-5">
						{#each filteredFiles || [] as file}
							<div class="rounded-xl bg-gray-800 p-5">
								<p class="text-xs text-gray-400">
									<span class="font-mono">{file[0]}</span> | Released {file[2]}
								</p>
								<p class="text-xl font-bold text-white">{file[1]}</p>
								<p class="text-gray-400">{file[3]}</p>
								<div class="mt-2">
									<a href={file[4]} target="_blank" class="text-blue-500">Download File</a>
								</div>
							</div>
						{/each}
					</div>
				</div>
			</div>
		{/if}
	{:catch error}
		<!-- promise was rejected -->
	{/await}
</section>
