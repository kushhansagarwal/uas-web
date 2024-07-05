<script lang="ts">
	import john from '$lib/assets/team/john.jpg';
	import kush from '$lib/assets/team/kush.jpg';
	import nathan from '$lib/assets/team/nathan.jpg';
	import steven from '$lib/assets/team/steven.jpg';
	import aiden from '$lib/assets/team/aiden.jpg';
	import kevin from '$lib/assets/team/kevin.jpg';
	import samuel from '$lib/assets/team/samuel.jpg';
	import aniket from '$lib/assets/team/aniket.jpg';
	import sean from '$lib/assets/team/sean.jpg';
	import edgar from '$lib/assets/team/edgar.jpg';

	let team = [
		{ name: 'Kush Agarwal', img: kush, role: 'President', notes: 'Aerospace Engineering' },
		{ name: 'Nathan Chan', img: nathan, role: 'Vice President', notes: 'Computer Science' },
		{ name: 'John Nitsos', img: john, role: 'Chief Technology Officer', notes: 'Electrical Engineering' },
		{ name: 'Steven Wen', img: steven, role: 'Publicity', notes: 'Materials Engineering' },
		{ name: 'Aiden Wong', img: aiden, role: 'Webmaster', notes: 'Computer Science' },
		{ name: 'Kevin Chen', img: kevin, role: 'Secretary', notes: 'Computer Science' },
		{ name: 'Samuel Wu', img: samuel, role: 'Social Chair', notes: 'Mechanical Engineering' },
		{ name: 'Aniket Verma', img: aniket, role: 'R&D Lead', notes: 'Aerospace Engineering' },
		{ name: 'Sean Son', img: sean, role: 'Vision Lead', notes: 'Computer Science' },
		{ name: 'Edgar Reyes', img: edgar, role: 'Hardware Lead', notes: 'Mechanical Engineering' },
	];
</script>

<div class="bg-gray-900 py-24 sm:py-32">
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<div class="mx-auto max-w-2xl lg:mx-0">
			<h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl">Our team</h2>
			<p class="mt-6 text-lg leading-8 text-gray-300">
				We’re a dynamic group of individuals who are passionate about what we do and dedicated to
				delivering the best results for our clients.
			</p>
		</div>
		<ul
			role="list"
			class="mx-auto mt-20 grid max-w-2xl grid-cols-2 gap-4 md:gap-8 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 xl:grid-cols-4"
		>
			{#each team as member}
				<li>
					<img
						class="aspect-[14/13] w-full rounded-md object-cover"
						src={member.img}
						alt={member.name}
					/>
					<h3 class="mt-6 text-lg font-semibold leading-8 tracking-tight text-white">
						{member.name}
					</h3>
					<p class="text-base leading-7 text-gray-300">{member.role}</p>
					<p class="text-sm leading-6 text-gray-500">{member.notes}</p>
				</li>
			{/each}

			<!-- More people... -->
		</ul>
	</div>
</div>
