import { api, ApiPath, type ApiResult } from './api-request';

export async function getRoles(start = 0, limit = 10): Promise<ApiResult> {
	return api(`${ApiPath.PATH_ROLES}?start=${start}&limit=${limit}`, {
		method: 'GET'
	});
}
export async function deleteRole(roleId: string): Promise<ApiResult> {
	return api(`${ApiPath.PATH_ROLES}/${roleId}`, {
		method: 'DELETE'
	});
}
export async function createRole(name: string, permissions: string[]): Promise<ApiResult> {
	return api(`${ApiPath.PATH_ROLES}`, {
		method: 'POST',
		data: {
			name,
			permissions
		}
	});
}
