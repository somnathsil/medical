import { Component, OnInit } from '@angular/core';
import {
	FormBuilder,
	FormControl,
	FormGroup,
	Validators
} from '@angular/forms';
import { CommonService, ToasterService } from '@app/core/services';
import { fadeInOut } from '@app/shared/animations';
import { IBloodGroup, ICity, IDepartment, IGender } from '@app/shared/models';

@Component({
	selector: 'app-doctor-edit',
	templateUrl: './doctor-edit.component.html',
	styleUrls: ['./doctor-edit.component.scss'],
	animations: [fadeInOut]
})
export class DoctorEditComponent implements OnInit {
	public submitted = false;
	public editDoctorStepOneForm!: FormGroup;
	public activeIndex: number = 0;
	public departments!: IDepartment[];
	public cities!: ICity[];
	public bloodGroups!: IBloodGroup[];
	public gender!: IGender[];

	constructor(
		private _formBuilder: FormBuilder,
		private _toast: ToasterService,
		private _commonService: CommonService
	) {}

	ngOnInit(): void {
		this._commonService.setLoadingStatus(false);
		console.clear();
		this.getAllDropdowns();
		this.initPatientAddForm();
	}

	/**
	 * *Initializing all dropdowns
	 *
	 * @date 22 Oct 2022
	 * @developer Somnath Sil
	 */
	getAllDropdowns() {
		this.departments = [
			{ id: 1, label: 'Neurology' },
			{ id: 2, label: 'Gynaecology' },
			{ id: 3, label: 'Microbiology' },
			{ id: 4, label: 'Pharmacy' },
			{ id: 5, label: 'Neonatal' }
		];
		this.cities = [
			{ id: 1, label: 'Kolkata' },
			{ id: 2, label: 'Howrah' },
			{ id: 3, label: 'Siliguri' },
			{ id: 4, label: 'Habra' },
			{ id: 4, label: 'Bardhaman' },
			{ id: 4, label: 'Malda' },
			{ id: 4, label: 'Haldia' },
			{ id: 4, label: 'Krishnanagar' },
			{ id: 4, label: 'Basirhat' }
		];
		this.bloodGroups = [
			{ id: 1, label: 'A+' },
			{ id: 1, label: 'A-' },
			{ id: 1, label: 'B+' },
			{ id: 1, label: 'B-' },
			{ id: 1, label: 'O+' },
			{ id: 1, label: 'O-' },
			{ id: 1, label: 'AB+' },
			{ id: 1, label: 'AB-' }
		];
		this.gender = [
			{ id: 1, label: 'Male' },
			{ id: 2, label: 'Female' }
		];
	}

	/**
	 * *Initializing form controls and validation in patient add form
	 *
	 * @date 22 Oct 2022
	 * @developer Somnath Sil
	 */
	private initPatientAddForm() {
		this.editDoctorStepOneForm = this._formBuilder.group({
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
			city: new FormControl('', [Validators.required]),
			address: new FormControl('', [Validators.required])
		});
	}

	/**
	 * *Getting all form controls from patient add Form
	 *
	 * @returns form controls
	 * @date 22 Oct 2022
	 * @developer Somnath Sil
	 */

	get formcontrol() {
		return this.editDoctorStepOneForm.controls;
	}

	/**
	 * *Checking if control has error
	 *
	 * @returns boolean
	 * @date 22 Oct 2022
	 * @developer Somnath Sil
	 */
	public hasFormControlError(field: string): boolean {
		const control = this.editDoctorStepOneForm.get(field) as FormControl;
		if (
			(this.submitted && control.errors) ||
			(control.invalid && control.dirty)
		) {
			return true;
		}
		return false;
	}

	onStepOneFormSubmit(): boolean | void {
		this.submitted = true;
		const formValue = this.editDoctorStepOneForm.value;

		// stop here if form is invalid
		if (this.editDoctorStepOneForm.invalid) {
			return false;
		}

		//form is valid
		if (this.editDoctorStepOneForm.valid) {
			console.log(formValue);
		}
	}
}
