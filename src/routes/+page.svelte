<script lang="ts">
	import Sec1 from './../lib/components/Sec1.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import Sec2 from '$lib/components/Sec2.svelte';
	import Sec3 from '$lib/components/Sec3.svelte';
	import Team from '$lib/components/Team.svelte';
	import Sponsor from '$lib/components/Sponsor.svelte';
	import Newsletter from '$lib/components/Newsletter.svelte';
	import Contact from '$lib/components/Contact.svelte';

	let state = true;
	let profile_state = false;
</script>


<Hero></Hero>
<Sec1></Sec1>
<Sec3></Sec3>
<Team></Team>
<!-- <Sponsor></Sponsor> -->
<Newsletter></Newsletter>
<Contact></Contact>
