import type { Permission } from "./PermissionResponse";

export interface Role {
	id: string;
	name: string;
	permissions: [Permission];
	createdAt: string;
	updatedAt: string;
}