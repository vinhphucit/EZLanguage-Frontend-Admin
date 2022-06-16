<script lang="ts">
	import { goto } from '$app/navigation';
	import { createPermission } from '$lib/network/api/permission-api';
	import Error from '$lib/components/Error.svelte';

	export let name ='', code='';
	let errorMessage = '';
	async function onCreateClick() {
		const res = await createPermission(name, code);
		if (!res.error) {
			// goto(`/admin/permissions`);
		} else {
			errorMessage = res.error.description;
		}
	}
</script>

<div class="container  max-w-3xl py-20 mx-auto">
	<h2 class="mt-4 mb-4 text-3xl font-extrabold text-gray-900">Create New Permission</h2>
	<div>
		<label for="">
			Name
			<aabr title="Required">*</aabr>
		</label>
		<input type="text" bind:value={name} />
	</div>
	<div>
		<label for="">
			Code
			<aabr title="Required">*</aabr>
		</label>
		<input type="text" bind:value={code} />
	</div>
	<Error errors={[errorMessage]} />
	<div class="flex pt-3 space-x-3 ">
		<button
			on:click={() => {
				goto('/admin/permissions');
			}}
			class="normal">Back</button
		><button on:click={onCreateClick} class="normal">Create new</button>
	</div>
</div>

<style>
	label {
		@apply block text-gray-700;
	}
	aabr {
		@apply font-normal text-red-500;
	}

	button {
		@apply flex justify-center font-medium border transition-colors;
	}
</style>
