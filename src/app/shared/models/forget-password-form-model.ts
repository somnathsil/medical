export interface IForgetPasswordForm {
	email: string;
}

export interface IForgetPasswordData {
	email: string;
	otp: number | string;
}
