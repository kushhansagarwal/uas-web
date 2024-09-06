<script lang="ts">
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

	let authenticated = false;
	let image: string | null = null;

	export let data;

	onMount(() => {
		if (data.isAuthenticated) {
			authenticated = true;
			image = data.user.picture;
		}
	});
</script>

<Hero {image}></Hero>
<InlineGallery></InlineGallery>
<div class="bg-white mt-8">
	<div class="mx-auto max-w-7xl bg-white">
		<div
			class="grid grid-cols-1 gap-12 rounded-xl bg-white p-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3"
		>
			{#each Array(6)
				.fill(0)
				.map((_, n) => n) as n}
				<div class="">
					<img
						src={`src/lib/assets/sponsors/sponsor-${n + 1}.svg`}
						alt={`Sponsor ${n}`}
						class="h-auto w-full p-4"
					/>
				</div>
			{/each}
		</div>
	</div>
</div>
<Sec1></Sec1>
<Sec2></Sec2>
<Sec3></Sec3>
<Team></Team>
<Contact></Contact>
