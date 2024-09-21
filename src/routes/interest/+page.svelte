<script lang="ts">
	import type { PageData } from './$types';
	import moment from 'moment';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import Nav from '$lib/components/Nav.svelte';
	export let data: PageData;
	let image: string | null = null;
	let token = '';
	let interests: {
		_id: { $oid: string };
		name: string;
		email: string;
		major: string;
		year: string;
		interest: string[];
		reference: string;
		comments: string;
		createdAt: number;
		hasAccount: boolean;
	}[] = [];

	let filter = {
		major: '',
		year: '',
		interest: '',
		hasAccount: ''
	};

	let majors: string[] = [];
	let years: string[] = [];
	let interestOptions: string[] = [];
	let accountStatuses = ['true', 'false'];

	onMount(() => {
		if (!data.isAuthenticated) {
			goto('/api/auth/register');
		} else {
			if (!data.isAdmin) {
				goto('/');
			}
			image = data.user.picture;
			token = data.token;
			interests = data.interests as unknown as {
				_id: { $oid: string };
				name: string;
				email: string;
				major: string;
				year: string;
				interest: string[];
				reference: string;
				comments: string;
				createdAt: number;
				hasAccount: boolean;
			}[];

			interests = interests.map((interest) => {
				if (typeof interest.interest === 'string') {
					interest.interest = [interest.interest];
				}
				return interest;
			});
			majors = [...new Set(interests.map((interest) => interest.major))];
			years = [...new Set(interests.map((interest) => interest.year))];
			interestOptions = [...new Set(interests.flatMap((interest) => interest.interest))];
			console.log(interests);
		}
	});

	$: filteredInterests = interests.filter((interest) => {
		const majorMatch = filter.major ? interest.major === filter.major : true;
		const yearMatch = filter.year ? interest.year === filter.year : true;
		const interestMatch = filter.interest ? interest.interest.includes(filter.interest) : true;
		const hasAccountMatch = filter.hasAccount
			? interest.hasAccount.toString() === filter.hasAccount
			: true;
		return majorMatch && yearMatch && interestMatch && hasAccountMatch;
	});

	$: filteredEmails = filteredInterests.map((interest) => interest.email).join('; ');
</script>

<Nav {image}></Nav>
<section class="mx-auto min-h-screen max-w-7xl px-5 lg:px-8">
	<div class="mt-10 md:flex md:items-center md:justify-between">
		<div class="min-w-0 flex-1">
			<h2 class="text-2xl font-bold leading-7 text-white sm:truncate sm:text-3xl sm:tracking-tight">
				Welcome <span class="gradient-text">{data.user.given_name}</span>,
			</h2>
			<p class="mt-2 text-gray-400">
				This is the interest page. Here you can manage all the interest form submissions. Copy the
				emails of the students you want to send a message to by filtering the table below.
			</p>
		</div>
	</div>
	<div>
		<div class="card-color my-5 rounded-lg p-5">
			<div class="mb-2">
				<select
					bind:value={filter.major}
					class="mt-1 block w-full rounded-md border-gray-300 p-2 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
				>
					<option value="">All Majors</option>
					{#each majors as major}
						<option value={major}>{major}</option>
					{/each}
				</select>
			</div>
			<div class="mb-2">
				<select
					bind:value={filter.year}
					class="mt-1 block w-full rounded-md border-gray-300 p-2 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
				>
					<option value="">All Years</option>
					{#each years as year}
						<option value={year}>{year}</option>
					{/each}
				</select>
			</div>
			<div class="mb-2">
				<select
					bind:value={filter.interest}
					class="mt-1 block w-full rounded-md border-gray-300 p-2 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
				>
					<option value="">All Interests</option>
					{#each interestOptions as interest}
						<option value={interest}>{interest}</option>
					{/each}
				</select>
			</div>
			<div class="mb-2">
				<select
					bind:value={filter.hasAccount}
					class="mt-1 block w-full rounded-md border-gray-300 p-2 text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
				>
					<option value="">All Account Statuses</option>
					<option value="true">Has Account</option>
					<option value="false">No Account</option>
				</select>
			</div>
			<button
				type="button"
				class="rounded-md bg-indigo-500 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
				on:click={() => {
					navigator.clipboard.writeText(filteredEmails);
				}}>Copy Filtered Emails</button
			>
		</div>

		<ul>
			{#each filteredInterests as interest}
				<div class="card-color mb-4 rounded-lg p-4 shadow-lg">
					<div>
						<ul class="text-gray-400">
							<li class="">
								<span class="text-xl font-bold text-gray-300">{interest.name}</span>
								{#if !interest.hasAccount}
									<span class="ml-2 text-red-500">!</span>
								{/if}
							</li>
							<li class="mb-5 text-gray-300">
								{interest.year} | {interest.major} |
								<a href="mailto:{interest.email}" class="text-indigo-500 underline"
									>{interest.email}</a
								>
							</li>
							<li class="mb-5 text-gray-300">{interest.comments}</li>
						</ul>
					</div>
					<div class="mt-2">
						<div class="mt-1 flex flex-wrap">
							{#each interest.interest as item}
								<span
									class="m-1 inline-block rounded-full bg-indigo-500 px-3 py-1 text-sm font-semibold text-white"
									>{item}</span
								>
							{/each}
						</div>
					</div>
					<p class="mt-5 text-xs text-gray-400">
						Created {moment(interest.createdAt).fromNow()} | Reference: {interest.reference}
					</p>
				</div>
			{/each}
		</ul>
	</div>
</section>
