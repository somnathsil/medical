import { Component, OnInit } from '@angular/core';
import {
	FormBuilder,
	FormControl,
	FormGroup,
	Validators
} from '@angular/forms';
import { fadeInOut } from '@app/shared/animations';
import { PasswordValidator } from '@app/shared/validators';

@Component({
	selector: 'app-reset-password',
	templateUrl: './reset-password.component.html',
	styleUrls: ['./reset-password.component.scss'],
	animations: [fadeInOut]
})
export class ResetPasswordComponent implements OnInit {
	constructor(private _formBuilder: FormBuilder) {}

	public submitted = false;
	public resetPasswordForm!: FormGroup;

	public toggleInputType = false;
	public toggleInputTypeConfirm = false;
	public resetType: number = 1;

	ngOnInit(): void {
		this.initResetPasswordForm();
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
				validator: PasswordValidator.passwordsMustMatch(
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
		this.submitted = true;
		const formValue = this.resetPasswordForm.value;

		// stop here if form is invalid
		if (this.resetPasswordForm.invalid) {
			return false;
		}

		//form is valid
		if (this.resetPasswordForm.valid) {
			console.log(formValue);
		}
	}
}
