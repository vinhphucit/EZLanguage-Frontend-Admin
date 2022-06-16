import type { SignInResponse } from '../models/SignInResponse';
import { api, ApiPath, type ApiResult } from './api-request';

export async function signIn(email: string, password: string): Promise<ApiResult> {
	return api(ApiPath.PATH_SIGN_IN, {
		method: 'POST',
		data: {
			email,
			password
		}
	});
}

export async function signUp(
	email: string,
	password: string,
	firstName: string,
	lastName: string
): Promise<ApiResult> {
	return api(ApiPath.PATH_SIGN_UP, {
		method: 'POST',
		data: {
			email,
			password,
			firstName,
			lastName
		}
	});
}

export async function verify(email: string, code: string): Promise<ApiResult> {
	return api(ApiPath.PATH_VERIFY, {
		method: 'POST',
		data: {
			email,
			code
		}
	});
}


export async function confirmResetPassword(email: string, token: string, password: string): Promise<ApiResult> {
	return api(ApiPath.PATH_CONFIRM_RESET_PASSWORD, {
		method: 'POST',
		data: {
			email,
			token,
			password
		}
	});
}

export async function resetPassword(email: string): Promise<ApiResult> {
	return api(ApiPath.PATH_RESET_PASSWORD, {
		method: 'POST',
		data: {
			email
		}
	});
}
