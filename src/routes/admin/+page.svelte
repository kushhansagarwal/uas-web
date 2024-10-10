<script lang="ts">
	import Nav from '$lib/components/Nav.svelte';
	export const ssr = false;
	import moment from 'moment';
	import QRCode from 'qrcode';

	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import UserBlock from '$lib/components/UserBlock.svelte';

	export let data: PageData;
	let image: string | null = null;
	let selectedSubteam = '';

	let token = '';
	onMount(() => {
		if (!data.isAuthenticated) {
			goto('/api/auth/register');
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
	let fileCode = Array.from({ length: 10 }, () =>
		Math.random().toString(36).toUpperCase().charAt(2)
	).join('');
	let fileTitle = '';
	let fileDescription = '';
	let fileUploadStatus: 'idle' | 'uploading' | 'success' | 'error' = 'idle';

	let link = '';
	let linkCode = Array.from({ length: 10 }, () =>
		Math.random().toString(36).toUpperCase().charAt(2)
	).join('');
	let linkTitle = '';
	let linkDescription = '';
	let linkPublic = false;
	let linkUploadStatus: 'idle' | 'uploading' | 'success' | 'error' = 'idle';

	let allUsers: {
		_id: { $oid: string };
		email: string;
		given_name: string;
		family_name: string;
		level: string;
		privileges: string;
		createdAt: { $date: { $numberLong: string } };
		files: (string | null)[];
	}[] = [];

	async function handleFileUpload() {
		if (file && fileCode && fileTitle && fileDescription) {
			const formData = new FormData();
			formData.append('file', file);
			formData.append('email', data.user.email);
			formData.append('code', fileCode);
			formData.append('title', fileTitle);
			formData.append('description', fileDescription);

			try {
				fileUploadStatus = 'uploading';
				const response = await fetch('/api/account/file', {
					method: 'POST',
					body: formData,
					headers: {
						Authorization: `Bearer ${token}`
					}
				});
				if (response.ok) {
					// console.log('File uploaded successfully');
					fileUploadStatus = 'success';
					// Optionally, refresh the file list
				} else {
					console.error('File upload failed');
					fileUploadStatus = 'error';
				}
			} catch (error) {
				console.error('Error uploading file:', error);
				fileUploadStatus = 'error';
			}
		}
	}

	async function handleLinkUpload() {
		if (link && linkCode && linkTitle && linkDescription) {
			const formData = new FormData();
			formData.append('link', link);
			formData.append('public', linkPublic.toString());
			formData.append('email', data.user.email);
			formData.append('code', linkCode);
			formData.append('title', linkTitle);
			formData.append('description', linkDescription);

			try {
				linkUploadStatus = 'uploading';
				const response = await fetch('/api/account/link', {
					method: 'POST',
					body: formData,
					headers: {
						Authorization: `Bearer ${token}`
					}
				});
				if (response.ok) {
					// console.log('Link uploaded successfully');
					linkUploadStatus = 'success';
					// Optionally, refresh the link list
				} else {
					console.error('Link upload failed');
					linkUploadStatus = 'error';
				}
			} catch (error) {
				console.error('Error uploading link:', error);
				linkUploadStatus = 'error';
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
			<p class="mt-2 text-gray-400">This is the admin page. Here you can manage the website.</p>
			<div class="mt-5 grid grid-cols-2 gap-5">
				<div class=" rounded-xl card-color p-5">
					<p class="text-md mb-2 font-bold text-gray-400">Upload a file</p>
					<div class="grid grid-cols-2 gap-2">
						<input
							type="text"
							bind:value={fileCode}
							placeholder="Code"
							class=" base-color w-full rounded-xl border-2 border-gray-800 p-2 pl-3 font-mono text-gray-400"
						/>
						<input
							type="text"
							bind:value={fileTitle}
							placeholder="Title"
							class=" base-color w-full rounded-xl border-2 border-gray-800 p-2 pl-3 text-gray-400"
						/>
					</div>
					<input
						type="text"
						bind:value={fileDescription}
						placeholder="Description"
						class="base-color mt-2 w-full rounded-xl border-2 border-gray-800 p-2 pl-3 text-gray-400"
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
							!fileCode ||
							!fileTitle ||
							!fileDescription ||
							fileUploadStatus == 'uploading' ||
							fileUploadStatus == 'success'}>Upload</button
					>
					{#if fileUploadStatus !== 'idle'}
						<div class="mt-2">
							<p
								class={fileUploadStatus === 'uploading'
									? 'text-gray-400'
									: fileUploadStatus === 'success'
										? 'text-green-400'
										: 'text-red-400'}
							>
								{fileUploadStatus === 'uploading'
									? 'Uploading...'
									: fileUploadStatus === 'success'
										? 'File uploaded successfully!'
										: 'Error uploading file.'}
							</p>
						</div>
					{/if}
				</div>

				<div class=" rounded-xl card-color p-5">
					<p class="text-md mb-2 font-bold text-gray-400">Upload a link</p>
					<div class="grid grid-cols-2 gap-2">
						<input
							type="text"
							bind:value={linkCode}
							placeholder="Code"
							class=" base-color w-full rounded-xl border-2 border-gray-800 p-2 pl-3 font-mono text-gray-400"
						/>
						<input
							type="text"
							bind:value={linkTitle}
							placeholder="Title"
							class=" base-color w-full rounded-xl border-2 border-gray-800 p-2 pl-3 text-gray-400"
						/>
					</div>
					<input
						type="text"
						bind:value={linkDescription}
						placeholder="Description"
						class="base-color mt-2 w-full rounded-xl border-2 border-gray-800 p-2 pl-3 text-gray-400"
					/>
					<div class="mt-2">
						<label class="text-gray-400">
							<input type="checkbox" bind:checked={linkPublic} />
							<span class="ml-2">Public</span>
						</label>
					</div>
					<input
						type="text"
						bind:value={link}
						placeholder="Link"
						class="base-color mt-2 w-full rounded-xl border-2 border-gray-800 p-2 pl-3 text-gray-400"
					/>
					<button
						on:click={handleLinkUpload}
						class="button"
						disabled={!link ||
							!linkCode ||
							!linkTitle ||
							!linkDescription ||
							linkUploadStatus == 'uploading' ||
							linkUploadStatus == 'success'}>Upload</button
					>
					{#if linkUploadStatus !== 'idle'}
						<div class="mt-2">
							<p
								class={linkUploadStatus === 'uploading'
									? 'text-gray-400'
									: linkUploadStatus === 'success'
										? 'text-green-400'
										: 'text-red-400'}
							>
								{linkUploadStatus === 'uploading'
									? 'Uploading...'
									: linkUploadStatus === 'success'
										? 'Link uploaded successfully!'
										: 'Error uploading link.'}
							</p>
						</div>
					{/if}
				</div>

				<div class=" rounded-xl card-color p-5">
					<p class="text-md mb-2 font-bold text-gray-400">Create an event</p>
					<div class="grid grid-cols-2 gap-2">
						<input
							type="text"
							bind:value={eventTitle}
							placeholder="Title"
							class=" base-color w-full rounded-xl border-2 border-gray-800 p-2 pl-3 text-gray-400"
						/>
						<input
							type="text"
							bind:value={eventLocation}
							placeholder="Location"
							class=" base-color w-full rounded-xl border-2 border-gray-800 p-2 pl-3 text-gray-400"
						/>
					</div>
					<input
						type="text"
						bind:value={eventDescription}
						placeholder="Description"
						class="base-color mt-2 w-full rounded-xl border-2 border-gray-800 p-2 pl-3 text-gray-400"
					/>
					<input
						type="datetime-local"
						bind:value={eventDate}
						class="base-color mt-2 w-full rounded-xl border-2 border-gray-800 p-2 pl-3 text-gray-400"
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
				<div class="mb-4">
					<textarea
						id="all-users-textarea"
						class="w-full rounded-md border-gray-300 p-2 text-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
						rows="4"
						readonly
					>{allUsers.filter(user => !user.interestForm).map(user => user.email).join('; ')}</textarea>
					<button
						on:click={() => {
							const textarea = document.getElementById('all-users-textarea');
							if (textarea) {
								textarea.select();
								document.execCommand('copy');
							}
						}}
						class="mt-2 rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
					>Copy Emails</button>
				</div>
				<div class="mb-4">
					<select
						bind:value={selectedSubteam}
						class="mt-1 block w-full rounded-md border-gray-300 p-2 text-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
					>
						<option value="">Select Subteam</option>
						{#each ['Airframe & CAD', 'Electronics', 'Flight Control', 'Manufacturing', 'Outreach', 'R&D', 'Pilots & Operations', 'Vision', 'Ground & Communications'] as team}
							<option value={team}>{team}</option>
						{/each}
					</select>
				</div>
				{#if selectedSubteam}
					<div class="mb-4">
						<textarea
							id="subteam-users-textarea"
							class="w-full rounded-md border-gray-300 p-2 text-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
							rows="4"
							readonly
						>{allUsers.filter(user => user.subteam && user.subteam.includes(selectedSubteam)).map(user => user.email).join('; ')}</textarea>
						<button
							on:click={() => {
								const textarea = document.getElementById('subteam-users-textarea');
								if (textarea) {
									textarea.select();
									document.execCommand('copy');
								}
							}}
							class="mt-2 rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
						>Copy Emails</button>
					</div>
				{/if}
				<div class="grid grid-cols-2 gap-2">
					{#each allUsers as user}
						<UserBlock {user} {token} />
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>
