import type { Role } from "./RoleResponse";

export interface User {
	id: string;
	firstName: string;
	lastName: string;
	title: string;
	address: string;
	email: string;
	mobile: string;
	status: string;
	roles: Role[];
	createdAt: string;
	updatedAt: string;
}
