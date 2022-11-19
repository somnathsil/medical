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

@Component({
	selector: 'app-admin-user-edit',
	templateUrl: './admin-user-edit.component.html',
	styleUrls: ['./admin-user-edit.component.scss'],
	animations: [fadeInOut]
})
export class AdminUserEditComponent implements OnInit, AfterViewInit {
	constructor(private _formBuilder: FormBuilder) {}

	public submitted = false;
	public editAdminUserForm!: FormGroup;
	@ViewChild('inputFocus') inputFocus!: ElementRef;

	ngOnInit(): void {
		this.initAdminUserForm();
	}

	ngAfterViewInit(): void {
		this.inputFocus.nativeElement.focus();
	}

	/**
	 * *Initializing form controls and validation in admin user form
	 *
	 * @date 29 Oct 2022
	 * @developer Somnath Sil
	 */
	private initAdminUserForm() {
		this.editAdminUserForm = this._formBuilder.group({
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
			phone_number: new FormControl('', [
				Validators.required,
				Validators.pattern('[- +()0-9]+')
			]),
			status: new FormControl('', [Validators.required])
		});
	}

	/**
	 * *Getting all form controls from admin user Form
	 *
	 * @returns form controls
	 * @date 29 Oct 2022
	 * @developer Somnath Sil
	 */

	get formcontrol() {
		return this.editAdminUserForm.controls;
	}

	/**
	 * *Checking if control has error
	 *
	 * @returns boolean
	 * @date 29 Oct 2022
	 * @developer Somnath Sil
	 */
	public hasFormControlError(field: string): boolean {
		const control = this.editAdminUserForm.get(field) as FormControl;
		if (
			(this.submitted && control.errors) ||
			(control.invalid && control.dirty)
		) {
			return true;
		}
		return false;
	}

	editAdminUserSubmit(): boolean | void {
		this.submitted = true;
		const formValue = this.editAdminUserForm.value;

		// stop here if form is invalid
		if (this.editAdminUserForm.invalid) {
			return false;
		}

		//form is valid
		if (this.editAdminUserForm.valid) {
			console.log(formValue);
		}
	}
}
