import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import {
	FormBuilder,
	FormControl,
	FormGroup,
	Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService, HttpService, ToasterService } from '@app/core/services';
import { fadeInOut } from '@app/shared/animations';
import { IOtpParam } from '@app/shared/models';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-enter-otp',
	templateUrl: './enter-otp.component.html',
	styleUrls: ['./enter-otp.component.scss'],
	animations: [fadeInOut]
})
export class EnterOtpComponent implements OnInit, AfterViewInit, OnDestroy {
	public submitted = false;
	public isDisabled = false;
	public enterOtpForm!: FormGroup;
	public emailForOTP = '';

	public subscriptions: Subscription[] = [];

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
		this.initEnterOtpForm();
		this.getEmail();
	}

	ngAfterViewInit(): void {
		this._commonService.setLoadingStatus(false);
	}

	/**
	 * *get email address form address bar
	 *
	 * @date 31 March 2023
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
	 * *Initializing form controls and validation in forget password form
	 *
	 * @date 13 Sep 2022
	 * @developer Somnath Sil
	 */
	private initEnterOtpForm() {
		this.enterOtpForm = this._formBuilder.group({
			otp1: new FormControl('', [Validators.required]),
			otp2: new FormControl('', [Validators.required]),
			otp3: new FormControl('', [Validators.required]),
			otp4: new FormControl('', [Validators.required])
		});
	}

	/**
	 * *Getting all form controls from forget password Form
	 *
	 * @returns form controls
	 * @date 13 Sep 2022
	 * @developer Somnath Sil
	 */

	get formcontrol() {
		return this.enterOtpForm.controls;
	}

	/**
	 * *Checking if control has error
	 *
	 * @returns boolean
	 * @date 13 Sep 2022
	 * @developer Somnath Sil
	 */
	public hasFormControlError(field: string): boolean {
		const control = this.enterOtpForm.get(field) as FormControl;
		if (
			(this.submitted && control.errors) ||
			(control.invalid && control.dirty)
		) {
			return true;
		}
		return false;
	}

	enterOtpSubmit(): boolean | void {
		if (!this.isDisabled) {
			const formValue =
				this.enterOtpForm.get('otp1')?.value +
				this.enterOtpForm.get('otp2')?.value +
				this.enterOtpForm.get('otp3')?.value +
				this.enterOtpForm.get('otp4')?.value;
			this.submitted = true;

			// stop here if form is invalid
			if (this.enterOtpForm.invalid) {
				this.enterOtpForm.markAllAsTouched();
				return false;
			}

			//form is valid
			this.isDisabled = true;
			const param: IOtpParam = {
				email: this.emailForOTP,
				otp: formValue
			};

			this._loader.useRef().start();
			this.subscriptions.push(
				this._http.post('verifyOtp', param).subscribe({
					next: (apiResult) => {
						this.isDisabled = false;
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
							this._router.navigate(['/reset-password'], {
								queryParams: { email: this.emailForOTP }
							});
						}, 500);
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
	 * *Resend OTP method
	 *
	 * @date 1 April 2023
	 * @developer Somnath Sil
	 */
	resentOTP(event: Event) {
		event.preventDefault();
		this.isDisabled = true;
		const param = {
			email: this.emailForOTP
		};

		this._loader.useRef().start();
		this.subscriptions.push(
			this._http.post('resendOtp', param).subscribe({
				next: (apiResult) => {
					this.isDisabled = false;
					this._loader.useRef().complete();
					this._toast.success(
						'Success',
						apiResult.response.status.msg,
						{
							timeout: 5000,
							position: 'top'
						}
					);
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

	move(fromtext: any, totext: any, event: any, index: number) {
		const key = event.key;
		if (key === 'Backspace' || key === 'Delete') {
			fromtext.focus();
		} else {
			var length: any = fromtext.length;
			var maxlength: any = fromtext.getAttribute(maxlength);
			if (length == maxlength) {
				totext.focus();
			} else {
				totext.blur();
			}
		}
	}

	/**
	 * *Unsubscribing observable on destroy
	 *
	 * @date 31 March 2023
	 * @developer Somnath Sil
	 */
	ngOnDestroy(): void {
		this.subscriptions.forEach((subscription) => {
			subscription.unsubscribe();
		});
	}
}
