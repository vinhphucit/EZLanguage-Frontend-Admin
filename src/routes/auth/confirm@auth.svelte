<script lang="ts">

	import { goto } from '$app/navigation';


	import { confirmResetPassword } from '$lib/network/api/auth-api';

	import Error from '$lib/components/Error.svelte';
	import type { SignInResponse } from '$lib/network/models/SignInResponse';

	let email = '';
	let token = '';
	let password = '';
	let errorMessage = '';
	
	async function onConfirmClick() {
		const res = await confirmResetPassword(email, token, password);
		if (!res.error) {
			goto('/')			
		} else {
			errorMessage = res.error.description;
		}
		
	}
</script>

<section id="body">
	<div class="flex items-center min-h-screen p-6 bg-gray-600">
		<div class="flex-1 mx-auto">
			<div class="flex-1 h-full max-w-2xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl">
				<div class="flex items-center justify-center p-6 sm:p-12">
					<div class="w-full">
						<h1 class="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">Verify Email</h1>
						<div>
							<label class="block text-sm">
								<span class="text-gray-700 dark:text-gray-400">Email</span>
								<input name="email" type="email" placeholder="Email" bind:value={email} />
							</label>
							<label class="block text-sm">
								<span class="text-gray-700 dark:text-gray-400">Code</span>
								<input name="code" type="text" placeholder="ActivationCode" bind:value={token} />
							</label>
							<label class="block text-sm">
								<span class="text-gray-700 dark:text-gray-400">Password</span>
								<input name="password" type="password" placeholder="********" bind:value={password} />
							</label>
							<Error errors={[errorMessage]} />
							<!-- You should use a button here, as the anchor is only used for the example  -->
							<button class="normal" on:click={onConfirmClick}>Confirm</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
