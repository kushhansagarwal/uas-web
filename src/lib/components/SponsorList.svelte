<script lang="ts">
	import aiaa from '$lib/assets/sponsors/aiaa.svg';
	import northrop from '$lib/assets/sponsors/northrop.svg';
	import holybro from '$lib/assets/sponsors/holybro.svg';
	import fetch from '$lib/assets/sponsors/fetch.svg';
	import innovationlab from '$lib/assets/sponsors/innovationlab.svg';
	import uclaalum from '$lib/assets/sponsors/ucla-alum.svg';
	import solidworks from '$lib/assets/sponsors/solidworks.svg';
	import boeing from '$lib/assets/sponsors/boeing.svg';

	const sponsors = [aiaa, northrop, holybro, fetch, innovationlab, uclaalum, solidworks, boeing];
</script>

<div class="mx-auto max-w-7xl px-10 pt-10 text-center">
	<h2 class="text-base font-semibold leading-7 text-indigo-400">Our Sponsors</h2>
	<p class="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
		Thank you to our generous sponsors!
	</p>
	<p class="mt-6 text-lg leading-8 text-gray-300">
		Our sponsors help us with funding and resources to continue our research and development. To learn more about our sponsors and to become a sponsor, visit our
		<a href="/sponsorships" class="text-indigo-400">sponsorship page</a>.
	</p>
	<div
		class="grid grid-cols-4 gap-20 p-10 opacity-100 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4"
	>
		{#each sponsors as sponsor}
			<img src={sponsor} alt={sponsor} />
		{/each}
	</div>
</div>
