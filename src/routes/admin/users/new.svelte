<script lang="ts">
	import { goto } from '$app/navigation';

	import { createUser } from '$lib/network/api/user-api';
	import { onMount } from 'svelte';
	import { getRoles } from '$lib/network/api/role-api';
	import type { PaginableList } from '$lib/network/models/PaginableList';
	import type { Role } from '$lib/network/models/RoleResponse';

	export let email, firstName, lastName: string;
	export let roles: Role[];
	export let chosenRoles;
	onMount(async () => {
		const res = await getRoles();
		if (!res.error) {
			const paginableRole: PaginableList<Role> = res.data;
			roles = paginableRole.items;
		} else {
		}
	});
	async function onCreateClick() {
		console.log('chosenRoles');
		console.log(chosenRoles);
		const res = await createUser(email, firstName, lastName, chosenRoles);
		if (!res.error) {
			goto(`/admin/users`);
		} else {
		}
	}
</script>

<div class="container  max-w-3xl py-20 mx-auto">
	<h2 class="mt-4 mb-4 text-3xl font-extrabold text-gray-900">Create New User</h2>
	<div>
		<label for="iEmail">
			Email
			<aabr title="Required">*</aabr>
		</label>
		<input type="email" id="iEmail" bind:value={email} />
	</div>
	<div>
		<label for="">
			FirstName
			<aabr title="Required">*</aabr>
		</label>
		<input type="text" bind:value={firstName} />
	</div>
	<div>
		<label for="">
			LastName
			<aabr title="Required">*</aabr>
		</label>
		<input type="text" bind:value={lastName} />
	</div>
	<div>
		<label for=""> Roles </label>

		<select
			bind:value={chosenRoles}
			class="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-multiselect focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
			multiple
		>
			{#if roles}
				{#each roles as role}
					<option value={role.id}>
						{role.name}
					</option>
				{/each}
			{/if}
		</select>
	</div>
	<div class="flex pt-3 space-x-3 ">
		<button
			on:click={() => {
				goto('/admin/users');
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
