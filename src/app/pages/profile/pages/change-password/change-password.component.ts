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
	selector: 'app-change-password',
	templateUrl: './change-password.component.html',
	styleUrls: ['./change-password.component.scss'],
	animations: [fadeInOut]
})
export class ChangePasswordComponent implements OnInit, AfterViewInit {
	constructor(
		private _formBuilder: FormBuilder,
		private _commonService: CommonService
	) {}

	public submitted = false;
	public changePasswordForm!: FormGroup;

	public toggleInputTypeCurrent = false;
	public toggleInputTypeNew = false;
	public toggleInputTypeConfirm = false;
	@ViewChild('inputFocus') inputFocus!: ElementRef;

	ngOnInit(): void {
		this._commonService.setLoadingStatus(false);
		this.initChangePasswordForm();
	}

	ngAfterViewInit(): void {
		this.inputFocus.nativeElement.focus();
	}

	/**
	 * *Initializing form controls and validation in change password form
	 *
	 * @date 5 Oct 2022
	 * @developer Somnath Sil
	 */
	private initChangePasswordForm() {
		this.changePasswordForm = this._formBuilder.group(
			{
				old_password: new FormControl('', [Validators.required]),
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
	 * *Getting all form controls from change password Form
	 *
	 * @returns form controls
	 * @date 5 Oct 2022
	 * @developer Somnath Sil
	 */

	get formcontrol() {
		return this.changePasswordForm.controls;
	}

	/**
	 * *Checking if control has error
	 *
	 * @returns boolean
	 * @date 5 Oct 2022
	 * @developer Somnath Sil
	 */
	public hasFormControlError(field: string): boolean {
		const control = this.changePasswordForm.get(field) as FormControl;
		if (
			(this.submitted && control.errors) ||
			(control.invalid && control.dirty)
		) {
			return true;
		}
		return false;
	}

	changePasswordSubmit(): boolean | void {
		this.submitted = true;
		const formValue = this.changePasswordForm.value;

		// stop here if form is invalid
		if (this.changePasswordForm.invalid) {
			return false;
		}

		//form is valid
		if (this.changePasswordForm.valid) {
			console.log(formValue);
		}
	}
}
