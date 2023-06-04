export interface ILoginForm {
	email: string;
	password: string;
	remember?: boolean;
}

export interface IAuthResult {
	email: string;
	name: string;
	user_type: string;
	profile_image: string;
	token: string;
	token_type: string;
	refresh_token: string;
}
