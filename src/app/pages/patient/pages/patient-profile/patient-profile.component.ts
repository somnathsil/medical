import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService, HttpService } from '@app/core/services';
import { IPatientDetails } from '@app/shared/models';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Subscription, map } from 'rxjs';

@Component({
	selector: 'app-patient-profile',
	templateUrl: './patient-profile.component.html',
	styleUrls: ['./patient-profile.component.scss']
})
export class PatientProfileComponent implements OnInit {
	patientDetails: IPatientDetails[] = [];
	public userId: number | string;
	private subscriptions: Subscription[] = [];

	constructor(
		private _http: HttpService,
		private _commonService: CommonService,
		private _actRoute: ActivatedRoute,
		private _loader: LoadingBarService
	) {
		// this._actRoute.paramMap.subscribe((param: any) => {
		// 	console.log(param.params.id);
		// });

		// this.userId = this._actRoute.snapshot.params['id'];

		this.userId = this._actRoute.snapshot.paramMap.get('id') as string;
	}

	ngOnInit(): void {
		this._commonService.setLoadingStatus(true);
		this.patchPatientDetails();
	}

	/**
	 * *Getting patient details list on page load
	 *
	 * @date 19 Nov 2023
	 * @developer Somnath Sil
	 */
	patchPatientDetails() {
		let param = {
			id: this.userId
		};
		this._loader.useRef().start();
		this.subscriptions.push(
			this._http
				.post('details', param)
				.pipe(
					map((apiResult) => {
						const patients = apiResult.response.dataset;
						return patients.map((patient: IPatientDetails) => {
							return {
								email: patient.email,
								name: patient.name,
								contact: patient.contact,
								image: patient.image,
								city: patient.city,
								address: patient.address,
								age: patient.age,
								visited: patient.visited == 'Y' ? 'Yes' : 'No',
								visited_date: patient.visited_date,
								gender:
									patient.gender == 'M' ? 'Male' : 'Female',
								bloog_group: patient.bloog_group,
								dob: patient.dob,
								service_name: patient.service_name
							} as IPatientDetails;
						});
					})
				)
				.subscribe({
					next: (apiResult) => {
						this._commonService.setLoadingStatus(false);
						this._loader.useRef().complete();
						this.patientDetails = apiResult;
					},
					error: (apiError) => {
						this._commonService.setLoadingStatus(false);
						this._loader.useRef().complete();
					}
				})
		);
	}

	/**
	 * *Unsubscribing obserables
	 *
	 * @date 19 Nov 2023
	 * @developer Somnath Sil
	 */
	ngOnDestroy(): void {
		this.subscriptions.forEach((subscription) =>
			subscription.unsubscribe()
		);
	}
}
