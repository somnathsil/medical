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
import { IMyProfileParam } from '@app/shared/models';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-my-profile',
	templateUrl: './my-profile.component.html',
	styleUrls: ['./my-profile.component.scss'],
	animations: [fadeInOut]
})
export class MyProfileComponent implements OnInit, AfterViewInit, OnDestroy {
	public isDisable = false;
	public submitted = false;
	public profileImage = './assets/images/profile-dafault.jpg';
	public imageFlag = false;
	public myProfileForm!: FormGroup;
	public subscriptions: Subscription[] = [];
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
		this.initMyPofileForm();
		this.getProfileDetails();
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
	private initMyPofileForm() {
		this.myProfileForm = this._formBuilder.group({
			name: new FormControl('', [Validators.required]),
			email: new FormControl({ value: '', disabled: true }, [
				Validators.required
			]),
			phone_number: new FormControl('', [
				Validators.required,
				Validators.pattern('[- +()0-9]+')
			]),
			user_type: new FormControl('', []),
			image: ['', []]
		});
	}

	/**
	 * *Getting all form controls from change password Form
	 *
	 * @returns form controls
	 * @date 5 Oct 2022
	 * @developer Somnath Sil
	 */

	get formcontrol() {
		return this.myProfileForm.controls;
	}

	/**
	 * *Checking if control has error
	 *
	 * @returns boolean
	 * @date 5 Oct 2022
	 * @developer Somnath Sil
	 */
	public hasFormControlError(field: string): boolean {
		const control = this.myProfileForm.get(field) as FormControl;
		if (
			(this.submitted && control.errors) ||
			(control.invalid && control.dirty)
		) {
			return true;
		}
		return false;
	}

	myProfileSubmit(): boolean | void {
		if (!this.isDisable) {
			const formValue = this.myProfileForm.value;
			this.submitted = true;

			if (this.myProfileForm.invalid) {
				this.myProfileForm.markAllAsTouched();
				return true;
			}

			// form is valid
			this.isDisable = true;
			let formData: any = new FormData();
			formData.append('name', this.myProfileForm.get('name')?.value);
			formData.append(
				'contact',
				this.myProfileForm.get('phone_number')?.value
			);
			formData.append('image', this.myProfileForm.get('image')?.value);

			// for (var pair of formData.entries()) {
			// 	console.log('hello', pair[0] + ', ' + pair[1]);
			// }

			this._loader.useRef().start();
			this.subscriptions.push(
				this._http.post('updateProfile', formData).subscribe({
					next: (apiResult) => {
						const myProfileData = apiResult.response.dataset[0];

						this.isDisable = false;
						this._loader.useRef().complete();
						this._toast.success(
							'Success',
							apiResult.response.status.msg,
							{
								timeout: 5000,
								position: 'top'
							}
						);

						/* Instantly set user profile name by subject behaviour */
						this._commonService.setUserName(myProfileData.name);
						localStorage.setItem('USER_NAME', myProfileData.name);

						/* Instantly set user profile image by subject behaviour */
						this._commonService.setProfileImage(
							myProfileData.image
						);
						localStorage.setItem(
							'PROFILE_IMAGE',
							myProfileData.image
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
	 * * Patch my profile details
	 *
	 * @date 06 May 2023
	 * @developer Somnath Sil
	 */
	getProfileDetails() {
		this.subscriptions.push(
			this._http.post('getProfileDtls').subscribe({
				next: (apiResult) => {
					this.myProfileForm.patchValue({
						name: apiResult.response.dataset[0].name,
						email: apiResult.response.dataset[0].email,
						phone_number: apiResult.response.dataset[0].contact,
						user_type: apiResult.response.dataset[0].user_type
					});
					if (apiResult.response.dataset[0].image) {
						this.profileImage = apiResult.response.dataset[0].image;
					}
				},
				error: (apiError) => {
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
	 * *Image Upload Method
	 *
	 * @date 06 May 2023
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
						this.myProfileForm
							.get('image')
							?.setValue(selectedFiles[i]);
					} else {
						isInvalidFile = true;
					}
				}
				//For preview file
				this.imageFlag = true;
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
	 * @date 06 May 2023
	 * @developer Somnath Sil
	 */
	ngOnDestroy(): void {
		this.subscriptions.forEach((subscription) => {
			subscription.unsubscribe();
		});
	}
}
