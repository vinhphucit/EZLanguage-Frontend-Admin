<script context="module" lang="ts">
	import { browser } from '$app/env';

	import { AUTH_ACCESS_TOKEN, localStorageGet } from '$src/lib/utils/StorageUtils';

	import type { Load } from '@sveltejs/kit';
	export const load: Load = async ({ session }) => {
		if (browser) {
			if (!localStorageGet(AUTH_ACCESS_TOKEN)) {
				return {
					status: 302,
					redirect: '/auth/signin'
				};
			}
			return {
				props: {
					token: localStorageGet(AUTH_ACCESS_TOKEN)
				}
			};
		}
		return {
			
		}
	};
</script>


<script>
	import Header from '$lib/components/Header.svelte';
	import SideBar from '$lib/components/SideBar.svelte';
	import '../app.css';
</script>

<section id="body">
	<div class="flex bg-gray-50 h-screen">
		<aside class="z-20 hidden w-64 overflow-y-auto bg-white md:block flex-shrink-0">
			<SideBar />
		</aside>
		<div class="flex flex-col flex-1 w-full">
			<Header />

			<slot />
		</div>
	</div>
</section>

