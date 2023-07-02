export interface IAppointmentList {
	id: number;
	image: string;
	name: string;
	email: string;
	phone_number: number;
	service: string;
	doctor: string;
	appointment_date: string;
	gender: string;
}

export interface IService {
	id: number;
	label: string;
}

export interface IDoctor {
	id: number;
	label: string;
}

export interface IDisease {
	id: number;
	label: string;
}

export interface IDepartment {
	id: number;
	label: string;
}

export interface IGender {
	id: number;
	label: 'Male' | 'Female';
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
