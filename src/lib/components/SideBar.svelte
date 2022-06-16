<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { pageMenus, togglePageMenu } from '$stores/menus';

	const appName = import.meta.env.VITE_APP_NAME;
	export let links = [
		{
			name: 'Dashboard',
			url: '/',
			svg: [
				'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
			]
		},
		{
			name: 'Users',
			url: '/admin/users',
			svg: [
				'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
			]
		},
		{
			name: 'Roles',
			url: '/admin/roles',
			svg: [
				'M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z'
			]
		},
		{
			name: 'Permissions',
			url: '/admin/permissions',
			svg: [
				'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
			]
		},
		{
			name: 'Decks',
			url: '/flashcard/decks',
			svg: [
				'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10'
			]
		}
	];

	$: changeLink = (link: any) => {
		goto(link.url);
	};

	$: isMainLink = (link: any) => {
		if (!link.url) {
			return false;
		}
		return link.url === activeUrl.pathname;
	};

	$: isChildLink = (link: any) => {
		if (!link.url) {
			return false;
		}
		return activeUrl.pathname.indexOf(link.url, 0) >= 0;
	};
	$: activeUrl = $page.url;
</script>

<div class="py-4 text-gray-500 dark:text-gray-400">
	<a class="ml-6 text-lg font-bold text-gray-800" href="/">{appName}</a>
	<ul class="mt-6">
		{#each links as link, a}
			<li class="relative px-6 py-3">
				{#if isMainLink(link)}
					<span
						class="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
						aria-hidden="true"
					/>
				{/if}

				<a
					class="{isMainLink(link) &&
						'text-gray-800 dark:text-gray-100'} inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
					href={link.url}
					on:click={(e) => {
						e.preventDefault();
						changeLink(link);
					}}
				>
					{#if link.svg}
						<svg
							class="w-5 h-5"
							aria-hidden="true"
							fill="none"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							{#each link.svg as s, b}
								<path d={s} />
							{/each}
						</svg>
					{/if}
					<span class="ml-4">{link.name}</span>
				</a>
			</li>
		{/each}
	</ul>
</div>
