import { Component, OnInit } from '@angular/core';
import {
	FormBuilder,
	FormControl,
	FormGroup,
	Validators
} from '@angular/forms';
import { fadeInOut } from '@app/shared/animations';
import {
	IBloodGroup,
	ICity,
	IDisease,
	IGender,
	IVisit
} from '@app/shared/models';

@Component({
	selector: 'app-patient-edit',
	templateUrl: './patient-edit.component.html',
	styleUrls: ['./patient-edit.component.scss'],
	animations: [fadeInOut]
})
export class PatientEditComponent implements OnInit {
	constructor(private _formBuilder: FormBuilder) {}

	public submitted = false;
	public editPatientStepOneForm!: FormGroup;
	public activeIndex: number = 0;
	public diseases!: IDisease[];
	public cities!: ICity[];
	public bloodGroups!: IBloodGroup[];
	public gender!: IGender[];
	public visites!: IVisit[];

	ngOnInit(): void {
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
		this.diseases = [
			{ id: 1, label: 'Dental' },
			{ id: 2, label: 'Allergy' },
			{ id: 3, label: 'Skin Problem' },
			{ id: 4, label: 'Malaria' },
			{ id: 5, label: 'Fever' },
			{ id: 4, label: 'Headache' },
			{ id: 4, label: 'Stomach Ache' },
			{ id: 4, label: 'Diabetes' }
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
		this.visites = [
			{ id: 1, label: 'Yes' },
			{ id: 2, label: 'No' }
		];
	}

	/**
	 * *Initializing form controls and validation in patient add form
	 *
	 * @date 22 Oct 2022
	 * @developer Somnath Sil
	 */
	private initPatientAddForm() {
		this.editPatientStepOneForm = this._formBuilder.group({
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
		return this.editPatientStepOneForm.controls;
	}

	/**
	 * *Checking if control has error
	 *
	 * @returns boolean
	 * @date 22 Oct 2022
	 * @developer Somnath Sil
	 */
	public hasFormControlError(field: string): boolean {
		const control = this.editPatientStepOneForm.get(field) as FormControl;
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
		const formValue = this.editPatientStepOneForm.value;

		// stop here if form is invalid
		if (this.editPatientStepOneForm.invalid) {
			return false;
		}

		//form is valid
		if (this.editPatientStepOneForm.valid) {
			console.log(formValue);
		}
	}
}
