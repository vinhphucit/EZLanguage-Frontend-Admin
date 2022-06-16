import { api, ApiPath, type ApiResult } from './api-request';

export async function getPermissions(start = 0, limit = 10): Promise<ApiResult> {
	return api(`${ApiPath.PATH_PERMISSIONS}?start=${start}&limit=${limit}`, {
		method: 'GET'
	});
}
export async function deletePermission(id: string): Promise<ApiResult> {
	return api(`${ApiPath.PATH_PERMISSIONS}/${id}`, {
		method: 'DELETE'
	});
	
}
export async function createPermission(name: string, code: string): Promise<ApiResult> {
	return api(`${ApiPath.PATH_PERMISSIONS}`, {
		method: 'POST',
		data: {
			name,
			code
		}
	});	
}
