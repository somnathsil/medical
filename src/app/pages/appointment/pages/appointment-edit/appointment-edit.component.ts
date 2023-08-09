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
import {
	IDoctor,
	IGender,
	IService
} from '@app/shared/models/appointment.model';

@Component({
	selector: 'app-appointment-edit',
	templateUrl: './appointment-edit.component.html',
	styleUrls: ['./appointment-edit.component.scss'],
	animations: [fadeInOut]
})
export class AppointmentEditComponent implements OnInit, AfterViewInit {
	constructor(
		private _formbuilder: FormBuilder,
		private _commonService: CommonService
	) {}

	public submitted = false;
	public appointmentEditForm!: FormGroup;
	public services!: IService[];
	public doctors!: IDoctor[];
	public gender!: IGender[];
	@ViewChild('inputFocus') inputFocus!: ElementRef;

	ngOnInit(): void {
		this._commonService.setLoadingStatus(false);
		this.getAllDropdowns();
		this.initAppointmentEditForm();
		this.onEditPatchUpdate();
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
	private initAppointmentEditForm() {
		this.appointmentEditForm = this._formbuilder.group({
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
		this.submitted = true;
		const formValue = this.appointmentEditForm.value;

		// stop here if form is invalid
		if (this.appointmentEditForm.invalid) {
			return false;
		}

		//form is valid
		if (this.appointmentEditForm.valid) {
			console.log(formValue);
		}
	}

	private onEditPatchUpdate() {
		this.appointmentEditForm.patchValue({
			name: 'Jhon Doe',
			email: 'admin121@gmail.com',
			phone_number: '1234567890',
			service: 'ENT Checkup',
			appointment_date: '12/10/2022',
			gender: 'Male'
		});
	}
}
