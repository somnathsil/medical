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
import { IDisease, IPaymentMode } from '@app/shared/models';

@Component({
	selector: 'app-payment-add',
	templateUrl: './payment-add.component.html',
	styleUrls: ['./payment-add.component.scss'],
	animations: [fadeInOut]
})
export class PaymentAddComponent implements OnInit, AfterViewInit {
	constructor(private _formbuilder: FormBuilder) {}

	public submitted = false;
	public paymentAddForm!: FormGroup;
	public diseases!: IDisease[];
	public paymentMode!: IPaymentMode[];
	@ViewChild('inputFocus') inputFocus!: ElementRef;

	ngOnInit(): void {
		console.clear();
		this.getAllDropdowns();
		this.initPaymentAddForm();
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
		this.paymentAddForm = this._formbuilder.group({
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
		return this.paymentAddForm.controls;
	}

	/**
	 * *Checking if control has error
	 *
	 * @returns boolean
	 * @date 15 Oct 2022
	 * @developer Somnath Sil
	 */
	public hasFormControlError(field: string): boolean {
		const control = this.paymentAddForm.get(field) as FormControl;
		if (
			(this.submitted && control.errors) ||
			(control.invalid && control.dirty)
		) {
			return true;
		}
		return false;
	}

	onAddPaymentSubmit(): boolean | void {
		this.submitted = true;
		const formValue = this.paymentAddForm.value;

		// stop here if form is invalid
		if (this.paymentAddForm.invalid) {
			return false;
		}

		//form is valid
		if (this.paymentAddForm.valid) {
			console.log(formValue);
		}
	}
}
