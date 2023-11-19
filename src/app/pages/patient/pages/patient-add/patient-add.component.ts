import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
	FormBuilder,
	FormControl,
	FormGroup,
	Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService, HttpService, ToasterService } from '@app/core/services';
import { fadeInOut } from '@app/shared/animations';
import {
	IBloodGroup,
	ICity,
	IDisease,
	IGender,
	IService,
	IVisit
} from '@app/shared/models';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-patient-add',
	templateUrl: './patient-add.component.html',
	styleUrls: ['./patient-add.component.scss'],
	providers: [DatePipe],
	animations: [fadeInOut]
})
export class PatientAddComponent implements OnInit {
	public isDisable = false;
	public submitted = false;
	public addPatientForm!: FormGroup;
	public activeIndex: number = 0;
	public serviceList: IService[] = [];
	public cities!: ICity[];
	public bloodGroups!: IBloodGroup[];
	public gender!: IGender[];
	public visites!: IVisit[];
	imageFileName!: string;
	public subscriptions: Subscription[] = [];

	constructor(
		private _formBuilder: FormBuilder,
		private _toast: ToasterService,
		private _commonService: CommonService,
		private _loader: LoadingBarService,
		private _router: Router,
		private _http: HttpService,
		private _datePipe: DatePipe
	) {}

	ngOnInit(): void {
		this._commonService.setLoadingStatus(false);
		this.getAllDropdowns();
		this.initPatientAddForm();
		this.onSelectValidation();
	}

	/**
	 * *Initializing all dropdowns
	 *
	 * @date 22 Oct 2022
	 * @developer Somnath Sil
	 */
	getAllDropdowns() {
		this.serviceList = this._commonService.serviceListArr();
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
			{ id: 1, label: 'Male', value: 'M' },
			{ id: 2, label: 'Female', value: 'F' }
		];
		this.visites = [
			{ id: 1, label: 'Yes', value: 'Y' },
			{ id: 2, label: 'No', value: 'N' }
		];
	}

	/**
	 * *Initializing form controls and validation in patient add form
	 *
	 * @date 22 Oct 2022
	 * @developer Somnath Sil
	 */
	private initPatientAddForm() {
		this.addPatientForm = this._formBuilder.group({
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
			address: new FormControl('', [Validators.required]),
			dob: new FormControl('', [Validators.required]),
			age: new FormControl('', [Validators.required]),
			blood_group: new FormControl('', [Validators.required]),
			gender: new FormControl('', [Validators.required]),
			image: new FormControl('', []),
			service_name: new FormControl('', [Validators.required]),
			visited: new FormControl('', [Validators.required]),
			visited_date: new FormControl('')
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
		return this.addPatientForm.controls;
	}

	/**
	 * *Checking if control has error
	 *
	 * @returns boolean
	 * @date 22 Oct 2022
	 * @developer Somnath Sil
	 */
	public hasFormControlError(field: string): boolean {
		const control = this.addPatientForm.get(field) as FormControl;
		if (
			(this.submitted && control.errors) ||
			(control.invalid && control.dirty)
		) {
			return true;
		}
		return false;
	}

	onPatientFormSubmit(): boolean | void {
		if (!this.isDisable) {
			this.submitted = true;
			const formValue = this.addPatientForm.value;

			if (this.addPatientForm.invalid) {
				this.addPatientForm.markAllAsTouched();
				return true;
			}

			// form is valid
			this.isDisable = true;
			let dobDate = new Date(this.addPatientForm.get('dob')?.value);
			dobDate.setDate(dobDate.getDate());

			let visitedDate = new Date(formValue.visited_date);
			visitedDate.setDate(visitedDate.getDate());

			const formData = new FormData();
			formData.append('name', this.addPatientForm.get('name')?.value);
			formData.append('email', this.addPatientForm.get('email')?.value);
			formData.append(
				'contact',
				this.addPatientForm.get('phone_number')?.value
			);
			formData.append('city', this.addPatientForm.get('city')?.value);
			formData.append(
				'address',
				this.addPatientForm.get('address')?.value
			);
			formData.append(
				'dob',
				this._datePipe.transform(dobDate, 'dd/MM/yyyy') ?? ''
			);
			formData.append('age', this.addPatientForm.get('age')?.value);
			formData.append(
				'bloog_group',
				this.addPatientForm.get('blood_group')?.value
			);
			formData.append('gender', this.addPatientForm.get('gender')?.value);
			formData.append('image', this.addPatientForm.get('image')?.value);
			formData.append(
				'service_id',
				this.addPatientForm.get('service_name')?.value
			);
			formData.append(
				'visited',
				this.addPatientForm.get('visited')?.value
			);
			formData.append(
				'visited_date',
				this._datePipe.transform(visitedDate, 'dd/MM/yyyy') ?? ''
			);
			formData.append('type', 'P');
			formData.append('status', 'A');

			// for (var pair of formData.entries()) {
			// 	console.log('hello', pair[0] + ', ' + pair[1]);
			// }

			this._loader.useRef().start();
			this.subscriptions.push(
				this._http.post('addPatient', formData).subscribe({
					next: (apiResult) => {
						this.isDisable = false;
						this.submitted = false;
						this._loader.useRef().complete();
						this.resetForm();
						this._router.navigate(['/patients']);
						this._toast.success(
							'Success',
							apiResult.response.status.msg,
							{
								timeout: 5000,
								position: 'top'
							}
						);
					},
					error: (apiError) => {
						this.isDisable = false;
						this._loader.useRef().complete();
						this._toast.error(
							'Error',
							apiError.error.response.status.msg,
							{
								timeout: 5000,
								position: 'top'
							}
						);
					}
				})
			);
		}
	}

	/**
	 * *On Select Validation On Visited Date
	 *
	 * @date 15 Nov 2023
	 * @developer Somnath Sil
	 */
	onSelectValidation() {
		this.addPatientForm.get('visited')?.valueChanges.subscribe((res) => {
			if (res == 'Y') {
				this.addPatientForm.controls['visited_date'].setValidators([
					Validators.required
				]);
				this.addPatientForm.controls[
					'visited_date'
				].updateValueAndValidity();
			} else {
				this.addPatientForm.controls['visited_date'].clearValidators();
				this.addPatientForm.controls[
					'visited_date'
				].updateValueAndValidity();
			}
		});
	}

	/**
	 * *Reset form method
	 *
	 * @date 15 Nov 2023
	 * @developer Somnath Sil
	 */
	resetForm() {
		this.addPatientForm.reset();
		this.addPatientForm.setValidators(null);
		this.addPatientForm.updateValueAndValidity();
	}

	/**
	 * *Image Upload Method
	 *
	 * @date 14 May 2023
	 * @developer Somnath Sil
	 */
	onFileselect(event: any) {
		if (event.target.files && event.target.files[0]) {
			const file = event.target.files[0];
			this.imageFileName = file.name;
			this.addPatientForm.controls['image'].setValue(file);
			/* For Preview Image Base 64 */
			var reader = new FileReader();
			reader.readAsDataURL(event.target.files[0]);
			reader.onload = (event) => {};
		}
	}
	/**
	 * *Unsubscribing observable on destroy
	 *
	 * @date 15 Nov 2023
	 * @developer Somnath Sil
	 */
	ngOnDestroy(): void {
		this.subscriptions.forEach((subscription) => {
			subscription.unsubscribe();
		});
	}
}
