import { api, ApiPath, type ApiResult } from './api-request';

export async function getUsers(start = 0, limit = 10): Promise<ApiResult> {
	return api(`${ApiPath.PATH_USERS}?start=${start}&limit=${limit}`, {
		method: 'GET'
	});
}
export async function deleteUser(userId: string): Promise<ApiResult> {
	return api(`${ApiPath.PATH_USERS}/${userId}`, {
		method: 'DELETE'
	});
}
export async function createUser(
	email: string,
	firstName: string,
	lastName: string,
	roles: string[]
): Promise<ApiResult> {
	if (!roles) roles = [];
	const convertedRoles = roles.map((i) => {
		return { id: i };
	});
	console.log(convertedRoles);
	return api(`${ApiPath.PATH_USERS}`, {
		method: 'POST',
		data: {
			email,
			firstName,
			lastName,
			roles: convertedRoles
		}
	});
}
