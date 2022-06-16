
<script context="module" lang="ts">
	import { browser } from '$app/env';

	import { AUTH_ACCESS_TOKEN, localStorageGet } from '$src/lib/utils/StorageUtils';

	import type { Load } from '@sveltejs/kit';
	export const load: Load = async ({ session }) => {
		if (browser) {
			if (localStorageGet(AUTH_ACCESS_TOKEN)) {
				return {
					status: 302,
					redirect: '/'
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
<slot />
