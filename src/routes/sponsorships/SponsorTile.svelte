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

<div class="overflow-hidden rounded-lg border border-gray-800 base-color p-8 transition-transform duration-300 hover:scale-105 hover:bg-gray-800">
	<div class="">
		<div class="grid grid-cols-1 opacity-80 hover:opacity-100">
			<div class="flex items-center justify-center">
				<img
					src={sponsor.image}
					alt={sponsor.name}
					class="mb-10 p-10 mt-5 w-[48rem] max-w-96 sm:w-[57rem] md:-ml-4 lg:-ml-0"
				/>
			</div>
			<div class="lg:pr-8 lg:pt-4">
				<div class="lg:max-w-lg">
					<h2 class="text-base font-semibold leading-7 text-indigo-400">{sponsor.type}</h2>
					<p class=" text-3xl font-bold tracking-tight text-white sm:text-4xl">
						{sponsor.name}
					</p>

					<p class="text-md mt-6 leading-7 text-gray-400">
						{sponsor.description}
					</p>

					<p class="mt-4 leading-8 text-gray-300">
						{sponsor.name} has helped us with:
					</p>

					<ul
						class="mb-5 mt-2 list-inside list-disc leading-6 text-gray-300 marker:text-purple-500"
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
		</div>
	</div>
</div>
