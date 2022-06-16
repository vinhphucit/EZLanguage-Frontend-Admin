<script lang="ts">
	import { goto } from '$app/navigation';

	import { signUp } from '$lib/network/api/auth-api';

	import Error from '$lib/components/Error.svelte';

	let email = '';
	let password = '';
	let firstName = '';
	let lastName = '';
	let errorMessage = '';
	async function onSignUpClick() {
		const res = await signUp(email, password, firstName, lastName);
		if (!res.error) {
			goto('/');
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
						<h1 class="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">SignUp</h1>
						<div>
							<label class="block text-sm">
								<span class="text-gray-700 dark:text-gray-400">Email</span>
								<input name="email" type="email" placeholder="Email" bind:value={email} />
							</label>
							<label class="block text-sm">
								<span class="text-gray-700 dark:text-gray-400">Password</span>
								<input
									name="code"
									type="password"
									placeholder="****************"
									bind:value={password}
								/>
							</label>
							<label class="block text-sm">
								<span class="text-gray-700 dark:text-gray-400">First Name</span>
								<input
									name="firstName"
									type="text"
									placeholder="First Name"
									bind:value={firstName}
								/>
							</label>
							<label class="block text-sm">
								<span class="text-gray-700 dark:text-gray-400">Email</span>
								<input name="lastName" type="text" placeholder="Last Name" bind:value={lastName} />
							</label>
							<Error errors={[errorMessage]} />
							<!-- You should use a button here, as the anchor is only used for the example  -->
							<button class="normal" on:click={onSignUpClick}>Signup</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
