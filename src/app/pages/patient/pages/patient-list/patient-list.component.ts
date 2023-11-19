import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
	CommonService,
	ConfirmationService,
	HttpService,
	ToasterService
} from '@app/core/services';
import { IPatientList, IPatientListParam } from '@app/shared/models';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-patient-list',
	templateUrl: './patient-list.component.html',
	styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent implements OnInit {
	public totalRecords = 0;
	public adminQueryForm!: FormGroup;
	private subscriptions: Subscription[] = [];
	public patientList: IPatientList[] = [];

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
		this.getPatientListData();
	}

	/**
	 * *Getting patient list on page load
	 *
	 * @date 04 Nov 2023
	 * @developer Somnath Sil
	 */
	public getPatientListData() {
		const formValue = this.adminQueryForm.value;
		let param: IPatientListParam = {
			type: 'P',
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
					this._commonService.setLoadingStatus(false);
					this._loader.useRef().complete();
					this.patientList = apiResult.response.dataset.records;
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
	 * @date 04 Nov 2023
	 * @developer Somnath Sil
	 */
	public trackByIndex(index: number, data: IPatientList) {
		return data.user_id;
	}

	/**
	 * * Delete patient user method
	 *
	 * @date 15 Nov 2023
	 * @developer Somnath Sil
	 */
	onDeleteUser(userId: number) {
		this._confirmationDialog.confirm({
			icon: './assets/images/warning.svg',
			message: 'Do you want to delete this Patient?',
			accept: () => {
				let param = {
					id: userId
				};
				this._loader.useRef().start();
				this.subscriptions.push(
					this._http.post('delete', param).subscribe({
						next: (apiResult) => {
							this._loader.useRef().complete();
							this.getPatientListData();
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

	/* Reset */
	onResetUser() {
		// this.adminUserList = [];
		// this.adminQueryForm.controls['sort_by'].setValue('');
		// this.adminQueryForm.controls['filter_by'].setValue('');
		// this.adminQueryForm.controls['search_str'].setValue('');
		this.createQueryForm();
		this.page_no = 1;
		this.getPatientListData();
	}

	/* Pagintion */
	onPageNoChange(event: any) {
		this.page_no = event;
		this.getPatientListData();
	}

	/* Pagintion */
	onPageSizeChange(event: any): void {
		this.page_size = event.target.value;
		this.page_no = 1;
		this.getPatientListData();
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
		this._commonService._totalRecords.next(0);
		this._commonService._totalRecordsShow.next(false);
	}
}
