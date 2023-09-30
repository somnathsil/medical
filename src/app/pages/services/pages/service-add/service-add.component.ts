import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService, HttpService, ToasterService } from '@app/core/services';
import { fadeInOut } from '@app/shared/animations';
import { IService } from '@app/shared/models';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-service-add',
	templateUrl: './service-add.component.html',
	styleUrls: ['./service-add.component.scss'],
	animations: [fadeInOut]
})
export class ServiceAddComponent implements OnInit, OnDestroy {
	public submitted = false;
	public subscriptions: Subscription[] = [];
	public serviceList: IService[] = [];
	public doctorsList: any = [];
	public selectedDoctor!: [];
	public param: any = {};

	constructor(
		private _commonService: CommonService,
		private _loader: LoadingBarService,
		private _http: HttpService,
		private _router: Router,
		private _toast: ToasterService,
		private _location: Location
	) {}

	ngOnInit(): void {
		this._commonService.setLoadingStatus(false);
		this.getDoctorData();
		this.getServiceData();
	}

	ngAfterViewInit(): void {}

	/**
	 * *getting doctors items from dropdowns
	 *
	 * @date 04 July 2023
	 * @developer Somnath Sil
	 */
	private getServiceData(): void {
		this.serviceList = this._commonService.serviceListArr();
	}

	/**
	 * *getting doctors items from dropdowns
	 *
	 * @date 30 May 2023
	 * @developer Somnath Sil
	 */
	private getDoctorData() {
		this.subscriptions.push(
			this._http.post('doctorsNameList').subscribe((data) => {
				this.doctorsList = data.response.dataset;
			})
		);
	}

	setServiceData(event: Event) {
		let serviceID = (event.target as HTMLSelectElement).value;
		let serviceName = this.serviceList[parseInt(serviceID) - 1].name;

		this.param['service_id'] = serviceID;
		this.param['service_name'] = serviceName;
	}

	onSubmit() {
		this.submitted = true;
		this.param['doctor_ids'] = this.selectedDoctor.join(',');

		this._loader.useRef().start();
		this.subscriptions.push(
			this._http.post('addService', this.param).subscribe({
				next: (apiResult) => {
					this._loader.useRef().complete();
					this._router.navigate(['/services']);
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
	}

	/**
	 * *Back to last visit page
	 *
	 * @date 04 May 2023
	 * @developer Somnath Sil
	 */
	backTo() {
		this._location.back();
	}

	/**
	 * *Unsubscribing observable on destroy
	 *
	 * @date 30 May 2023
	 * @developer Somnath Sil
	 */
	ngOnDestroy(): void {
		this.subscriptions.forEach((subscription) => {
			subscription.unsubscribe();
		});
	}
}
