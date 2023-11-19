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
import { IPaymentMode, IService } from '@app/shared/models';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Subscription } from 'rxjs';
import { DatePipe, Location } from '@angular/common';

@Component({
	selector: 'app-payment-add',
	templateUrl: './payment-add.component.html',
	styleUrls: ['./payment-add.component.scss'],
	providers: [DatePipe],
	animations: [fadeInOut]
})
export class PaymentAddComponent implements OnInit, AfterViewInit {
	public submitted = false;
	public isDisable = false;
	public paymentAddForm!: FormGroup;
	public serviceList!: IService[];
	public paymentMode!: IPaymentMode[];
	public subscriptions: Subscription[] = [];
	@ViewChild('inputFocus') inputFocus!: ElementRef;

	constructor(
		private _formBuilder: FormBuilder,
		private _commonService: CommonService,
		private _loader: LoadingBarService,
		private _router: Router,
		private _http: HttpService,
		private _toast: ToasterService,
		private _location: Location,
		private _datePipe: DatePipe
	) {}

	ngOnInit(): void {
		this._commonService.setLoadingStatus(false);
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
	getAllDropdowns(): void {
		this.serviceList = this._commonService.serviceListArr();
		this.paymentMode = [
			{ id: 1, label: 'Debit Card', name: 'DC' },
			{ id: 2, label: 'Credit Card', name: 'CC' },
			{ id: 3, label: 'Cash', name: 'C' }
		];
	}

	/**
	 * *Initializing form controls and validation in payment add form
	 *
	 * @date 15 Oct 2022
	 * @developer Somnath Sil
	 */
	private initPaymentAddForm() {
		this.paymentAddForm = this._formBuilder.group({
			patient_name: new FormControl('', [
				Validators.required,
				Validators.pattern(/^([^0-9]*)$/)
			]),
			contact: new FormControl('', [Validators.required]),
			disease: new FormControl('', [Validators.required]),
			payment_date: new FormControl('', [Validators.required]),
			total_amount: new FormControl('', [Validators.required]),
			payment_mode: new FormControl('', [Validators.required]),
			status: new FormControl(false, [Validators.required])
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
		if (!this.isDisable) {
			this.submitted = true;
			const formValue = this.paymentAddForm.value;

			if (this.paymentAddForm.invalid) {
				this.paymentAddForm.markAllAsTouched();
				return true;
			}

			// form is valid
			this.isDisable = true;
			let date = new Date(formValue.payment_date);
			date.setDate(date.getDate() + 1);
			let param: any = {
				patient_name: formValue.patient_name,
				payment_date: this._datePipe.transform(date, 'MM-dd-yyyy'),
				amount: formValue.total_amount,
				contact: formValue.contact,
				payment_mode: formValue.payment_mode,
				service_id: formValue.disease,
				payment_status: formValue.status ? 'Y' : 'N'
			};

			this._loader.useRef().start();
			this.subscriptions.push(
				this._http.post('addPayment', param).subscribe({
					next: (apiResult) => {
						this.isDisable = false;
						this.submitted = false;
						this._loader.useRef().complete();
						this.resetForm();
						this._router.navigate(['/payments']);
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
		this.paymentAddForm.reset();
		this.paymentAddForm.setValidators(null);
		this.paymentAddForm.updateValueAndValidity();
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
