import { Component, OnInit } from '@angular/core';
import {
	FormBuilder,
	FormControl,
	FormGroup,
	Validators
} from '@angular/forms';
import { CommonService } from '@app/core/services';
import { fadeInOut } from '@app/shared/animations';

@Component({
	selector: 'app-enter-otp',
	templateUrl: './enter-otp.component.html',
	styleUrls: ['./enter-otp.component.scss'],
	animations: [fadeInOut]
})
export class EnterOtpComponent implements OnInit {
	public submitted = false;
	public enterOtpForm!: FormGroup;
	public emailForOTP = 'somnath@mailinator.com';

	constructor(
		private _formBuilder: FormBuilder,
		private _commonService: CommonService
	) {}

	ngOnInit(): void {
		this._commonService.setLoadingStatus(false);
		this.initEnterOtpForm();
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
		this.submitted = true;
		const formValue = this.enterOtpForm.value;

		// stop here if form is invalid
		if (this.enterOtpForm.invalid) {
			return false;
		}

		//form is valid
		if (this.enterOtpForm.valid) {
			console.log(formValue);
		}
	}

	move(fromtext: any, totext: any) {
		var length: any = fromtext.length;
		var maxlength: any = fromtext.getAttribute(maxlength);
		if (length == maxlength) {
			totext.focus();
		}
	}
}
