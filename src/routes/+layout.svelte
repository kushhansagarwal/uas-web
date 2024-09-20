<script>
	import Footer from './../lib/components/Footer.svelte';
	import '../app.pcss';

	export let newsletterForm;
</script>

<slot></slot>

<Footer {newsletterForm}></Footer>
