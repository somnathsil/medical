import { AfterViewInit, Component, OnInit } from '@angular/core';
import {
	FormBuilder,
	FormControl,
	FormGroup,
	Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService, HttpService, ToasterService } from '@app/core/services';
import { fadeInOut } from '@app/shared/animations';
import { IResetPasswordForm } from '@app/shared/models';
import { PasswordValidator } from '@app/shared/validators';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-reset-password',
	templateUrl: './reset-password.component.html',
	styleUrls: ['./reset-password.component.scss'],
	animations: [fadeInOut]
})
export class ResetPasswordComponent implements OnInit, AfterViewInit {
	public submitted = false;
	public isDisable = false;
	public resetPasswordForm!: FormGroup;
	public toggleInputType = false;
	public toggleInputTypeConfirm = false;
	public subscriptions: Subscription[] = [];
	public resetType: number = 1;
	public emailForOTP = '';

	constructor(
		private _formBuilder: FormBuilder,
		private _commonService: CommonService,
		private _router: Router,
		private _route: ActivatedRoute,
		private _loader: LoadingBarService,
		private _http: HttpService,
		private _toast: ToasterService
	) {}

	ngOnInit(): void {
		this.initResetPasswordForm();
		this.getEmail();
	}

	ngAfterViewInit() {
		this._commonService.setLoadingStatus(false);
	}

	/**
	 * *get email address form address bar
	 *
	 * @date 5 April 2023
	 * @developer Somnath Sil
	 */
	getEmail() {
		this._route.queryParamMap.subscribe((param: any) => {
			this.emailForOTP = param.params.email;
			if (this.emailForOTP == undefined) {
				this._router.navigate(['/login']);
			}
		});
	}

	/**
	 * *Initializing form controls and validation in reset password form
	 *
	 * @date 1 Sep 2022
	 * @developer Somnath Sil
	 */
	private initResetPasswordForm() {
		this.resetPasswordForm = this._formBuilder.group(
			{
				new_password: new FormControl('', [Validators.required]),
				con_password: new FormControl('', [Validators.required])
			},
			{
				validators: PasswordValidator.passwordsMustMatch(
					'new_password',
					'con_password'
				)
			}
		);
	}

	/**
	 * *Getting all form controls from reset password Form
	 *
	 * @returns form controls
	 * @date 1 Sep 2022
	 * @developer Somnath Sil
	 */

	get formcontrol() {
		return this.resetPasswordForm.controls;
	}

	/**
	 * *Checking if control has error
	 *
	 * @returns boolean
	 * @date 1 Sep 2022
	 * @developer Somnath Sil
	 */
	public hasFormControlError(field: string): boolean {
		const control = this.resetPasswordForm.get(field) as FormControl;
		if (
			(this.submitted && control.errors) ||
			(control.invalid && control.dirty)
		) {
			return true;
		}
		return false;
	}

	resetPasswordSubmit(): boolean | void {
		if (!this.isDisable) {
			const formValue = this.resetPasswordForm.value;
			this.submitted = true;

			// stop here if form is invalid
			if (this.resetPasswordForm.invalid) {
				this.resetPasswordForm.markAllAsTouched();
				return true;
			}

			//form is valid
			this.isDisable = true;
			const param: IResetPasswordForm = {
				email: this.emailForOTP,
				password: formValue.new_password,
				con_password: formValue.con_password
			};

			this._loader.useRef().start();
			this.subscriptions.push(
				this._http.post('resetPwd', param).subscribe({
					next: (apiResult) => {
						this.isDisable = false;
						this._loader.useRef().complete();
						this._toast.success(
							'Success',
							apiResult.response.status.msg,
							{
								timeout: 5000,
								position: 'top'
							}
						);
						this.resetType = 2;
					},
					error: (apiError) => {
						this.isDisable = false;
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
	 * @date 4 April 2023
	 * @developer Somnath Sil
	 */
	ngOnDestroy(): void {
		this.subscriptions.forEach((subscription) => {
			subscription.unsubscribe();
		});
	}
}
