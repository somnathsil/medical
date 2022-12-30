import {
	AfterViewInit,
	Component,
	ElementRef,
	OnInit,
	ViewChild
} from '@angular/core';
import {
	FormBuilder,
	FormControl,
	FormGroup,
	Validators
} from '@angular/forms';
import { CommonService } from '@app/core/services';
import { fadeInOut } from '@app/shared/animations';
import { PasswordValidator } from '@app/shared/validators';

@Component({
	selector: 'app-registration',
	templateUrl: './registration.component.html',
	styleUrls: ['./registration.component.scss'],
	animations: [fadeInOut]
})
export class RegistrationComponent implements OnInit, AfterViewInit {
	public submitted = false;
	public registrationForm!: FormGroup;
	public firstNumber!: number;
	public captchaErr = false;
	public lastNumber!: number;
	public toggleInputType = false;
	public toggleInputTypeConfirm = false;
	public userType: any = [];
	@ViewChild('inputFocus') inputFocus!: ElementRef;

	constructor(
		private _formBuilder: FormBuilder,
		private _commonService: CommonService
	) {}

	ngOnInit(): void {
		this._commonService.setLoadingStatus(false);
		this.getPageType();
		this.initRegistrationForm();
		this.firstNumber = this.randomNumber();
		this.lastNumber = this.randomNumber();
	}

	/**
	 * *Initializing dropdown of page type
	 *
	 * @date 31 Aug 2022
	 * @developer Somnath Sil
	 */
	getPageType() {
		this.userType = [
			{ id: 1, name: 'Patient' },
			{ id: 2, name: 'Doctor' }
		];
	}

	ngAfterViewInit(): void {
		this.inputFocus.nativeElement.focus();
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
				captcha: new FormControl('', [Validators.required])
			},
			{
				validator: PasswordValidator.passwordsMustMatch(
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
		this.submitted = true;
		const formValue = this.registrationForm.value;

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
			return;
		}

		if (this.firstNumber + this.lastNumber !== Number(formValue.captcha)) {
			this.captchaErr = true;
			// console.log(this.firstNumber + this.lastNumber, formValue.captcha);
			return;
		} else {
			this.captchaErr = false;
		}

		//form is valid
		if (this.registrationForm.valid) {
			console.log(formValue);
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
}
