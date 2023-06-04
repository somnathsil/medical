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
import {
	IRegisterData,
	IRegisterForm,
	IUserType
} from '@app/shared/models/register-form-model';
import { PasswordValidator } from '@app/shared/validators';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-registration',
	templateUrl: './registration.component.html',
	styleUrls: ['./registration.component.scss'],
	animations: [fadeInOut]
})
export class RegistrationComponent implements OnInit, AfterViewInit, OnDestroy {
	public submitted = false;
	public isDisable = false;
	public registrationForm!: FormGroup;
	public firstNumber!: number;
	public captchaErr = false;
	public lastNumber!: number;
	public toggleInputType = false;
	public toggleInputTypeConfirm = false;
	public userType: IUserType[] = [];
	private subscriptions: Subscription[] = [];
	@ViewChild('inputFocus') inputFocus!: ElementRef;

	constructor(
		private _router: Router,
		private _formBuilder: FormBuilder,
		private _commonService: CommonService,
		private _loader: LoadingBarService,
		private _http: HttpService,
		private _toast: ToasterService
	) {}

	ngOnInit(): void {
		this.getPageType();
		this.initRegistrationForm();
		this.firstNumber = this.randomNumber();
		this.lastNumber = this.randomNumber();
	}

	ngAfterViewInit(): void {
		this.inputFocus.nativeElement.focus();
		this._commonService.setLoadingStatus(false);
	}

	/**
	 * *Initializing dropdown of page type
	 *
	 * @date 31 Aug 2022
	 * @developer Somnath Sil
	 */
	getPageType() {
		this.userType = [
			{ id: 1, name: 'Patient', value: 'P' },
			{ id: 2, name: 'Doctor', value: 'D' }
		];
	}

	/**
	 * *Initializing form controls and validation in registration form
	 *
	 * @date 31 Aug 2022
	 * @developer Somnath Sil
	 */
	private initRegistrationForm() {
		this.registrationForm = this._formBuilder.group(
			{
				name: new FormControl('', [
					Validators.required,
					Validators.pattern(/^([^0-9]*)$/)
				]),
				email: new FormControl('', [
					Validators.required,
					Validators.pattern(
						/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
					)
				]),
				password: new FormControl('', [Validators.required]),
				con_password: new FormControl('', [Validators.required]),
				user_type: new FormControl('', [Validators.required]),
				captcha: new FormControl('', [Validators.required]),
				terms: [false, Validators.requiredTrue]
			},
			{
				validators: PasswordValidator.passwordsMustMatch(
					'password',
					'con_password'
				)
			}
		);
	}

	/**
	 * *Getting all form controls from registration Form
	 *
	 * @returns form controls
	 * @date 31 Aug 2022
	 * @developer Somnath Sil
	 */

	get formcontrol() {
		return this.registrationForm.controls;
	}

	/**
	 * *Checking if control has error
	 *
	 * @returns boolean
	 * @date 31 Aug 2022
	 * @developer Somnath Sil
	 */
	public hasFormControlError(field: string): boolean {
		const control = this.registrationForm.get(field) as FormControl;
		if (
			(this.submitted && control.errors) ||
			(control.invalid && control.dirty)
		) {
			return true;
		}
		return false;
	}

	registrationSubmit(): boolean | void {
		if (!this.isDisable) {
			const formValue = this.registrationForm.value;
			this.submitted = true;

			// stop here if form is invalid
			if (this.registrationForm.invalid) {
				this.registrationForm.markAllAsTouched();
				if (
					this.firstNumber + this.lastNumber !==
					Number(formValue.captcha)
				) {
					this.captchaErr = true;
					// console.log(
					// 	this.firstNumber + this.lastNumber,
					// 	formValue.captcha
					// );
				} else {
					if (
						this.firstNumber + this.lastNumber ==
						Number(formValue.captcha)
					) {
						this.captchaErr = false;
					}
				}
				return false;
			}

			if (
				this.firstNumber + this.lastNumber !==
				Number(formValue.captcha)
			) {
				this.captchaErr = true;
				// console.log(this.firstNumber + this.lastNumber, formValue.captcha);
				return;
			} else {
				this.captchaErr = false;
			}

			//form is valid
			this.isDisable = true;
			const param: IRegisterForm = {
				name: formValue.name,
				email: formValue.email,
				password: formValue.password,
				con_password: formValue.con_password,
				type: formValue.user_type
			};

			this._loader.useRef().start();
			this.subscriptions.push(
				this._http.post('register', param).subscribe({
					next: (apiResult) => {
						// const registerData: IRegisterData =
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
						this._router.navigate(['/login']);
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
	 * *Initializing random number for captcha
	 *
	 * @date 31 Aug 2022
	 * @developer Somnath Sil
	 */
	randomNumber(): number {
		const minNumber = 1;
		const maxNumber = 9;
		return (
			Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber
		);
	}

	/**
	 * *Initializing method for captcha on input
	 *
	 * @date 31 Aug 2022
	 * @developer Somnath Sil
	 */
	onInputCaptcha() {
		if (
			this.firstNumber + this.lastNumber !==
			Number(this.registrationForm.value.captcha)
		) {
			this.captchaErr = true;
			// console.log(
			// 	this.firstNumber + this.lastNumber,
			// 	this.registrationForm.value.captcha
			// );
			return;
		} else {
			this.captchaErr = false;
		}
	}

	/**
	 * *Unsubscribing observable on destroy
	 *
	 * @date 22 Mar 2022
	 * @developer Somnath Sil
	 */
	ngOnDestroy(): void {
		this.subscriptions.forEach((subscription) => {
			subscription.unsubscribe();
		});
	}
}
