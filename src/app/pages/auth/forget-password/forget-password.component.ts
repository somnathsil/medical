import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import {
	FormBuilder,
	FormControl,
	FormGroup,
	Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService, HttpService, ToasterService } from '@app/core/services';
import { fadeInOut } from '@app/shared/animations';
import { IForgetPasswordData, IForgetPasswordForm } from '@app/shared/models';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-forget-password',
	templateUrl: './forget-password.component.html',
	styleUrls: ['./forget-password.component.scss'],
	animations: [fadeInOut]
})
export class ForgetPasswordComponent
	implements OnInit, AfterViewInit, OnDestroy
{
	public submitted = false;
	public isDisable = false;
	public forgetPasswordForm!: FormGroup;
	public subscriptions: Subscription[] = [];

	constructor(
		private _router: Router,
		private _formBuilder: FormBuilder,
		private _commonService: CommonService,
		private _loader: LoadingBarService,
		private _http: HttpService,
		private _toast: ToasterService
	) {}

	ngOnInit(): void {
		this.initForgetPasswordForm();
	}

	ngAfterViewInit(): void {
		this._commonService.setLoadingStatus(false);
	}

	/**
	 * *Initializing form controls and validation in forget password form
	 *
	 * @date 31 Aug 2022
	 * @developer Somnath Sil
	 */
	private initForgetPasswordForm() {
		this.forgetPasswordForm = this._formBuilder.group({
			email: new FormControl('', [
				Validators.required,
				Validators.pattern(
					/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
				)
			])
		});
	}

	/**
	 * *Getting all form controls from forget password Form
	 *
	 * @returns form controls
	 * @date 31 Aug 2022
	 * @developer Somnath Sil
	 */

	get formcontrol() {
		return this.forgetPasswordForm.controls['email'];
	}

	/**
	 * *Checking if control has error
	 *
	 * @returns boolean
	 * @date 31 Aug 2022
	 * @developer Somnath Sil
	 */
	public hasFormControlError(field: string): boolean {
		const control = this.forgetPasswordForm.get(field) as FormControl;
		if (
			(this.submitted && control.errors) ||
			(control.invalid && control.dirty)
		) {
			return true;
		}
		return false;
	}

	forgetPasswordSubmit(): boolean | void {
		if (!this.isDisable) {
			const formValue = this.forgetPasswordForm.value;
			this.submitted = true;

			// stop here if form is invalid
			if (this.forgetPasswordForm.invalid) {
				this.forgetPasswordForm.markAllAsTouched();
				return true;
			}

			//form is valid
			this.isDisable = true;
			const param: IForgetPasswordForm = {
				email: formValue.email
			};
			this._loader.useRef().start();
			this.subscriptions.push(
				this._http.post('forgetPwd', param).subscribe({
					next: (apiResult) => {
						// const forgetPasswordData: IForgetPasswordData =
						// 	apiResult.response.dataset[0];

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
						setTimeout(() => {
							// This email is set for use in enter otp page
							this._router.navigate(['/enter-otp'], {
								queryParams: { email: formValue.email }
							});
						}, 500);
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
	 * @date 27 Mar 2022
	 * @developer Somnath Sil
	 */
	ngOnDestroy(): void {
		this.subscriptions.forEach((subscription) => {
			subscription.unsubscribe();
		});
	}
}
