<script lang="ts">
	import { LoadingStatus } from '$lib/enums/LoadingStatus';

	import { deleteUser, getUsers } from '$lib/network/api/user-api';
	import type { PaginableList } from '$lib/network/models/PaginableList';
	import type { User } from '$lib/network/models/UserResponse';

	import { onMount } from 'svelte';
	import { prop_dev } from 'svelte/internal';

	export let loaderStatus: LoadingStatus = LoadingStatus.LOADING;
	export let data: PaginableList<User>;
	export let currentPage: number;
	export let maxPage: number;
	export let itemPerPage: number = 10;
	onMount(async () => {
		const res = await onGetUsersClick();
	});
	async function onGetUsersClick(page = 0) {
		const res = await getUsers(page * itemPerPage, itemPerPage);
		if (!res.error) {			
			data = res.data
			currentPage = page;
			maxPage = Math.floor(data.totalItems / data.limit) + 1;

			loaderStatus = LoadingStatus.FINISH;
		} else {
			loaderStatus = LoadingStatus.ERROR;
		}
	}
	async function onDeleteUserClick(userId: string) {
		const res = await deleteUser(userId);
		if (!res.error) {
			onGetUsersClick(currentPage);
		}
	}
</script>

<main class="h-full pb-16 overflow-y-auto">
	<div class="container grid px-6 mx-auto">
		<div class="flex justify-between items-center mt-6">
			<h2 class="text-2xl font-semibold text-gray-700 dark:text-gray-200">Users</h2>
			<a
				class="p-4 mb-8 text-sm font-semibold text-purple-100 bg-purple-600 rounded-lg shadow-md focus:outline-none focus:shadow-outline-purple"
				href="/admin/users/new"
			>
				Create New User</a
			>
		</div>
		{#if loaderStatus == LoadingStatus.LOADING}
			<div>Loading</div>
		{:else if loaderStatus == LoadingStatus.ERROR}
			<div>ERROR</div>
		{:else}
			<div class="w-full mb-8 overflow-hidden rounded-lg shadow-xs">
				<div class="w-full overflow-x-auto">
					<table class="w-full whitespace-no-wrap">
						<thead>
							<tr
								class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800"
							>
								<th class="px-4 py-3" />
								<th class="px-4 py-3">User</th>
								<th class="px-4 py-3">Role</th>
								<th class="px-4 py-3">Status</th>
								<th class="w-1 py-3">Actions</th>
							</tr>
						</thead>
						<tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
							{#each data.items as prop, index}
								<tr class="text-gray-700 dark:text-gray-400">
									<td class="px-4 py-3">
										{currentPage * itemPerPage + index + 1}
									</td>
									<td class="px-4 py-3">
										<a href="/admin/users/{prop.id}">
											<div>
												<p class="font-semibold">{prop.email}</p>
												<p class="text-xs text-gray-600 dark:text-gray-400">
													{prop.firstName}
													{prop.lastName}
												</p>
											</div>
										</a>
									</td>
									<td class="px-4 py-3">
										<div>
											{#if prop.roles}
												{#each prop.roles as r}
													<p class="text-xs text-gray-600 dark:text-gray-400">
														{r.name}
													</p>
												{/each}
											{/if}
										</div>
									</td>
									<td class="px-4 py-3 text-xs">
										{#if prop.status === 'Active'}
											<span
												class="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100"
												>{prop.status}</span
											>
										{:else if prop.status === 'Not Active'}
											<span
												class="px-2 py-1 font-semibold leading-tight text-orange-700 bg-orange-100 rounded-full dark:text-white dark:bg-orange-600"
												>{prop.status}</span
											>
										{:else}
											<span
												class="px-2 py-1 font-semibold leading-tight text-gray-700 bg-gray-100 rounded-full dark:text-gray-100 dark:bg-gray-700"
												>{prop.status}</span
											>
										{/if}
									</td>

									<td class="py-3 w-auto">
										<div class="flex justify-between">
											<button
												class="px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg focus:outline-none focus:shadow-outline-gray"
												aria-label="Edit"
											>
												<svg
													class="w-5 h-5"
													aria-hidden="true"
													fill="currentColor"
													viewBox="0 0 20 20"
												>
													<path
														d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
													/>
												</svg>
											</button>
											<button
												class="px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg focus:outline-none focus:shadow-outline-gray"
												on:click={() => {
													onDeleteUserClick(prop.id);
												}}
												aria-label="Delete"
											>
												<svg
													class="w-5 h-5"
													aria-hidden="true"
													fill="currentColor"
													viewBox="0 0 20 20"
												>
													<path
														fill-rule="evenodd"
														d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
														clip-rule="evenodd"
													/>
												</svg>
											</button>
										</div>
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
				<div
					class="grid px-4 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800"
				>
					<span class="flex items-center col-span-3">
						There are total {data.totalItems} items
					</span>
					<span class="col-span-2" />
					<!-- Pagination -->
					<span class="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
						<nav aria-label="Table navigation">
							<ul class="inline-flex items-center">
								<li>
									<button
										class="px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple"
										disabled={currentPage === 0}
										aria-label="Previous"
										on:click={() => {
											onGetUsersClick(currentPage - 1);
										}}
									>
										<svg aria-hidden="true" class="w-4 h-4 fill-current" viewBox="0 0 20 20">
											<path
												d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
												clip-rule="evenodd"
												fill-rule="evenodd"
											/>
										</svg>
									</button>
								</li>
								{#each { length: maxPage } as _, i}
									<li>
										<button
											disabled={currentPage === i}
											on:click={() => {
												onGetUsersClick(i);
											}}
											class:active={currentPage === i}
											class:disable={currentPage !== i}
										>
											{i + 1}
										</button>
									</li>
								{/each}

								<li>
									<button
										class="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple"
										disabled={currentPage === maxPage - 1}
										on:click={() => {
											onGetUsersClick(currentPage + 1);
										}}
										aria-label="Next"
									>
										<svg class="w-4 h-4 fill-current" aria-hidden="true" viewBox="0 0 20 20">
											<path
												d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
												clip-rule="evenodd"
												fill-rule="evenodd"
											/>
										</svg>
									</button>
								</li>
							</ul>
						</nav>
					</span>
				</div>
			</div>
		{/if}
	</div>
</main>

<style>
	button.disable {
		@apply px-3 py-1 rounded-md;
	}

	button.active {
		@apply px-3 py-1 text-white transition-colors duration-150 bg-purple-600 border border-r-0 border-purple-600 rounded-md;
	}
</style>
