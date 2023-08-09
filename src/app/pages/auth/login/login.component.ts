import {
	AfterViewInit,
	Component,
	ElementRef,
	OnDestroy,
	OnInit,
	ViewChild
} from '@angular/core';
import {
	FormBuilder,
	FormControl,
	FormGroup,
	Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService, HttpService, ToasterService } from '@app/core/services';
import { fadeInOut } from '@app/shared/animations';
import { IAuthResult, ILoginForm } from '@app/shared/models';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { SimpleCookieService } from 'simple-cookie-service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
	animations: [fadeInOut]
})
export class LoginComponent implements OnInit, AfterViewInit, OnDestroy {
	public submitted = false;
	public isDisabled = false;
	public loginForm!: FormGroup;
	public toggleInputType = false;
	private rememberMe!: boolean;
	private subscriptios: Subscription[] = [];
	@ViewChild('inputFocus') inputFocus!: ElementRef;

	constructor(
		private _router: Router,
		private _formBuilder: FormBuilder,
		private _commonService: CommonService,
		private _http: HttpService,
		private _toast: ToasterService,
		private _loader: LoadingBarService
	) {}

	ngOnInit(): void {
		this.initLoginForm();
	}

	ngAfterViewInit(): void {
		this.inputFocus.nativeElement.focus();
		this._commonService.setLoadingStatus(false);
	}

	/**
	 * *Initializing form controls and validation in login form
	 *
	 * @date 31 Aug 2022
	 * @developer Somnath Sil
	 */
	private initLoginForm() {
		this.loginForm = this._formBuilder.group({
			email: new FormControl('', [
				Validators.required,
				Validators.pattern(
					/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
				)
			]),
			password: new FormControl('', [Validators.required]),
			rememberMe: new FormControl(false)
		});
		this.rememberMeDataPatch();
	}

	/**
	 * *Setting remember me data patch
	 *
	 * @date 19 April 2023
	 * @developer Somnath Sil
	 */
	rememberMeDataPatch() {
		const formValue = SimpleCookieService.getItem('remember_me');
		if (!!formValue) {
			this.loginForm.patchValue(JSON.parse(formValue));
		}
	}

	/**
	 * *Getting all form controls from login Form
	 *
	 * @returns form controls
	 * @date 31 Aug 2022
	 * @developer Somnath Sil
	 */

	get formcontrol() {
		return this.loginForm.controls;
	}

	/**
	 * *Checking if control has error
	 *
	 * @returns boolean
	 * @date 31 Aug 2022
	 * @developer Somnath Sil
	 */
	public hasFormControlError(field: string): boolean {
		const control = this.loginForm.get(field) as FormControl;
		if (
			(this.submitted && control.errors) ||
			(control.invalid && control.dirty)
		) {
			return true;
		}
		return false;
	}

	/**
	 * *Submitting login form
	 *  - If Form is Valid
	 *  - If Form has no Error
	 *
	 * @date 19 Mar 2023
	 * @developer Somnath Sil
	 */
	loginSubmit(): boolean | void {
		if (!this.isDisabled) {
			const formValue = this.loginForm.value;
			this.submitted = true;

			// stop here if form is invalid
			if (this.loginForm.invalid) {
				this.loginForm.markAllAsTouched();
				return false;
			}
			//form is valid
			this.isDisabled = true;
			const param: ILoginForm = {
				email: formValue.email,
				password: formValue.password
			};
			this._loader.useRef().start();
			this.subscriptios.push(
				this._http.post('login', param).subscribe({
					next: (apiResult) => {
						const authData: IAuthResult =
							apiResult.response.dataset[0];

						this.isDisabled = false;
						this._loader.useRef().complete();

						/* Set JWT, Refresh Token, User Name, User Type */
						localStorage.setItem('JWT_TOKEN', authData.token);
						localStorage.setItem(
							'REFRESH_TOKEN',
							authData.refresh_token
						);
						localStorage.setItem('USER_NAME', authData.name);
						localStorage.setItem('USER_TYPE', authData.user_type);
						localStorage.setItem(
							'PROFILE_IMAGE',
							authData.profile_image
						);

						/* Set all login response in Cookies */
						// SimpleCookieService.setItem(
						// 	'user_data',
						// 	JSON.stringify(authData),
						// 	{
						// 		sameSite: 'Lax',
						// 		secure: true,
						// 		expires: 365,
						// 		path: '/'
						// 	}
						// );

						/* Set login form data in Cookies */
						if (formValue.rememberMe) {
							SimpleCookieService.setItem(
								'remember_me',
								JSON.stringify(formValue),
								{
									sameSite: 'Lax',
									secure: true,
									expires: 365,
									path: '/'
								}
							);
						} else {
							SimpleCookieService.removeItem('remember_me');
						}

						this._toast.success(
							'Success',
							apiResult.response.status.msg,
							{
								timeout: 5000,
								position: 'top'
							}
						);
						this._router.navigate(['/profile/my-profile']);
					},
					error: (apiError) => {
						this.isDisabled = false;
						this._loader.useRef().complete();
						this._toast.error(
							'Error',
							apiError.error.response.status.msg,
							{
								timeout: 5000,
								position: 'top'
							}
						);
					}
				})
			);
		}
	}

	/**
	 * *Unsubscribing observable on destroy
	 *
	 * @date 19 Mar 2022
	 * @developer Somnath Sil
	 */
	ngOnDestroy(): void {
		this.subscriptios.forEach((subscription) => {
			subscription.unsubscribe();
		});
	}
}
