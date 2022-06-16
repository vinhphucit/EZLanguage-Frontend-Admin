<script lang="ts">
	import { goto } from '$app/navigation';
	import { createPermission, getPermissions } from '$lib/network/api/permission-api';
	import Error from '$lib/components/Error.svelte';
	import { onMount } from 'svelte';
	import type { Permission } from '$lib/network/models/PermissionResponse';
	import type { PaginableList } from '$lib/network/models/PaginableList';
	import { createRole } from '$src/lib/network/api/role-api';

	export let name, code: string;
	export let permissions: Permission[];
	export let chosenPermissions;
	let errorMessage = '';

	onMount(async () => {
		const res = await getPermissions(0,100);
		if (!res.error) {
			const paginableRole: PaginableList<Permission> = res.data;
			permissions = paginableRole.items;
		} else {
		}
	});

	async function onCreateClick() {
		const res = await createRole(
			name,
			permissions.map((i) => i.code)
		);
		if (!res.error) {
			goto(`/admin/roles`);
		} else {
			errorMessage = res.error.description;
		}
	}
</script>

<div class="container  max-w-3xl py-20 mx-auto">
	<h2 class="mt-4 mb-4 text-3xl font-extrabold text-gray-900">Create New Role</h2>
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
		<select
			bind:value={chosenPermissions}
			class="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-multiselect focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
			multiple
		>
			{#if permissions}
				{#each permissions as p}
					<option value={p.code}>
						{p.code}
					</option>
				{/each}
			{/if}
		</select>
	</div>
	<Error errors={[errorMessage]} />
	<div class="flex pt-3 space-x-3 ">
		<button
			on:click={() => {
				goto('/admin/roles');
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
