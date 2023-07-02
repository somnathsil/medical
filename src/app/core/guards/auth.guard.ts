import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {
	CanActivate,
	ActivatedRouteSnapshot,
	RouterStateSnapshot,
	UrlTree,
	Router
} from '@angular/router';
import { AuthService } from '../services';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private _router: Router, private _authService: AuthService) {}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	):
		| Observable<boolean | UrlTree>
		| Promise<boolean | UrlTree>
		| boolean
		| UrlTree {
		/**
		 * *Auth Guard to prevent unauthorized user
		 *
		 * @date 21 June 2023
		 * @developer
		 */
		const isLoggedIn = this._authService.isLoggedIn();
		if (isLoggedIn) {
			// authorised so return true
			return true;
		}
		this._router.navigate(['/login']);
		return false;
	}
}
