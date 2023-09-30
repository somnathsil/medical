export interface IAppointmentList {
	name: string;
	email: string;
	contact: string | number;
	image: string;
	status: string;
	appoiment_date: string;
	gender: string;
	service_name: string;
	doctor_name: string;
	appoint_id: number;
}

export interface IAppointmentListParam {
	sort_by: string;
	filter_by: string;
	search_str: string;
	page_size: string | number;
	page_no: number;
}

export interface IService {
	id: number;
	label?: string;
	name?: string;
}

export interface IDoctor {
	// id: number;
	// label: string;
	doc_id: string;
	doc_name: string;
}

export interface IDisease {
	id: number;
	name: string;
}

export interface IDepartment {
	id: number;
	label: string;
}

export interface IGender {
	id: number;
	label: 'Male' | 'Female';
	value?: string;
}

export interface ICity {
	id: number;
	label: string;
}

export interface IBloodGroup {
	id: number;
	label: string;
}

export interface IVisit {
	id: number;
	label: 'Yes' | 'No';
}
