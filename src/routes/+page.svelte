<script lang="ts">
	import SponsorList from './../lib/components/SponsorList.svelte';
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

        if (localStorage.getItem("file_code")) {
			const url = localStorage.getItem("file_code");
			localStorage.removeItem("file_code");
            goto(`/file/add/${url}`);
        }
	});
</script>

<Hero {image}></Hero>
<InlineGallery></InlineGallery>
<Sec1></Sec1>
<SponsorList></SponsorList>
<Sec2></Sec2>
<Sec3></Sec3>
<Team></Team>
<Contact></Contact>
