import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
	HttpErrorResponse,
	HttpClient
} from '@angular/common/http';
// import { AuthService } from '@shared/services/auth/auth.service';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import {
	catchError,
	filter,
	take,
	switchMap,
	timeout,
	tap
} from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	// private isRefreshing = false;
	// private refreshTokenSubject: BehaviorSubject<any> =
	// 	new BehaviorSubject<any>(null);

	JWT: string | null = localStorage.getItem('JWT_TOKEN');

	constructor(private router: Router, private http: HttpClient) {}

	intercept(
		request: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		if (this.JWT) {
			// console.log(this.JWT);
			request = this.addToken(request, this.JWT);
		}
		// return next.handle(request);

		/* Calling Refresh Token */
		return next.handle(request).pipe(
			// catchError((error) => {
			// 	if (
			// 		error instanceof HttpErrorResponse &&
			// 		error.status === 401
			// 	) {
			// 		if (request.url.includes('/admin/regenerateToken')) {
			// 			localStorage.removeItem('JWT_TOKEN');
			// 			localStorage.removeItem('REFRESH_TOKEN');
			// 			location.reload();
			// 			this.router.navigate(['/']);
			// 			return;
			// 		}
			// 		return this.handle401Error(request, next);
			// 	}
			// })
			catchError((err) => {
				if (err instanceof HttpErrorResponse && err.status === 401) {
					if (request.url.includes('regenerateToken')) {
						localStorage.removeItem('JWT_TOKEN');
						localStorage.removeItem('REFRESH_TOKEN');
						location.reload();
						this.router.navigate(['/']);
					}
					return this.handle401Error(request, next);
				}
				// return throwError(() => new Error(err));
				return throwError(() => err);
			})
		);
	}

	/* Set Header */
	private addToken(request: HttpRequest<any>, token: string) {
		return request.clone({
			setHeaders: {
				Authorization: `Bearer ${token}`
			}
		});
	}

	/* Refresh Token */
	private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
		return this.refreshToken().pipe(
			switchMap((token: any) => {
				return next.handle(
					this.addToken(request, token.response.dataset.token)
				);
			})
		);
	}

	refreshToken() {
		return this.http
			.post<any>(`${environment.host}regenerateToken`, {
				refreshToken: localStorage.getItem('REFRESH_TOKEN')
			})
			.pipe(
				timeout(3000),
				tap((tokens: any) => {
					this.storeTokens(tokens.response.dataset);
				})
			);
	}

	private storeTokens(tokens: Tokens[]) {
		console.log(tokens[0]);
		localStorage.setItem('JWT_TOKEN', tokens[0].token);
		localStorage.setItem('REFRESH_TOKEN', tokens[0].refresh_token);
	}
}

interface Tokens {
	token: string;
	refresh_token: string;
}
