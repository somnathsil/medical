export interface IPatientList {
	name: string;
	email: string;
	contact: string;
	image: string;
	status: string;
	type: string;
	login_id: number;
	user_id: number;
	gender: string;
	bloog_group: string;
	dob: string;
	service_id: string;
	service_name: string;
}

export interface IPatientListParam {
	type: string;
	sort_by: string;
	filter_by: string;
	search_str: string;
	page_size: string | number;
	page_no: number;
}

export interface IPatientDetails {
	userId: number;
	email: string;
	name: string;
	contact: string | number;
	image: string;
	status: string;
	city: string;
	address: string;
	age: number;
	visited: string;
	visited_date: string | number;
	gender: string;
	bloog_group: string;
	dob: string | number;
	service_id: number;
	service_name: string;
}
