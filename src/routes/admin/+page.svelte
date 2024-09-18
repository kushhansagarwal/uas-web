<script lang="ts">
	import Nav from '$lib/components/Nav.svelte';
	export const ssr = false;
	import moment from 'moment';
	import QRCode from 'qrcode';

	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	export let data: PageData;
	let image: string | null = null;

	let token = '';
	onMount(() => {
		if (!data.isAuthenticated) {
			goto('/api/auth/login');
		} else {
			if (!data.isAdmin) {
				goto('/');
			}
			image = data.user.picture;
			token = data.token;
			allUsers = data.allUsers;
		}
	});

	let file: File | null = null;
	let code = Array.from({ length: 10 }, () =>
		Math.random().toString(36).toUpperCase().charAt(2)
	).join('');
	let title = '';
	let description = '';
	let uploadStatus: 'idle' | 'uploading' | 'success' | 'error' = 'idle';
	let allUsers: {
		_id: { $oid: string },
		email: string,
		given_name: string,
		family_name: string,
		level: string,
		privileges: string,
		createdAt: { $date: { $numberLong: string } },
		files: (string | null)[]
	}[] = [];

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
					body: formData,
					headers: {
						Authorization: `Bearer ${token}`
					}
				});
				if (response.ok) {
					// console.log('File uploaded successfully');
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

	let eventFile: File | null = null;
	let eventTitle = '';
	let eventDescription = '';
	let eventLocation = '';
	let eventDate: string | null = null;
	let eventRsvp = false;
	let eventUploadStatus: 'idle' | 'uploading' | 'success' | 'error' = 'idle';

	async function handleEventUpload() {
		if (eventFile && eventTitle && eventDescription && eventLocation && eventDate) {
			const formData = new FormData();
			formData.append('file', eventFile);
			formData.append('email', data.user.email);
			formData.append('title', eventTitle);
			formData.append('description', eventDescription);
			formData.append('location', eventLocation);
			formData.append('date', eventDate);
			formData.append('rsvp', eventRsvp.toString());

			try {
				eventUploadStatus = 'uploading';
				const response = await fetch('/api/calendar/add', {
					method: 'POST',
					body: formData,
					headers: {
						Authorization: `Bearer ${token}`
					}
				});
				if (response.ok) {
					// console.log('Event uploaded successfully');
					eventUploadStatus = 'success';
					// Optionally, refresh the event list
				} else {
					console.error('Event upload failed');
					eventUploadStatus = 'error';
				}
			} catch (error) {
				console.error('Error uploading event:', error);
				eventUploadStatus = 'error';
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
				This is the admin page. Here you can manage the website.
			</p>
			<div class="mt-5 grid grid-cols-2 gap-5">
				<div class=" rounded-xl bg-gray-800 p-5">
					<p class="text-md mb-2 font-bold text-gray-400">Upload a file</p>
					<div class="grid grid-cols-2 gap-2">
						<input
							type="text"
							bind:value={code}
							placeholder="Code"
							class=" w-full rounded-xl border-2 border-gray-800 base-color p-2 pl-3 font-mono text-gray-400"
						/>
						<input
							type="text"
							bind:value={title}
							placeholder="Title"
							class=" w-full rounded-xl border-2 border-gray-800 base-color p-2 pl-3 text-gray-400"
						/>
					</div>
					<input
						type="text"
						bind:value={description}
						placeholder="Description"
						class="mt-2 w-full rounded-xl border-2 border-gray-800 base-color p-2 pl-3 text-gray-400"
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
						disabled={!file ||
							!code ||
							!title ||
							!description ||
							uploadStatus == 'uploading' ||
							uploadStatus == 'success'}>Upload</button
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

				<div class=" rounded-xl bg-gray-800 p-5">
					<p class="text-md mb-2 font-bold text-gray-400">Create an event</p>
					<div class="grid grid-cols-2 gap-2">
						<input
							type="text"
							bind:value={eventTitle}
							placeholder="Title"
							class=" w-full rounded-xl border-2 border-gray-800 base-color p-2 pl-3 text-gray-400"
						/>
						<input
							type="text"
							bind:value={eventLocation}
							placeholder="Location"
							class=" w-full rounded-xl border-2 border-gray-800 base-color p-2 pl-3 text-gray-400"
						/>
					</div>
					<input
						type="text"
						bind:value={eventDescription}
						placeholder="Description"
						class="mt-2 w-full rounded-xl border-2 border-gray-800 base-color p-2 pl-3 text-gray-400"
					/>
					<input
						type="datetime-local"
						bind:value={eventDate}
						class="mt-2 w-full rounded-xl border-2 border-gray-800 base-color p-2 pl-3 text-gray-400"
					/>
					<label for="event-file-input" class="sr-only">Choose file</label>
					<input
						type="file"
						name="event-file-input"
						on:change={(e) => (eventFile = e.target.files?.[0] || null)}
						id="event-file-input"
						class="file-input"
					/>
					<div class="mt-2">
						<label class="text-gray-400">
							<input type="checkbox" bind:checked={eventRsvp} />
							<span class="ml-2">RSVP Required</span>
						</label>
					</div>
					<button
						on:click={handleEventUpload}
						class="button"
						disabled={!eventFile ||
							!eventTitle ||
							!eventDescription ||
							!eventLocation ||
							!eventDate ||
							eventUploadStatus == 'uploading' ||
							eventUploadStatus == 'success'}>Create Event</button
					>
					{#if eventUploadStatus !== 'idle'}
						<div class="mt-2">
							<p
								class={eventUploadStatus === 'uploading'
									? 'text-gray-400'
									: eventUploadStatus === 'success'
										? 'text-green-400'
										: 'text-red-400'}
							>
								{eventUploadStatus === 'uploading'
									? 'Uploading...'
									: eventUploadStatus === 'success'
										? 'Event created successfully!'
										: 'Error creating event.'}
							</p>
						</div>
					{/if}
				</div>
			</div>

			<div class="mt-10">
				<p class="text-md mb-2 font-bold text-gray-400">All Users</p>
				<div class="grid grid-cols-2 gap-2">
					{#each allUsers as user, index}
						<div class="rounded-xl bg-gray-800 p-5">
							<p class="text-gray-400">Email: <input type="text" bind:value={allUsers[index].email} class="base-color text-gray-400 p-1 rounded" /></p>
							<p class="text-gray-400">Name: <input type="text" bind:value={allUsers[index].given_name} class="base-color text-gray-400 p-1 rounded" /> <input type="text" bind:value={allUsers[index].family_name} class="base-color text-gray-400 p-1 rounded" /></p>
							<p class="text-gray-400">Level: <input type="text" bind:value={allUsers[index].level} class="base-color text-gray-400 p-1 rounded" /></p>
							<p class="text-gray-400">Privileges: <input type="text" bind:value={allUsers[index].privileges} class="base-color text-gray-400 p-1 rounded" /></p>
							<!-- <p class="text-gray-400">Created At: <input type="text" bind:value={allUsers[index].createdAt.$date.$numberLong} class="base-color text-gray-400 p-1 rounded" /></p> -->
							<!-- <p class="text-gray-400">Files: <input type="text" bind:value={allUsers[index].files.join(', ')} class="base-color text-gray-400 p-1 rounded" /></p> -->
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>
