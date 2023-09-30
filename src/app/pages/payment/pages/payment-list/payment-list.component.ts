import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {
	CommonService,
	ConfirmationService,
	HttpService,
	ToasterService
} from '@app/core/services';
import { IPaymentList, IPaymentListParam } from '@app/shared/models';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-payment-list',
	templateUrl: './payment-list.component.html',
	styleUrls: ['./payment-list.component.scss']
})
export class PaymentListComponent implements OnInit {
	public totalRecords = 0;
	public paymentQueryForm!: FormGroup;
	public paymentList: IPaymentList[] = [];
	private subscriptions: Subscription[] = [];

	page_no: number = 1;
	page_size: number = 5;
	pageSizes: any = [5, 10, 15];

	constructor(
		private _commonService: CommonService,
		private _http: HttpService,
		private _loader: LoadingBarService,
		private _confirmationDialog: ConfirmationService,
		private _toast: ToasterService,
		private _formBuilder: FormBuilder
	) {}

	ngOnInit(): void {
		this._commonService.setLoadingStatus(true);
		this.createQueryForm();
		this.getPaymentListData();
	}

	/**
	 * *Getting payment list on page load
	 *
	 * @date 10 sep 2023
	 * @developer Somnath Sil
	 */
	public getPaymentListData() {
		const formValue = this.paymentQueryForm.value;
		let param: IPaymentListParam = {
			sort_by: formValue.sort_by,
			filter_by: formValue.filter_by,
			search_str: formValue.search_str,
			page_size: this.page_size,
			page_no: this.page_no
		};

		this._loader.useRef().start();
		this.subscriptions.push(
			this._http.post('paymentListing', param).subscribe({
				next: (apiResult) => {
					this._commonService.setLoadingStatus(false);
					this._loader.useRef().complete();
					this.paymentList = apiResult.response.dataset.records;
					this.totalRecords = apiResult.response.dataset.totalRecords;

					/* For Total Records */
					this._commonService._totalRecords.next(this.totalRecords);
					this._commonService._totalRecordsShow.next(true);
				},
				error: (apiError) => {
					this._commonService.setLoadingStatus(false);
					this._loader.useRef().complete();
				}
			})
		);
	}

	/**
	 * *Track by function
	 *
	 * @date 12 Sep 2023
	 * @developer Somnath Sil
	 */
	public trackByIndex(index: number, data: IPaymentList) {
		return data.payment_id;
	}

	/**
	 * * Delete payment method
	 *
	 * @date 12 Sep 2023
	 * @developer Somnath Sil
	 */
	onDeletePayment(paymentId: number) {
		this._confirmationDialog.confirm({
			icon: './assets/images/warning.svg',
			message: 'Do you want to delete this payment?',
			accept: () => {
				let param = {
					id: paymentId
				};
				this._loader.useRef().start();
				this.subscriptions.push(
					this._http.post('deletePayment', param).subscribe({
						next: (apiResult) => {
							this._loader.useRef().complete();
							this.getPaymentListData();
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
			},
			reject: () => {}
		});
	}

	createQueryForm() {
		this.paymentQueryForm = this._formBuilder.group({
			sort_by: new FormControl('', []),
			filter_by: new FormControl('', []),
			search_str: new FormControl('', [])
		});
	}

	/* Reset */
	onResetUser() {
		// this.adminUserList = [];
		// this.adminQueryForm.controls['sort_by'].setValue('');
		// this.adminQueryForm.controls['filter_by'].setValue('');
		// this.adminQueryForm.controls['search_str'].setValue('');
		this.createQueryForm();
		this.page_no = 1;
		this.getPaymentListData();
	}

	/* Pagintion */
	onPageNoChange(event: any) {
		this.page_no = event;
		this.getPaymentListData();
	}

	/* Pagintion */
	onPageSizeChange(event: any): void {
		this.page_size = event.target.value;
		this.page_no = 1;
		this.getPaymentListData();
	}

	/**
	 * *Unsubscribing obserables
	 *
	 * @date 05 Aug 2023
	 * @developer Somnath Sil
	 */
	ngOnDestroy(): void {
		this.subscriptions.forEach((subscription) =>
			subscription.unsubscribe()
		);
		this._commonService._totalRecords.next(0);
		this._commonService._totalRecordsShow.next(false);
	}
}
