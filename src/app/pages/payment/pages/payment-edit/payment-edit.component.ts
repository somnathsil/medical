import { Component, OnInit } from '@angular/core';
import {
	FormBuilder,
	FormControl,
	FormGroup,
	Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService, HttpService, ToasterService } from '@app/core/services';
import { fadeInOut } from '@app/shared/animations';
import { IDisease, IPaymentMode, IService } from '@app/shared/models';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';

@Component({
	selector: 'app-payment-edit',
	templateUrl: './payment-edit.component.html',
	styleUrls: ['./payment-edit.component.scss'],
	animations: [fadeInOut]
})
export class PaymentEditComponent implements OnInit {
	submitted = false;
	isDisable = false;
	paymentEditForm!: FormGroup;
	serviceList: IService[] = [];
	paymentMode!: IPaymentMode[];
	public paymentId: number | string;
	subscriptions: Subscription[] = [];

	constructor(
		private _formBuilder: FormBuilder,
		private _commonService: CommonService,
		private _actRoute: ActivatedRoute,
		private _loader: LoadingBarService,
		private _router: Router,
		private _http: HttpService,
		private _toast: ToasterService,
		private _location: Location
	) {
		// this._actRoute.paramMap.subscribe((param: any) => {
		// 	console.log(param.params.id);
		// });

		// this.userId = this._actRoute.snapshot.params['id'];

		this.paymentId = this._actRoute.snapshot.paramMap.get('id') as string;
	}

	ngOnInit(): void {
		this._commonService.setLoadingStatus(true);
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
		this.paymentEditForm = this._formBuilder.group({
			patient_name: new FormControl('', [
				Validators.required,
				Validators.pattern(/^([^0-9]*)$/)
			]),
			contact: new FormControl('', []),
			disease: new FormControl('', [Validators.required]),
			payment_date: new FormControl(new Date(), [Validators.required]),
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
		if (!this.isDisable) {
			const formValue = this.paymentEditForm.value;
			this.submitted = true;
			if (this.paymentEditForm.invalid) {
				this.paymentEditForm.markAllAsTouched();
				return true;
			}
			// form is valid
			this.isDisable = true;
			let param: any = {
				id: this.paymentId as string,
				patient_name: formValue.patient_name,
				payment_date: formValue.payment_date,
				amount: formValue.total_amount,
				contact: formValue.contact,
				payment_mode: formValue.payment_mode,
				service_id: formValue.disease,
				payment_status: formValue.status ? 'Y' : 'N'
			};

			console.log('Edit Param', param.payment_date);

			this._loader.useRef().start();
			this.subscriptions.push(
				this._http.post('editPayment', param).subscribe({
					next: (apiResult) => {
						this._commonService.setLoadingStatus(false);
						this.isDisable = false;
						this._loader.useRef().complete();
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
						this._commonService.setLoadingStatus(false);
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

	public onEditPatchUpdate() {
		const param = {
			id: this.paymentId
		};

		this.subscriptions.push(
			this._http.post('detailsPayments', param).subscribe({
				next: (apiResult) => {
					this._commonService.setLoadingStatus(false);
					const apiPath = apiResult.response.dataset[0];
					this.paymentEditForm.patchValue({
						paymentId: apiPath.payment_id,
						patient_name: apiPath.patient_name,
						contact: apiPath.contact,
						total_amount: apiPath.amount,
						payment_date: apiPath.payment_date,
						disease: apiPath.service_id,
						payment_mode: apiPath.payment_mode,
						status: apiPath.payment_status == 'Y' ? true : false
					});
				},
				error: (apiError) => {
					this._commonService.setLoadingStatus(false);
				}
			})
		);
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

	/**
	 * *Unsubscribing observable on destroy
	 *
	 * @date 26 May 2023
	 * @developer Somnath Sil
	 */
	ngOnDestroy(): void {
		this.subscriptions.forEach((subscription) => {
			subscription.unsubscribe();
		});
	}
}
