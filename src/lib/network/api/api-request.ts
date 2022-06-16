import { AUTH_ACCESS_TOKEN, localStorageGet } from '$src/lib/utils/StorageUtils';
import type { ErrorResponse } from '../models/ErrorResponse';
export class ApiPath {
	public static PATH_SIGN_IN = 'auth/signIn';
	public static PATH_SIGN_OUT = 'auth/signOut';
	public static PATH_SIGN_UP = 'auth/signUp';
	public static PATH_RESET_PASSWORD = 'auth/resetPassword';
	public static PATH_CONFIRM_RESET_PASSWORD = 'auth/confirmResetPassword';
	public static PATH_VERIFY = 'auth/verifyEmail';
	public static PATH_USERS = 'users';
	public static PATH_ROLES = 'roles';
	public static PATH_PERMISSIONS = 'permissions';
	public static PATH_DECKS = 'categories';
}
export type ApiMethod = 'POST' | 'GET' | 'PUT' | 'DELETE' | 'PATCH';
export interface ApiParams {
	method: ApiMethod;
	data?: Record<string, unknown>;
}
export interface ApiResult {
	error?: ErrorResponse;
	data?;
}
export async function api(path: string, params: ApiParams): Promise<ApiResult> {
	const base = import.meta.env.VITE_BASE_AUTH_API;
	let fullurl = base;

	fullurl = `${base}${path}`;
	const token = localStorageGet(AUTH_ACCESS_TOKEN);
	const res = await fetch(fullurl, {
		method: params.method,
		headers: {
			'content-type': 'application/json',
			accept: 'application/json',
			Authorization: token ? `Bearer ${token}` : undefined
		},
		body: params.data && JSON.stringify(params.data)
	});

	if (res.ok) {
		if(res.status === 204) return {};
		return { data: await res.json() };
	} else {
		return { error: await res.json() };
	}
}
export async function apifc(path: string, params: ApiParams): Promise<ApiResult> {
	const base = import.meta.env.VITE_BASE_FLASHCARD_API;
	let fullurl = base;

	fullurl = `${base}${path}`;
	const token = localStorageGet(AUTH_ACCESS_TOKEN);
	const res = await fetch(fullurl, {
		method: params.method,
		headers: {
			'content-type': 'application/json',
			accept: 'application/json',
			Authorization: token ? `Bearer ${token}` : undefined
		},
		body: params.data && JSON.stringify(params.data)
	});

	if (res.ok) {
		if(res.status === 204) return {};
		return { data: await res.json() };
	} else {
		return { error: await res.json() };
	}
}
