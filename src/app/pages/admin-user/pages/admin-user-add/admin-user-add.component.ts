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

@Component({
	selector: 'app-admin-user-add',
	templateUrl: './admin-user-add.component.html',
	styleUrls: ['./admin-user-add.component.scss'],
	animations: [fadeInOut]
})
export class AdminUserAddComponent implements OnInit, AfterViewInit {
	constructor(
		private _formBuilder: FormBuilder,
		private _commonService: CommonService
	) {}

	public submitted = false;
	public addAdminUserForm!: FormGroup;
	@ViewChild('inputFocus') inputFocus!: ElementRef;

	ngOnInit(): void {
		this._commonService.setLoadingStatus(false);
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
		this.addAdminUserForm = this._formBuilder.group({
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
		return this.addAdminUserForm.controls;
	}

	/**
	 * *Checking if control has error
	 *
	 * @returns boolean
	 * @date 29 Oct 2022
	 * @developer Somnath Sil
	 */
	public hasFormControlError(field: string): boolean {
		const control = this.addAdminUserForm.get(field) as FormControl;
		if (
			(this.submitted && control.errors) ||
			(control.invalid && control.dirty)
		) {
			return true;
		}
		return false;
	}

	addAdminUserSubmit(): boolean | void {
		this.submitted = true;
		const formValue = this.addAdminUserForm.value;

		// stop here if form is invalid
		if (this.addAdminUserForm.invalid) {
			return false;
		}

		//form is valid
		if (this.addAdminUserForm.valid) {
			console.log(formValue);
		}
	}
}
