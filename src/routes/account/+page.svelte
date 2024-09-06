<script lang="ts">
	import Nav from '$lib/components/Nav.svelte';
	export const ssr = false;
	import moment from 'moment';

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
		files: Array<{
			_id: string;
			title: string;
			date: string | null;
			description: string;
			code: string;
			fileId: string;
			fileName: string;
			fileType: string;
			createdAt: string;
		}>;
	}

	let filesPromiseData: FilesPromiseData | null = null;
	let accessCode: string | null = null;
	$: accessCode = accessCode ? accessCode.toLocaleUpperCase() : null;

	const simulate = false;

	let searchFiles = '';

	$: filteredFiles = searchFiles
		? filesPromiseData?.files.filter((file) =>
				Object.values(file).some((value) =>
					value?.toString().toLowerCase().includes(searchFiles.toLowerCase())
				)
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
						email: 'kushhansagarwal@gmail.com',
						givenName: 'Kush',
						familyName: 'Agarwal',
						level: 'President',
						privileges: 'Admin',
						created: '2024-09-06T17:33:22.357Z'
					},
					files: [
						{
							_id: '66db4736b390982f7ce77eaf',
							title: 'Solidworks',
							date: null,
							description: 'Description',
							code: 'SLDWRKS',
							fileId: '11tK9wFzG3slubkiIpmdqytCsh1CfcjLS',
							fileName: 'Building1.jpg',
							fileType: 'image/jpeg',
							createdAt: '2024-09-06T18:17:26.423Z'
						}
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
					console.log(filesPromiseData);
				});
			}
		}
	});

	let file: File | null = null;
	let code = Array.from({ length: 10 }, () =>
		Math.random().toString(36).toUpperCase().charAt(2)
	).join('');
	let title = '';
	let description = '';
	let uploadStatus: 'idle' | 'uploading' | 'success' | 'error' = 'idle';

	async function handleFileUpload() {
		if (file && code && title && description) {
			const formData = new FormData();
			formData.append('file', file);
			formData.append('email', data.user.email);
			formData.append('code', code);
			formData.append('title', title);
			formData.append('description', description);

			try {
				uploadStatus = 'uploading';
				const response = await fetch('/api/account/file', {
					method: 'POST',
					body: formData
				});
				if (response.ok) {
					console.log('File uploaded successfully');
					uploadStatus = 'success';
					// Optionally, refresh the file list
				} else {
					console.error('File upload failed');
					uploadStatus = 'error';
				}
			} catch (error) {
				console.error('Error uploading file:', error);
				uploadStatus = 'error';
			}
		}
	}
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
				<div class="grid gap-5">
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
							<p class="font-bold text-white">Email</p>
							<p class="text-gray-400">{filesPromiseData.userData.email}</p>
						</div>
						<div class="mt-5">
							<p class="font-bold text-white">Date Joined</p>
							<p class="text-gray-400">
								{moment(filesPromiseData.userData.created).format('DD MMMM, YYYY')}
							</p>
							<p class="text-xs text-gray-600">
								{(() => {
									const duration = moment.duration(
										moment().diff(moment(filesPromiseData.userData.created))
									);
									const years = duration.years();
									const months = duration.months();
									const days = duration.days();
									console.log(years, months, days);

									const parts = [];
									if (years > 0) parts.push(`${years} year${years > 1 ? 's' : ''}`);
									if (months > 0) parts.push(`${months} month${months > 1 ? 's' : ''}`);
									if (days > 0) parts.push(`${days} day${days > 1 ? 's' : ''}`);
									return parts.length > 0 ? `${parts.join(', ')} ago` : 'Welcome!';
								})()}
							</p>
						</div>
						<div class="mt-5">
							<p class="font-bold text-white">Level</p>
							<p class="text-gray-400">{filesPromiseData.userData.level}</p>
						</div>
						{#if filesPromiseData.userData.privileges !== 'None'}
							<div class="mt-5">
								<p class="font-bold text-white">Privileges</p>
								<p class="text-gray-400">{filesPromiseData.userData.privileges}</p>
							</div>
						{/if}
					</div>
				</div>
				<div class="lg:col-span-3">
					<div class=" rounded-xl bg-gray-800 p-5">
						<p class="text-md mb-2 font-bold text-gray-400">Upload a file</p>
						<div class="grid grid-cols-2 gap-2">
							<input
								type="text"
								bind:value={code}
								placeholder="Code"
								class=" w-full rounded-xl border-2 border-gray-800 bg-gray-900 p-2 pl-3 font-mono text-gray-400"
							/>
							<input
								type="text"
								bind:value={title}
								placeholder="Title"
								class=" w-full rounded-xl border-2 border-gray-800 bg-gray-900 p-2 pl-3 text-gray-400"
							/>
						</div>
						<input
							type="text"
							bind:value={description}
							placeholder="Description"
							class="mt-2 w-full rounded-xl border-2 border-gray-800 bg-gray-900 p-2 pl-3 text-gray-400"
						/>
						<label for="small-file-input" class="sr-only">Choose file</label>
						<input
							type="file"
							name="small-file-input"
							on:change={(e) => (file = e.target.files?.[0] || null)}
							id="small-file-input"
							class="file-input"
						/>
						<button
							on:click={handleFileUpload}
							class="button"
							disabled={!file || !code || !title || !description || uploadStatus !== 'idle'}
							>Upload</button
						>
						{#if uploadStatus !== 'idle'}
							<div class="mt-2">
								<p
									class={uploadStatus === 'uploading'
										? 'text-gray-400'
										: uploadStatus === 'success'
											? 'text-green-400'
											: 'text-red-400'}
								>
									{uploadStatus === 'uploading'
										? 'Uploading...'
										: uploadStatus === 'success'
											? 'File uploaded successfully!'
											: 'Error uploading file.'}
								</p>
							</div>
						{/if}
					</div>

					<p class="mt-5 text-gray-400">These are the files you have access to.</p>

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
									<span class="font-mono">{file.code}</span> | Released {moment(
										file.createdAt
									).format('DD MMMM, YYYY')}
								</p>
								<p class="text-xl font-bold text-white">{file.title}</p>
								<p class="text-gray-400">{file.description}</p>
								<div class="mt-2">
									<a
										href={`https://drive.google.com/file/d/${file.fileId}/view`}
										target="_blank"
										class="text-blue-500">Download File</a
									>
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
