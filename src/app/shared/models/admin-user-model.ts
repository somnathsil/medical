export interface IAdminUserList {
	name: string;
	email: string;
	contact: string;
	image: string;
	status: string;
	type: string;
	login_id: number;
	user_id: number;
}

export interface IAdminUserListParam {
	type: string;
	sort_by: string;
	filter_by: string;
	search_str: string;
	page_size: string | number;
	page_no: number;
}
