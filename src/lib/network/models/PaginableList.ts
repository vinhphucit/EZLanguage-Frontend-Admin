export interface PaginableList<T> {
	start: number;
	limit: number;
	totalItems: number;
	items: T[];
}
