import { Location } from '@angular/common';
import {
	Component,
	ElementRef,
	OnDestroy,
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
	public isDisable = false;
	public serviceForm!: FormGroup;
	public subscriptions: Subscription[] = [];
	public serviceList: any = [];
	public doctorsList: any = [];
	public selectedDoctor!: [];
	public param: any = {};

	constructor(
		private _commonService: CommonService,
		private _formBuilder: FormBuilder,
		private _loader: LoadingBarService,
		private _http: HttpService,
		private _router: Router,
		private _toast: ToasterService,
		private _location: Location
	) {}

	ngOnInit(): void {
		this._commonService.setLoadingStatus(false);
		// this.initChangePasswordForm();
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
	private getServiceData() {
		this.serviceList = [
			{ id: 1, name: 'Fever' },
			{ id: 2, name: 'AurthoPedic' },
			{ id: 3, name: 'ENT' },
			{ id: 4, name: 'Chest Specialist' }
		];
	}

	/**
	 * *getting doctors items from dropdowns
	 *
	 * @date 30 May 2023
	 * @developer Somnath Sil
	 */
	private getDoctorData() {
		this._http.post('doctorsNameList').subscribe((data) => {
			this.doctorsList = data.response.dataset;
		});
		// this.doctorsList = [
		// 	{ id: 1, name: 'Volvo' },
		// 	{ id: 2, name: 'Saab' },
		// 	{ id: 3, name: 'Opel' },
		// 	{ id: 4, name: 'Audi' }
		// ];
	}

	setServiceData(event: Event) {
		let serviceID = (event.target as HTMLSelectElement).value;
		let serviceName = this.serviceList[parseInt(serviceID) - 1].name;

		this.param['service_id'] = serviceID;
		this.param['service_name'] = serviceName;
	}

	onSubmit() {
		this.param['doctor_ids'] = this.selectedDoctor.join(',');
		console.log('Doctor', JSON.stringify(this.param));
		this._http.post('addService', this.param).subscribe((Response) => {
			console.log('success');
		});
	}

	/**
	 * *Initializing form controls and validation in service form
	 *
	 * @date 30 May 2023
	 * @developer Somnath Sil
	 */
	// private initChangePasswordForm() {
	// 	this.serviceForm = this._formBuilder.group({
	// 		service_name: new FormControl('', [Validators.required]),
	// 		doctor_name: new FormControl('', [Validators.required])
	// 	});
	// }

	/**
	 * *Getting all form controls from service Form
	 *
	 * @returns form controls
	 * @date 30 May 2023
	 * @developer Somnath Sil
	 */

	get formcontrol() {
		return this.serviceForm.controls;
	}

	/**
	 * *Checking if control has error
	 *
	 * @returns boolean
	 * @date 30 May 2023
	 * @developer Somnath Sil
	 */
	public hasFormControlError(field: string): boolean {
		const control = this.serviceForm.get(field) as FormControl;
		if (
			(this.submitted && control.errors) ||
			(control.invalid && control.dirty)
		) {
			return true;
		}
		return false;
	}

	// serviceFormSubmit(): boolean | void {
	// 	const formValue = this.serviceForm.value;
	// 	this.submitted = true;
	// 	console.log(formValue);
	// }

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
	 * *Reset form method
	 *
	 * @date 30 May 2023
	 * @developer Somnath Sil
	 */
	resetForm() {
		this.serviceForm.reset();
		this.serviceForm.setValidators(null);
		this.serviceForm.updateValueAndValidity();
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
