<script lang="ts">
	import logo from '$lib/assets/logo.svg';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	let state = true;
	let profile_state = false;

	export let image: string | null = null;
	export let active: string = 'home';

	function clickOutside(node: any) {
		const handleClick = (event: any) => {
			if (!node.contains(event.target)) {
				profile_state = false;
			}
		};

		document.addEventListener('click', handleClick, true);

		return {
			destroy() {
				document.removeEventListener('click', handleClick, true);
			}
		};
	}
</script>

<nav class="z-10 bg-opacity-0">
	<div class="mx-auto max-w-7xl px-5 pt-2 sm:px-10">
		<div class="relative flex h-16 items-center justify-between">
			<div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
				<!-- Mobile menu button-->
				<button
					type="button"
					class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
					aria-controls="mobile-menu"
					aria-expanded="false"
					on:click={() => (state = !state)}
				>
					<span class="absolute -inset-0.5"></span>
					<span class="sr-only">Open main menu</span>
					<!--
			  Icon when menu is closed.
  
			  Menu open: "hidden", Menu closed: "block"
			-->

					{#if state}
						<svg
							class="block h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							aria-hidden="true"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
							/>
						</svg>
					{:else}
						<svg
							class="block h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							aria-hidden="true"
						>
							<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
						</svg>
					{/if}
				</button>
			</div>
			<div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
				<div class="items-left flex hidden flex-shrink-0 sm:block">
					<img class="h-8 w-auto" src={logo} alt="Your Company" />
				</div>
				<div class="hidden sm:ml-6 sm:block">
					<div class="flex space-x-4">
						<!-- Current: "base-color text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
						<a
							href="/"
							class={active === 'home'
								? 'active-nav rounded-md px-3 py-2 text-sm font-medium'
								: 'inactive-nav rounded-md px-3 py-2 text-sm font-medium'}
							aria-current="page">Home</a
						>
						<a
							href="/research"
							class={active === 'research'
								? 'active-nav rounded-md px-3 py-2 text-sm font-medium'
								: 'inactive-nav rounded-md px-3 py-2 text-sm font-medium'}>Research</a
						>
						<a
							href="/calendar"
							class={active === 'calendar'
								? 'active-nav rounded-md px-3 py-2 text-sm font-medium'
								: 'inactive-nav rounded-md px-3 py-2 text-sm font-medium'}>Calendar</a
						>
						<a
							href="/sponsorships"
							class={active === 'sponsorships'
								? 'active-nav rounded-md px-3 py-2 text-sm font-medium'
								: 'inactive-nav rounded-md px-3 py-2 text-sm font-medium'}>Sponsorships</a
						>
						<a
							href="/gallery"
							class={active === 'gallery'
								? 'active-nav rounded-md px-3 py-2 text-sm font-medium'
								: 'inactive-nav rounded-md px-3 py-2 text-sm font-medium'}>Gallery</a
						>
					</div>
				</div>
			</div>
			<div
				class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
			>
				<!-- Profile dropdown -->
				{#if image}
					<div class="relative ml-3">
						<div>
							<button
								type="button"
								class="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
								id="user-menu-button"
								aria-expanded="false"
								aria-haspopup="true"
								on:click={() => (profile_state = !profile_state)}
							>
								<span class="absolute -inset-1.5"></span>
								<span class="sr-only">Open user menu</span>
								<img class="h-8 w-8 rounded-full" src={image} alt="" />
							</button>
						</div>

						<!--
			  Dropdown menu, show/hide based on menu state.
  
			  Entering: "transition ease-out duration-100"
				From: "transform opacity-0 scale-95"
				To: "transform opacity-100 scale-100"
			  Leaving: "transition ease-in duration-75"
				From: "transform opacity-100 scale-100"
				To: "transform opacity-0 scale-95"
			-->
						{#if profile_state}
							<div
								class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
								role="menu"
								aria-orientation="vertical"
								aria-labelledby="user-menu-button"
								tabindex="-1"
								use:clickOutside
							>
								<!-- Active: "bg-gray-100", Not Active: "" -->
								<a
									href="/account"
									class="block px-4 py-2 text-sm text-gray-700"
									role="menuitem"
									tabindex="-1"
									id="user-menu-item-0">Account</a
								>
								<a
									href="/api/auth/logout"
									class="block px-4 py-2 text-sm text-gray-700"
									role="menuitem"
									tabindex="-1"
									id="user-menu-item-2">Sign out</a
								>
							</div>
						{/if}
					</div>
				{:else}
					<a
						href="./#contact"
						class="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
						>Get involved</a
					>
					<a
						href="/api/auth/register"
						class="ml-2 rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
						>Login</a
					>
				{/if}
			</div>
		</div>
	</div>

	<!-- Mobile menu, show/hide based on menu state. -->
	{#if !state}
		<div class="sm:hidden" id="mobile-menu">
			<div class="space-y-1 px-2 pb-3 pt-2">
				<!-- Current: "base-color text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
				<a
					href="/"
					class={'block rounded-md px-3 py-2 text-base font-medium ' +
						(active === 'home'
							? 'base-color text-white'
							: 'text-gray-300 hover:bg-gray-700 hover:text-white')}
					aria-current="page">Home</a
				>
				<a
					href="/research"
					class={'block rounded-md px-3 py-2 text-base font-medium ' +
						(active === 'research'
							? 'base-color text-white'
							: 'text-gray-300 hover:bg-gray-700 hover:text-white')}>Research</a
				>
				<a
					href="/calendar"
					class={'block rounded-md px-3 py-2 text-base font-medium ' +
						(active === 'calendar'
							? 'base-color text-white'
							: 'text-gray-300 hover:bg-gray-700 hover:text-white')}>Calendar</a
				>
				<a
					href="/sponsorships"
					class={'block rounded-md px-3 py-2 text-base font-medium ' +
						(active === 'sponsorships'
							? 'base-color text-white'
							: 'text-gray-300 hover:bg-gray-700 hover:text-white')}>Sponsorships</a
				>
				<a
					href="/gallery"
					class={'block rounded-md px-3 py-2 text-base font-medium ' +
						(active === 'gallery'
							? 'base-color text-white'
							: 'text-gray-300 hover:bg-gray-700 hover:text-white')}>Gallery</a
				>
			</div>
		</div>
	{/if}
</nav>
