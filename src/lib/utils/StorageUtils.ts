import { browser } from '$app/env';

export const AUTH_ACCESS_TOKEN = 'auth_access_token';
export const AUTH_REFRESH_TOKEN = 'auth_refresh_token';

export const localStorageGet = (key: string): string | undefined => {
	if (browser) {
		const item = localStorage.getItem(key);
		if (item) {
			return item;
		}
	}
	return undefined;
};
export const localStorageSet = (key: string, value: string): void => {
	if (browser) {
		if (!value) localStorage.removeItem(key);
		else localStorage.setItem(key, value);
	}
};
