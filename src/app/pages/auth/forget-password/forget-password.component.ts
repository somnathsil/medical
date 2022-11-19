import { Component, OnInit } from '@angular/core';
import {
	FormBuilder,
	FormControl,
	FormGroup,
	Validators
} from '@angular/forms';
import { fadeInOut } from '@app/shared/animations';

@Component({
	selector: 'app-forget-password',
	templateUrl: './forget-password.component.html',
	styleUrls: ['./forget-password.component.scss'],
	animations: [fadeInOut]
})
export class ForgetPasswordComponent implements OnInit {
	constructor(private _formBuilder: FormBuilder) {}

	public submitted = false;
	public forgetPasswordForm!: FormGroup;

	ngOnInit(): void {
		this.initForgetPasswordForm();
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
		this.submitted = true;
		const formValue = this.forgetPasswordForm.value;

		// stop here if form is invalid
		if (this.forgetPasswordForm.invalid) {
			return false;
		}

		//form is valid
		if (this.forgetPasswordForm.valid) {
			console.log(formValue);
		}
	}
}
