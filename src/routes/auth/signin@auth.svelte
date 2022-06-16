<script lang="ts">
	import { browser } from '$app/env';
	import { goto } from '$app/navigation';

	import { session } from '$app/stores';
	import {
		AUTH_ACCESS_TOKEN,
		AUTH_REFRESH_TOKEN,
		localStorageSet
	} from '$src/lib/utils/StorageUtils';
	import { signIn } from '$lib/network/api/auth-api';

	import Error from '$lib/components/Error.svelte';
	import type { SignInResponse } from '$lib/network/models/SignInResponse';

	let email = '';
	let password = '';
	let errorMessage = '';
	async function onSignInClick() {
		const res = await signIn(email, password);
		if (!res.error) {
			const data: SignInResponse = res.data;
			localStorageSet(AUTH_ACCESS_TOKEN, data.accessToken);
			localStorageSet(AUTH_REFRESH_TOKEN, data.refreshToken);
			if (browser) {
			}
		} else {
			errorMessage = res.error.description;
		}
		goto('/');
	}
</script>

<section id="body">
	<div class="flex items-center min-h-screen p-6 bg-gray-600">
		<div class="flex-1 mx-auto">
			<div class="flex-1 h-full max-w-2xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl">
				<div class="flex items-center justify-center p-6 sm:p-12">
					<div class="w-full">
						<h1 class="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">SignIn</h1>
						<div>
							<label class="block text-sm">
								<span class="text-gray-700 dark:text-gray-400">Email</span>
								<input name="email" type="email" placeholder="Jane Doe" bind:value={email} />
							</label>
							<label class="block mt-4 text-sm">
								<span class="text-gray-700 dark:text-gray-400">Password</span>
								<input
									name="password"
									placeholder="***************"
									type="password"
									bind:value={password}
								/>
							</label>
							<Error errors={[errorMessage]} />
							<!-- You should use a button here, as the anchor is only used for the example  -->
							<button class="normal" on:click={onSignInClick}>Sign In</button>
						</div>

						<p class="mt-4">
							<a class="auth" href="./reset"> Forgot your password? </a>
						</p>
						<p class="mt-1">
							<a class="auth" href="./signup"> Create account </a>
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
