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
import { Router } from '@angular/router';
import { CommonService, HttpService, ToasterService } from '@app/core/services';
import { fadeInOut } from '@app/shared/animations';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-admin-user-add',
	templateUrl: './admin-user-add.component.html',
	styleUrls: ['./admin-user-add.component.scss'],
	animations: [fadeInOut]
})
export class AdminUserAddComponent implements OnInit, AfterViewInit, OnDestroy {
	public isDisable = false;
	public submitted = false;
	public profileImage = '';
	public addAdminUserForm!: FormGroup;
	public subscriptions: Subscription[] = [];
	@ViewChild('inputFocus') inputFocus!: ElementRef;

	constructor(
		private _formBuilder: FormBuilder,
		private _commonService: CommonService,
		private _loader: LoadingBarService,
		private _router: Router,
		private _http: HttpService,
		private _toast: ToasterService,
		private _location: Location
	) {}

	ngOnInit(): void {
		this._commonService.setLoadingStatus(false);
		this.initAdminUserForm();
	}

	ngAfterViewInit(): void {
		this.inputFocus.nativeElement.focus();
	}

	/**
	 * *Initializing form controls and validation in admin user form
	 *
	 * @date 29 Oct 2022
	 * @developer Somnath Sil
	 */
	private initAdminUserForm() {
		this.addAdminUserForm = this._formBuilder.group({
			name: new FormControl('', [
				Validators.required,
				Validators.pattern(/^([^0-9]*)$/)
			]),
			email: new FormControl('', [
				Validators.required,
				Validators.pattern(
					/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
				)
			]),
			phone_number: new FormControl('', [
				Validators.required,
				Validators.pattern('[- +()0-9]+')
			]),
			status: new FormControl(false, []),
			image: ['', []]
		});
	}

	/**
	 * *Getting all form controls from admin user Form
	 *
	 * @returns form controls
	 * @date 29 Oct 2022
	 * @developer Somnath Sil
	 */

	get formcontrol() {
		return this.addAdminUserForm.controls;
	}

	/**
	 * *Checking if control has error
	 *
	 * @returns boolean
	 * @date 29 Oct 2022
	 * @developer Somnath Sil
	 */
	public hasFormControlError(field: string): boolean {
		const control = this.addAdminUserForm.get(field) as FormControl;
		if (
			(this.submitted && control.errors) ||
			(control.invalid && control.dirty)
		) {
			return true;
		}
		return false;
	}

	addAdminUserSubmit(): boolean | void {
		if (!this.isDisable) {
			const formValue = this.addAdminUserForm.value;
			this.submitted = true;

			if (this.addAdminUserForm.invalid) {
				this.addAdminUserForm.markAllAsTouched();
				return true;
			}

			// form is valid
			this.isDisable = true;
			let formData = new FormData();
			formData.append('name', this.addAdminUserForm.get('name')?.value);
			formData.append('email', this.addAdminUserForm.get('email')?.value);
			formData.append('type', 'A');
			formData.append(
				'contact',
				this.addAdminUserForm.get('phone_number')?.value
			);
			formData.append(
				'status',
				this.addAdminUserForm.get('status')?.value ? 'A' : 'I'
			);
			formData.append('image', this.addAdminUserForm.get('image')?.value);

			// for (var pair of formData.entries()) {
			// 	console.log('hello', pair[0] + ', ' + pair[1]);
			// }

			this._loader.useRef().start();
			this.subscriptions.push(
				this._http.post('add', formData).subscribe({
					next: (apiResult) => {
						const addAdminUserData = apiResult.response.dataset[0];
						this.isDisable = false;
						this.submitted = false;
						this._loader.useRef().complete();
						this.resetForm();
						this.profileImage = '';
						this._router.navigate(['/admin-users']);
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
	 * @date 14 May 2023
	 * @developer Somnath Sil
	 */
	backTo() {
		this._location.back();
	}

	/**
	 * *Reset form method
	 *
	 * @date 14 May 2023
	 * @developer Somnath Sil
	 */
	resetForm() {
		this.addAdminUserForm.reset();
		this.addAdminUserForm.setValidators(null);
		this.addAdminUserForm.updateValueAndValidity();
	}

	/**
	 * *Image Upload Method
	 *
	 * @date 14 May 2023
	 * @developer Somnath Sil
	 */
	onLocalFileSelect(event: any) {
		const selectedFiles = event.target.files;
		// console.log('selectedFiles', selectedFiles);
		let isInvalidFile = false;
		// console.log('length', selectedFiles.length);
		if (selectedFiles.length > 0) {
			const formData: FormData = new FormData();
			for (let i = 0; i < selectedFiles.length; i++) {
				if (selectedFiles[i].size > 1024 * 1024 * 5) {
					isInvalidFile = true;
				} else {
					const mimeType = selectedFiles[i].name.split('.');
					// for text and pdf

					// if (
					//   mimeType[1] === 'pdf' || mimeType[1] === 'txt' || mimeType[1] === 'doc' || mimeType[1] === 'docx'
					// ) {
					//   formData.append('multifiles', selectedFiles[i], selectedFiles[i].name);
					// }

					// for image (jpg, jpeg, png)

					if (
						mimeType[1] === 'png' ||
						mimeType[1] === 'jpg' ||
						mimeType[1] === 'jpeg'
					) {
						// formData.append(
						// 	'multifiles',
						// 	selectedFiles[i],
						// 	selectedFiles[i].name
						// );
						this.addAdminUserForm
							.get('image')
							?.setValue(selectedFiles[i]);
					} else {
						isInvalidFile = true;
					}
				}
				//For preview file
				// this.imageFlag = true;
				let reader = new FileReader();
				reader.readAsDataURL(selectedFiles[i]);
				reader.onload = (e: any) => {
					this.profileImage = e.target.result;
				};
			}

			if (isInvalidFile) {
				console.log('please upload a valid file');
			} else {
				// this.api.uploadMultipleFile(formData)
				//   .subscribe(resp => {
				//     console.log(resp)
				//   }, error => {
				//     console.log("error", error);
				//   });
			}
		} else {
			console.log('please upload a file');
		}
	}

	/**
	 * *Unsubscribing observable on destroy
	 *
	 * @date 14 May 2023
	 * @developer Somnath Sil
	 */
	ngOnDestroy(): void {
		this.subscriptions.forEach((subscription) => {
			subscription.unsubscribe();
		});
	}
}
