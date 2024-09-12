<script lang="ts">
	import bp2 from '$lib/assets/bp-2.svg';

	interface Sponsor {
		type: string;
		name: string;
		description: string;
		image: string;
		website: string;
		benefits: string[];
	}

	export let sponsor: Sponsor;
</script>

<div class="overflow-hidden bg-gray-900 pb-24 sm:pb-32">
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<div
			class="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2"
		>
			<div class="lg:pr-8 lg:pt-4">
				<div class="lg:max-w-lg">
					<h2 class="text-base font-semibold leading-7 text-indigo-400">{sponsor.type}</h2>
					<p class=" text-3xl font-bold tracking-tight text-white sm:text-4xl">
						{sponsor.name}
					</p>

					<p class="text-md mt-6 leading-7 text-gray-400">
						{sponsor.description}
					</p>

					<p class="mt-4 text-lg leading-8 text-gray-300">
						{sponsor.name} has helped us with:
					</p>

					<ul
						class="mt-2 mb-5 list-inside list-disc text-lg leading-8 text-gray-300 marker:text-purple-500"
					>
						{#each sponsor.benefits as benefit}
							<li>{benefit}</li>
						{/each}
					</ul>
					<a
						href={sponsor.website}
						class=" font-semibold text-indigo-400"
						target="_blank"
						rel="noopener noreferrer">Visit Website <span aria-hidden="true">&rarr;</span></a
					>
				</div>
			</div>
			<div class="flex items-center justify-center">
				<img
					src={sponsor.image}
					alt={sponsor.name}
					class="w-[48rem] max-w-96 sm:w-[57rem] md:-ml-4 lg:-ml-0"
				/>
			</div>
		</div>
	</div>
</div>
