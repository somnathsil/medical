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
import { IGender, IService } from '@app/shared/models/appointment.model';

@Component({
	selector: 'app-appointment-add',
	templateUrl: './appointment-add.component.html',
	styleUrls: ['./appointment-add.component.scss'],
	animations: [fadeInOut]
})
export class AppointmentAddComponent implements OnInit, AfterViewInit {
	constructor(
		private _formbuilder: FormBuilder,
		private _commonService: CommonService
	) {}

	public submitted = false;
	public appointmentAddForm!: FormGroup;
	public services!: IService[];
	public gender!: IGender[];
	@ViewChild('inputFocus') inputFocus!: ElementRef;

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
		this.gender = [
			{ id: 1, label: 'Male' },
			{ id: 2, label: 'Female' }
		];
	}

	/**
	 * *Initializing form controls and validation in appointment add form
	 *
	 * @date 15 Oct 2022
	 * @developer Somnath Sil
	 */
	private initAppointmentAddForm() {
		this.appointmentAddForm = this._formbuilder.group({
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
			service: new FormControl('', [Validators.required]),
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
		this.submitted = true;
		const formValue = this.appointmentAddForm.value;

		// stop here if form is invalid
		if (this.appointmentAddForm.invalid) {
			return false;
		}

		//form is valid
		if (this.appointmentAddForm.valid) {
			console.log(formValue);
		}
	}
}
