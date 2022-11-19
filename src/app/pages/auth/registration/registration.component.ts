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
import { fadeInOut } from '@app/shared/animations';
import { PasswordValidator } from '@app/shared/validators';

@Component({
	selector: 'app-registration',
	templateUrl: './registration.component.html',
	styleUrls: ['./registration.component.scss'],
	animations: [fadeInOut]
})
export class RegistrationComponent implements OnInit, AfterViewInit {
	constructor(private _formBuilder: FormBuilder) {}

	public submitted = false;
	public registrationForm!: FormGroup;
	public toggleInputType = false;
	public toggleInputTypeConfirm = false;
	public userType: any = [];
	@ViewChild('inputFocus') inputFocus!: ElementRef;

	ngOnInit(): void {
		this.getPageType();
		this.initRegistrationForm();
	}

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
				user_type: new FormControl('', [Validators.required])
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
			return false;
		}

		//form is valid
		if (this.registrationForm.valid) {
			console.log(formValue);
		}
	}
}
