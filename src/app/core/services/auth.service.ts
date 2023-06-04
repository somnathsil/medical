import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	constructor() {}

	isLoggedIn() {
		if (
			localStorage.getItem('JWT_TOKEN') != '' &&
			localStorage.getItem('JWT_TOKEN') != undefined
		) {
			return true;
		} else {
			return false;
		}
	}
}
