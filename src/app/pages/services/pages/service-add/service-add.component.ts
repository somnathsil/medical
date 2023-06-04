import { Location } from '@angular/common';
import {
	AfterViewInit,
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
export class ServiceAddComponent implements OnInit, AfterViewInit, OnDestroy {
	public submitted = false;
	public isDisable = false;
	public serviceForm!: FormGroup;
	public subscriptions: Subscription[] = [];
	public doctorsDropdownList: any = [];
	public selectedDoctor: number | undefined;
	@ViewChild('inputFocus') inputFocus!: ElementRef;

	constructor(
		private _commonService: CommonService,
		private _formBuilder: FormBuilder,
		private _loader: LoadingBarService,
		private _http: HttpService,
		private _toast: ToasterService,
		private _location: Location
	) {}

	ngOnInit(): void {
		this._commonService.setLoadingStatus(false);
		this.initChangePasswordForm();
		this.getDropdownsData();
	}

	ngAfterViewInit(): void {
		this.inputFocus.nativeElement.focus();
	}

	/**
	 * *getting doctors items from dropdowns
	 *
	 * @date 30 May 2023
	 * @developer Somnath Sil
	 */
	private getDropdownsData() {
		this.doctorsDropdownList = [
			{ id: 1, name: 'Volvo' },
			{ id: 2, name: 'Saab' },
			{ id: 3, name: 'Opel' },
			{ id: 4, name: 'Audi' }
		];
	}

	/**
	 * *Initializing form controls and validation in service form
	 *
	 * @date 30 May 2023
	 * @developer Somnath Sil
	 */
	private initChangePasswordForm() {
		this.serviceForm = this._formBuilder.group({
			service_name: new FormControl('', [Validators.required]),
			doctor_name: new FormControl('', [Validators.required])
		});
	}

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

	serviceFormSubmit(): boolean | void {
		const formValue = this.serviceForm.value;
		this.submitted = true;
		console.log(formValue);
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
