export interface IAdminUserList {
	id: number;
	image?: string;
	name: string;
	email: string;
	phone_number: number;
	status: 0 | 1;
}
