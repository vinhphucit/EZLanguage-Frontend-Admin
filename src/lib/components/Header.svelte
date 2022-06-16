<script>
	import {
		closeNotificationsMenu,
		closeProfileMenu,
		isProfileMenuOpen,
		toggleNotificationsMenu,
		toggleProfileMenu
	} from '$src/stores/menus';
	import { clickOutside } from '$lib/ioevents/click';
	import { keydownEscape } from '$lib/ioevents/keydown';
	import { AUTH_ACCESS_TOKEN, AUTH_REFRESH_TOKEN, localStorageSet } from '../utils/StorageUtils';
	import { goto } from '$app/navigation';
</script>

<header class="z-10 py-4 bg-white shadow-md dark:bg-gray-800">
	<div
		class="container flex items-center justify-between h-full px-6 mx-auto text-purple-600 dark:text-purple-300"
	>
		<div class="w-full">
			<ul class="flex justify-end items-center flex-shrink-0 space-x-6">
				<li class="relative">
					<button
						id="nav-profile-photo"
						class="align-middle rounded-full focus:shadow-outline-purple focus:outline-none"
						on:click={toggleProfileMenu}
						use:keydownEscape
						on:keydown-escape={closeProfileMenu}
						aria-label="Account"
						aria-haspopup="true"
					>
						<label>VP</label>

						<!-- <img class="object-cover w-8 h-8 rounded-full" aria-hidden="true" /> -->
					</button>
					{#if $isProfileMenuOpen}
						<ul
							use:clickOutside={['nav-profile-photo']}
							on:click-outside={closeNotificationsMenu}
							use:keydownEscape
							on:keydown-escape={closeNotificationsMenu}
							on:click={() => {
								localStorageSet(AUTH_REFRESH_TOKEN, undefined);
								localStorageSet(AUTH_ACCESS_TOKEN, undefined);
								
							}}
							class="absolute right-0 w-56 p-2 mt-2 space-y-2 text-gray-600 bg-white border border-gray-100 rounded-md shadow-md dark:border-gray-700 dark:text-gray-300 dark:bg-gray-700"
							aria-label="submenu"
						>
							<li class="flex">
								<a
									class="inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200"
									href={import.meta.env.VITE_LOGOUT_PATH}
								>
									<svg
										class="w-4 h-4 mr-3"
										aria-hidden="true"
										fill="none"
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<path
											d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
										/>
									</svg>
									<span>Log out</span>
								</a>
							</li>
						</ul>
					{/if}
				</li>
			</ul>
		</div>
	</div>
</header>
