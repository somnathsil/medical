export interface IUserType {
	id: string | number;
	name: string;
	value: string;
}

export interface IRegisterForm {
	name: string;
	email: string;
	password: string;
	con_password: string;
	type: string; // A= admin, P= patient, D= Doctor
}

export interface IRegisterData {
	user_id: number;
}
