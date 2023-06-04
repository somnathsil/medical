import { Component, OnInit } from '@angular/core';
import {
	CommonService,
	ConfirmationService,
	HttpService,
	ToasterService
} from '@app/core/services';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { IAdminUserList, IAdminUserListParam } from '@app/shared/models';
import { Subscription } from 'rxjs';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
	selector: 'app-admin-user-list',
	templateUrl: './admin-user-list.component.html',
	styleUrls: ['./admin-user-list.component.scss']
})
export class AdminUserListComponent implements OnInit {
	public totalRecords = 0;
	public routeUsername = '';
	public adminQueryForm!: FormGroup;
	public adminUserList: IAdminUserList[] = [];
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
		this._commonService.setLoadingStatus(false);
		this.createQueryForm();
		this.getAdminUserListData();
	}

	/**
	 * *Getting admin user list on page load
	 *
	 * @date 17 May 2023
	 * @developer Somnath Sil
	 */
	public getAdminUserListData() {
		const formValue = this.adminQueryForm.value;
		let param: IAdminUserListParam = {
			type: 'A',
			sort_by: formValue.sort_by,
			filter_by: formValue.filter_by,
			search_str: formValue.search_str,
			page_size: this.page_size,
			page_no: this.page_no
		};

		this._loader.useRef().start();
		this.subscriptions.push(
			this._http.post('/listing', param).subscribe({
				next: (apiResult) => {
					this._loader.useRef().complete();
					this.adminUserList = apiResult.response.dataset.records;
					this.totalRecords = apiResult.response.dataset.totalRecords;
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
	 * @date 17 May 2023
	 * @developer Somnath Sil
	 */
	public trackByIndex(index: number, data: IAdminUserList) {
		return data.user_id;
	}

	/**
	 * * Delete admin user method
	 *
	 * @date 18 May 2023
	 * @developer Somnath Sil
	 */
	onDeleteUser(userId: number) {
		this._confirmationDialog.confirm({
			icon: './assets/images/warning.svg',
			message: 'Do you want to delete this user?',
			accept: () => {
				let param = {
					id: userId
				};
				this._loader.useRef().start();
				this.subscriptions.push(
					this._http.post('delete', param).subscribe({
						next: (apiResult) => {
							this._loader.useRef().complete();
							this.getAdminUserListData();
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
		this.adminQueryForm = this._formBuilder.group({
			sort_by: new FormControl('', []),
			filter_by: new FormControl('', []),
			search_str: new FormControl('', [])
		});
	}

	onResetUser() {
		// this.adminUserList = [];
		// this.adminQueryForm.controls['sort_by'].setValue('');
		// this.adminQueryForm.controls['filter_by'].setValue('');
		// this.adminQueryForm.controls['search_str'].setValue('');
		this.createQueryForm();
		this.page_no = 1;
		this.getAdminUserListData();
	}

	onPageNoChange(event: any) {
		this.page_no = event;
		this.getAdminUserListData();
	}

	onPageSizeChange(event: any): void {
		this.page_size = event.target.value;
		this.page_no = 1;
		this.getAdminUserListData();
	}

	/**
	 * *Unsubscribing obserables
	 *
	 * @date 17 May 2023
	 * @developer Somnath Sil
	 */
	ngOnDestroy(): void {
		this.subscriptions.forEach((subscription) =>
			subscription.unsubscribe()
		);
	}
}
