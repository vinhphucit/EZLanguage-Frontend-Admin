import { apifc, ApiPath, type ApiResult } from './api-request';

export async function getDecks(start = 0, limit = 10): Promise<ApiResult> {
	return apifc(`${ApiPath.PATH_DECKS}?start=${start}&limit=${limit}`, {
		method: 'GET'
	});
}
export async function deleteDeck(id: string): Promise<ApiResult> {
	return apifc(`${ApiPath.PATH_DECKS}/${id}`, {
		method: 'DELETE'
	});
}
export async function createDeck(title: string, description: string): Promise<ApiResult> {
	return apifc(`${ApiPath.PATH_DECKS}`, {
		method: 'POST',
		data: {
			title,
			description
		}
	});
}
