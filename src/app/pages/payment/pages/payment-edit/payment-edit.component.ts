import { Component, OnInit } from '@angular/core';
import {
	FormBuilder,
	FormControl,
	FormGroup,
	Validators
} from '@angular/forms';
import { CommonService } from '@app/core/services';
import { fadeInOut } from '@app/shared/animations';
import { IDisease, IPaymentMode } from '@app/shared/models';

@Component({
	selector: 'app-payment-edit',
	templateUrl: './payment-edit.component.html',
	styleUrls: ['./payment-edit.component.scss'],
	animations: [fadeInOut]
})
export class PaymentEditComponent implements OnInit {
	constructor(
		private _formbuilder: FormBuilder,
		private _commonService: CommonService
	) {}

	public submitted = false;
	public paymentEditForm!: FormGroup;
	public diseases!: IDisease[];
	public paymentMode!: IPaymentMode[];

	ngOnInit(): void {
		this._commonService.setLoadingStatus(false);
		console.clear();
		this.getAllDropdowns();
		this.initPaymentAddForm();
		this.onEditPatchUpdate();
	}

	/**
	 * *Initializing all dropdowns
	 *
	 * @date 15 Oct 2022
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
		this.paymentMode = [
			{ id: 1, label: 'Debit Card' },
			{ id: 2, label: 'Credit Card' }
		];
	}

	/**
	 * *Initializing form controls and validation in payment add form
	 *
	 * @date 15 Oct 2022
	 * @developer Somnath Sil
	 */
	private initPaymentAddForm() {
		this.paymentEditForm = this._formbuilder.group({
			patient_name: new FormControl('', [
				Validators.required,
				Validators.pattern(/^([^0-9]*)$/)
			]),
			disease: new FormControl('', [Validators.required]),
			payment_date: new FormControl('', [Validators.required]),
			total_amount: new FormControl('', [Validators.required]),
			payment_mode: new FormControl('', [Validators.required]),
			status: new FormControl('', [Validators.required])
		});
	}

	/**
	 * *Getting all form controls from payment add Form
	 *
	 * @returns form controls
	 * @date 15 Oct 2022
	 * @developer Somnath Sil
	 */

	get formcontrol() {
		return this.paymentEditForm.controls;
	}

	/**
	 * *Checking if control has error
	 *
	 * @returns boolean
	 * @date 15 Oct 2022
	 * @developer Somnath Sil
	 */
	public hasFormControlError(field: string): boolean {
		const control = this.paymentEditForm.get(field) as FormControl;
		if (
			(this.submitted && control.errors) ||
			(control.invalid && control.dirty)
		) {
			return true;
		}
		return false;
	}

	onEditPaymentSubmit(): boolean | void {
		this.submitted = true;
		const formValue = this.paymentEditForm.value;

		// stop here if form is invalid
		if (this.paymentEditForm.invalid) {
			return false;
		}

		//form is valid
		if (this.paymentEditForm.valid) {
			console.log(formValue);
		}
	}

	public onEditPatchUpdate() {
		this.paymentEditForm.patchValue({
			patient_name: 'Abdul Mohammad',
			disease: 'Fever',
			payment_date: '10/11/2022',
			total_amount: '7000',
			payment_mode: 'Debit Card',
			status: 'true'
		});
	}
}
