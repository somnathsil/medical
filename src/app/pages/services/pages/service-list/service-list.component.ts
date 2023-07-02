import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {
	CommonService,
	ConfirmationService,
	HttpService,
	ToasterService
} from '@app/core/services';
import { IServiceList, IServiceListParam } from '@app/shared/models';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-service-list',
	templateUrl: './service-list.component.html',
	styleUrls: ['./service-list.component.scss']
})
export class ServiceListComponent implements OnInit {
	public totalRecords = 0;
	public serviceQueryForm!: FormGroup;
	public serviceList: IServiceList[] = [];
	private subscriptions: Subscription[] = [];

	page_no: number = 1;
	page_size: number = 2;
	pageSizes: any = [1, 2, 3];

	constructor(
		private _commonService: CommonService,
		private _http: HttpService,
		private _loader: LoadingBarService,
		private _confirmationDialog: ConfirmationService,
		private _toast: ToasterService,
		private _formBuilder: FormBuilder
	) {}

	ngOnInit(): void {
		this._commonService.setLoadingStatus(false);
		this.createQueryForm();
		this.getServiceListData();
	}

	/**
	 * *Getting service list on page load
	 *
	 * @date 30 June 2023
	 * @developer Somnath Sil
	 */
	public getServiceListData() {
		const formValue = this.serviceQueryForm.value;
		let param: IServiceListParam = {
			sort_by: formValue.sort_by,
			search_str: formValue.search_str,
			page_size: this.page_size,
			page_no: this.page_no
		};

		this._loader.useRef().start();
		this.subscriptions.push(
			this._http.post('serviceList', param).subscribe({
				next: (apiResult) => {
					this._loader.useRef().complete();
					this.serviceList = apiResult.response.dataset.records;
					this.totalRecords = apiResult.response.dataset.totalRecords;

					/* For Total Records */
					this._commonService._totalRecords.next(this.totalRecords);
					this._commonService._totalRecordsShow.next(true);
				},
				error: (apiError) => {
					this._loader.useRef().complete();
				}
			})
		);
	}

	/**
	 * *Track by function
	 *
	 * @date 26 June 2023
	 * @developer Somnath Sil
	 */
	public trackByIndex(index: number, data: IServiceList) {
		return data.id;
	}

	/**
	 * * Delete service list method
	 *
	 * @date 30 June 2023
	 * @developer Somnath Sil
	 */
	onDeleteService(userId: number) {
		this._confirmationDialog.confirm({
			icon: './assets/images/warning.svg',
			message: 'Do you want to delete this service?',
			accept: () => {
				let param = {
					id: userId
				};
				this._loader.useRef().start();
				this.subscriptions.push(
					this._http.post('deleteService', param).subscribe({
						next: (apiResult) => {
							this._loader.useRef().complete();
							this.getServiceListData();
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
		this.serviceQueryForm = this._formBuilder.group({
			sort_by: new FormControl('', []),
			search_str: new FormControl('', [])
		});
	}

	/* Reset Method */
	onResetUser() {
		// this.adminUserList = [];
		// this.adminQueryForm.controls['sort_by'].setValue('');
		// this.adminQueryForm.controls['filter_by'].setValue('');
		// this.adminQueryForm.controls['search_str'].setValue('');
		this.createQueryForm();
		this.page_no = 1;
		this.getServiceListData();
	}

	/* Pagintion Method */
	onPageNoChange(event: any) {
		this.page_no = event;
		this.getServiceListData();
	}

	/* Pagintion Method */
	onPageSizeChange(event: any): void {
		this.page_size = event.target.value;
		this.page_no = 1;
		this.getServiceListData();
	}

	/**
	 * *Unsubscribing obserables
	 *
	 * @date 30 June 2023
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
