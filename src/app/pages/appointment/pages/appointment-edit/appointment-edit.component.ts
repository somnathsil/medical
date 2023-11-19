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
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService, HttpService, ToasterService } from '@app/core/services';
import { fadeInOut } from '@app/shared/animations';
import {
	IDoctor,
	IGender,
	IService
} from '@app/shared/models/appointment.model';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Subscription } from 'rxjs';
import { DatePipe, Location } from '@angular/common';

@Component({
	selector: 'app-appointment-edit',
	templateUrl: './appointment-edit.component.html',
	styleUrls: ['./appointment-edit.component.scss'],
	providers: [DatePipe],
	animations: [fadeInOut]
})
export class AppointmentEditComponent implements OnInit, AfterViewInit {
	public submitted = false;
	public isDisable = false;
	public appointmentId: number | string;
	public appointmentEditForm!: FormGroup;
	public serviceList: IService[] = [];
	public doctors!: IDoctor[];
	public gender!: IGender[];
	imageFileName!: string;
	public subscriptions: Subscription[] = [];
	@ViewChild('inputFocus') inputFocus!: ElementRef;

	constructor(
		private _formBuilder: FormBuilder,
		private _commonService: CommonService,
		private _actRoute: ActivatedRoute,
		private _loader: LoadingBarService,
		private _router: Router,
		private _http: HttpService,
		private _toast: ToasterService,
		private _location: Location,
		private _datePipe: DatePipe
	) {
		this.appointmentId = this._actRoute.snapshot.paramMap.get(
			'id'
		) as string;
	}

	ngOnInit(): void {
		this._commonService.setLoadingStatus(true);
		this.getAllDropdowns();
		this.getAppointmentDetails();
		this.initAppointmentEditForm();
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
	getAllDropdowns(): void {
		this.serviceList = this._commonService.serviceListArr();
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
	private initAppointmentEditForm() {
		this.appointmentEditForm = this._formBuilder.group({
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
			image: new FormControl('', [])
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
		return this.appointmentEditForm.controls;
	}

	/**
	 * *Checking if control has error
	 *
	 * @returns boolean
	 * @date 15 Oct 2022
	 * @developer Somnath Sil
	 */
	public hasFormControlError(field: string): boolean {
		const control = this.appointmentEditForm.get(field) as FormControl;
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
			const formValue = this.appointmentEditForm.value;

			if (this.appointmentEditForm.invalid) {
				this.appointmentEditForm.markAllAsTouched();
				return true;
			}

			// form is valid
			this.isDisable = true;
			let date = new Date(
				this.appointmentEditForm.get('appointment_date')?.value
			);
			date.setDate(date.getDate() + 1);

			let formData = new FormData();
			formData.append('id', this.appointmentId as string);
			formData.append(
				'patient_name',
				this.appointmentEditForm.get('name')?.value
			);
			formData.append(
				'email',
				this.appointmentEditForm.get('email')?.value
			);
			formData.append(
				'gender',
				this.appointmentEditForm.get('gender')?.value
			);
			formData.append(
				'contact',
				this.appointmentEditForm.get('phone_number')?.value
			);
			formData.append(
				'appoiment_date',
				this._datePipe.transform(date) ?? ''
			);
			formData.append(
				'service_id',
				this.appointmentEditForm.get('service_name')?.value
			);
			formData.append(
				'Doctor_id',
				this.appointmentEditForm.get('doctor_name')?.value
			);
			formData.append(
				'image',
				this.appointmentEditForm.get('image')?.value
			);

			// for (var pair of formData.entries()) {
			// 	console.log('hello', pair[0] + ', ' + pair[1]);
			// }

			this._loader.useRef().start();
			this.subscriptions.push(
				this._http.post('editAppointment', formData).subscribe({
					next: (apiResult) => {
						this.isDisable = false;
						this._loader.useRef().complete();
						this._router.navigate(['/appointments']);
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
	 * @date 29 May 2023
	 * @developer Somnath Sil
	 */
	backTo() {
		this._location.back();
	}

	abc(id: number) {
		this.subscriptions.push(
			this._http
				.post('doctorsListByService', {
					service_id: id
				})
				.subscribe({
					next: (apiResult) => {
						this._loader.useRef().complete();
						this.doctors = apiResult.response.dataset[0];
					},
					error: (apiError) => {
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

	getDoctor(event: any) {
		this._loader.useRef().start();
		this.abc(event.target.value);
	}

	/**
	 * *admin appointment details method
	 *
	 * @date 20 Aug 2023
	 * @developer Somnath Sil
	 */
	getAppointmentDetails() {
		const param = {
			id: this.appointmentId
		};
		this.subscriptions.push(
			this._http.post('appointmentDetails', param).subscribe({
				next: (apiResult) => {
					this._commonService.setLoadingStatus(false);
					const patchData = apiResult.response.dataset[0];
					this.abc(patchData.service_id);
					// console.log('Image', patchData.image.split('/').pop());

					this.appointmentEditForm.patchValue({
						appointmentId: patchData.appointment_id,
						name: patchData.patient_name,
						email: patchData.email,
						phone_number: patchData.contact,
						service_name: patchData.service_id,
						doctor_name: patchData.doctor_id,
						appointment_date: patchData.appoiment_date,
						gender: patchData.gender
					});
					if (patchData.originalFilename) {
						this.imageFileName = patchData.originalFilename;
					}
				},
				error: (apiError) => {
					this._commonService.setLoadingStatus(false);
				}
			})
		);
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
			this.appointmentEditForm.controls['image'].setValue(file);
			/* For Preview Image Base 64 */
			var reader = new FileReader();
			reader.readAsDataURL(event.target.files[0]);
			reader.onload = (event) => {};
		}
	}

	/**
	 * *Unsubscribing observable on destroy
	 *
	 * @date 20 Aug 2023
	 * @developer Somnath Sil
	 */
	ngOnDestroy(): void {
		this.subscriptions.forEach((subscription) => {
			subscription.unsubscribe();
		});
	}
}
