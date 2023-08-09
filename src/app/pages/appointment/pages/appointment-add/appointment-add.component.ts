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
import { Router } from '@angular/router';
import { CommonService, HttpService, ToasterService } from '@app/core/services';
import { fadeInOut } from '@app/shared/animations';
import { Location } from '@angular/common';
import {
	IDoctor,
	IGender,
	IService
} from '@app/shared/models/appointment.model';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-appointment-add',
	templateUrl: './appointment-add.component.html',
	styleUrls: ['./appointment-add.component.scss'],
	animations: [fadeInOut]
})
export class AppointmentAddComponent implements OnInit, AfterViewInit {
	public isDisable = false;
	public submitted = false;
	public appointmentAddForm!: FormGroup;
	public services!: IService[];
	public doctors!: IDoctor[];
	public gender!: IGender[];
	public subscriptions: Subscription[] = [];
	@ViewChild('inputFocus') inputFocus!: ElementRef;

	constructor(
		private _formBuilder: FormBuilder,
		private _commonService: CommonService,
		private _loader: LoadingBarService,
		private _router: Router,
		private _http: HttpService,
		private _toast: ToasterService,
		private _location: Location
	) {}

	ngOnInit(): void {
		console.clear();
		this._commonService.setLoadingStatus(false);
		this.getAllDropdowns();
		this.initAppointmentAddForm();
	}

	ngAfterViewInit(): void {
		this.inputFocus.nativeElement.focus();
	}

	/**
	 * *Initializing all dropdowns
	 *
	 * @date 15 Oct 2022
	 * @developer Somnath Sil
	 */
	getAllDropdowns() {
		this.services = [
			{ id: 1, label: 'Dental Checkup' },
			{ id: 2, label: 'Full Body Checkup' },
			{ id: 3, label: 'Heart Checkup' },
			{ id: 4, label: 'ENT Checkup' }
		];
		this.doctors = [
			{ id: 1, label: 'Abc Doctor' },
			{ id: 2, label: 'Def Doctor' },
			{ id: 3, label: 'XYZ Doctor' },
			{ id: 4, label: 'UVW Doctor' }
		];
		this.gender = [
			{ id: 1, label: 'Male', value: 'M' },
			{ id: 2, label: 'Female', value: 'F' }
		];
	}

	/**
	 * *Initializing form controls and validation in appointment add form
	 *
	 * @date 15 Oct 2022
	 * @developer Somnath Sil
	 */
	private initAppointmentAddForm() {
		this.appointmentAddForm = this._formBuilder.group({
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
			service_name: new FormControl('', [Validators.required]),
			doctor_name: new FormControl('', [Validators.required]),
			appointment_date: new FormControl('', [Validators.required]),
			gender: new FormControl('', [Validators.required]),
			image: new FormControl('', [Validators.required])
		});
	}

	/**
	 * *Getting all form controls from appointment add Form
	 *
	 * @returns form controls
	 * @date 15 Oct 2022
	 * @developer Somnath Sil
	 */

	get formcontrol() {
		return this.appointmentAddForm.controls;
	}

	/**
	 * *Checking if control has error
	 *
	 * @returns boolean
	 * @date 15 Oct 2022
	 * @developer Somnath Sil
	 */
	public hasFormControlError(field: string): boolean {
		const control = this.appointmentAddForm.get(field) as FormControl;
		if (
			(this.submitted && control.errors) ||
			(control.invalid && control.dirty)
		) {
			return true;
		}
		return false;
	}

	onAppointmentSubmit(): boolean | void {
		if (!this.isDisable) {
			this.submitted = true;
			const formValue = this.appointmentAddForm.value;

			if (this.appointmentAddForm.invalid) {
				this.appointmentAddForm.markAllAsTouched();
				return true;
			}

			// form is valid
			this.isDisable = true;
			let formData = new FormData();
			formData.append(
				'patient_name',
				this.appointmentAddForm.get('name')?.value
			);
			formData.append(
				'email',
				this.appointmentAddForm.get('email')?.value
			);
			formData.append(
				'contact',
				this.appointmentAddForm.get('phone_number')?.value
			);
			formData.append(
				'appoiment_date',
				this.appointmentAddForm.get('appointment_date')?.value
			);
			formData.append(
				'gender',
				this.appointmentAddForm.get('gender')?.value ? 'M' : 'F'
			);
			formData.append(
				'image',
				this.appointmentAddForm.get('image')?.value
			);

			// for (var pair of formData.entries()) {
			// 	console.log('hello', pair[0] + ', ' + pair[1]);
			// }

			this._loader.useRef().start();
			this.subscriptions.push(
				this._http.post('addAppointment', formData).subscribe({
					next: (apiResult) => {
						this.isDisable = false;
						this.submitted = false;
						this._loader.useRef().complete();
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
	 * *Back to last visit page
	 *
	 * @date 09 May 2023
	 * @developer Somnath Sil
	 */
	backTo() {
		this._location.back();
	}

	/**
	 * *Reset form method
	 *
	 * @date 09 May 2023
	 * @developer Somnath Sil
	 */
	resetForm() {
		this.appointmentAddForm.reset();
		this.appointmentAddForm.setValidators(null);
		this.appointmentAddForm.updateValueAndValidity();
	}

	/**
	 * *Unsubscribing observable on destroy
	 *
	 * @date 09 Aug 2023
	 * @developer Somnath Sil
	 */
	ngOnDestroy(): void {
		this.subscriptions.forEach((subscription) => {
			subscription.unsubscribe();
		});
	}
}
