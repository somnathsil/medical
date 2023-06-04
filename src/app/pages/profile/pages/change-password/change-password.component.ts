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
import { IChangePasswordParam } from '@app/shared/models';
import { PasswordValidator } from '@app/shared/validators';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-change-password',
	templateUrl: './change-password.component.html',
	styleUrls: ['./change-password.component.scss'],
	animations: [fadeInOut]
})
export class ChangePasswordComponent
	implements OnInit, AfterViewInit, OnDestroy
{
	public submitted = false;
	public isDisable = false;
	public changePasswordForm!: FormGroup;
	public subscriptions: Subscription[] = [];
	public toggleInputTypeCurrent = false;
	public toggleInputTypeNew = false;
	public toggleInputTypeConfirm = false;
	@ViewChild('inputFocus') inputFocus!: ElementRef;

	constructor(
		private _formBuilder: FormBuilder,
		private _commonService: CommonService,
		private _loader: LoadingBarService,
		private _http: HttpService,
		private _toast: ToasterService,
		private _location: Location
	) {}

	ngOnInit(): void {
		this._commonService.setLoadingStatus(false);
		this.initChangePasswordForm();
	}

	ngAfterViewInit(): void {
		this.inputFocus.nativeElement.focus();
	}

	/**
	 * *Initializing form controls and validation in change password form
	 *
	 * @date 5 Oct 2022
	 * @developer Somnath Sil
	 */
	private initChangePasswordForm() {
		this.changePasswordForm = this._formBuilder.group(
			{
				old_password: new FormControl('', [Validators.required]),
				new_password: new FormControl('', [Validators.required]),
				con_password: new FormControl('', [Validators.required])
			},
			{
				validators: PasswordValidator.passwordsMustMatch(
					'new_password',
					'con_password'
				)
			}
		);
	}

	/**
	 * *Getting all form controls from change password Form
	 *
	 * @returns form controls
	 * @date 5 Oct 2022
	 * @developer Somnath Sil
	 */

	get formcontrol() {
		return this.changePasswordForm.controls;
	}

	/**
	 * *Checking if control has error
	 *
	 * @returns boolean
	 * @date 5 Oct 2022
	 * @developer Somnath Sil
	 */
	public hasFormControlError(field: string): boolean {
		const control = this.changePasswordForm.get(field) as FormControl;
		if (
			(this.submitted && control.errors) ||
			(control.invalid && control.dirty)
		) {
			return true;
		}
		return false;
	}

	changePasswordSubmit(): boolean | void {
		if (!this.isDisable) {
			const formValue = this.changePasswordForm.value;
			this.submitted = true;

			if (this.changePasswordForm.invalid) {
				this.changePasswordForm.markAllAsTouched();
				return true;
			}

			//form is valid
			this.isDisable = true;
			const param: IChangePasswordParam = {
				current_password:
					this.changePasswordForm.get('old_password')?.value,
				password: this.changePasswordForm.get('new_password')?.value,
				con_password: this.changePasswordForm.get('con_password')?.value
			};

			this._loader.useRef().start();
			this.subscriptions.push(
				this._http.post('changePwd', param).subscribe({
					next: (apiResult) => {
						this.isDisable = false;
						this.submitted = false;
						this._loader.useRef().complete();
						this.resetForm();
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
	 * @date 04 May 2023
	 * @developer Somnath Sil
	 */
	backTo() {
		this._location.back();
	}

	/**
	 * *Reset form method
	 *
	 * @date 06 May 2023
	 * @developer Somnath Sil
	 */
	resetForm() {
		this.changePasswordForm.reset();
		this.changePasswordForm.setValidators(null);
		this.changePasswordForm.updateValueAndValidity();
	}

	/**
	 * *Unsubscribing observable on destroy
	 *
	 * @date 03 May 2023
	 * @developer Somnath Sil
	 */
	ngOnDestroy(): void {
		this.subscriptions.forEach((subscription) => {
			subscription.unsubscribe();
		});
	}
}
