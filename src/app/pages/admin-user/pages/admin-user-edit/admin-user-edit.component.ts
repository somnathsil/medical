import { Location } from '@angular/common';
import {
	AfterViewInit,
	Component,
	ElementRef,
	OnInit,
	ViewChild
} from '@angular/core';
import {
	FormBuilder,
	FormControl,
	FormGroup,
	Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService, HttpService, ToasterService } from '@app/core/services';
import { fadeInOut } from '@app/shared/animations';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Subscription } from 'rxjs';

interface IEditAdminUserParam {
	id: number;
	email: string;
	name: string;
	contact: string | number;
	type: string;
	image: string | null;
}

@Component({
	selector: 'app-admin-user-edit',
	templateUrl: './admin-user-edit.component.html',
	styleUrls: ['./admin-user-edit.component.scss'],
	animations: [fadeInOut]
})
export class AdminUserEditComponent implements OnInit, AfterViewInit {
	public submitted = false;
	public isDisable = false;
	public adminUserImage = '';
	public userId: number | string;
	public editAdminUserForm!: FormGroup;
	public subscriptions: Subscription[] = [];
	@ViewChild('inputFocus') inputFocus!: ElementRef;

	constructor(
		private _formBuilder: FormBuilder,
		private _commonService: CommonService,
		private _actRoute: ActivatedRoute,
		private _loader: LoadingBarService,
		private _router: Router,
		private _http: HttpService,
		private _toast: ToasterService,
		private _location: Location
	) {
		// this._actRoute.paramMap.subscribe((param: any) => {
		// 	console.log(param.params.id);
		// });

		// this.userId = this._actRoute.snapshot.params['id'];

		this.userId = this._actRoute.snapshot.paramMap.get('id') as string;
	}

	ngOnInit(): void {
		this._commonService.setLoadingStatus(false);
		this.getAdminUserDetails();
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
		this.editAdminUserForm = this._formBuilder.group({
			name: new FormControl('', [
				Validators.required,
				Validators.pattern(/^([^0-9]*)$/)
			]),
			email: new FormControl({ value: '', disabled: true }, [
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
		return this.editAdminUserForm.controls;
	}

	/**
	 * *Checking if control has error
	 *
	 * @returns boolean
	 * @date 29 Oct 2022
	 * @developer Somnath Sil
	 */
	public hasFormControlError(field: string): boolean {
		const control = this.editAdminUserForm.get(field) as FormControl;
		if (
			(this.submitted && control.errors) ||
			(control.invalid && control.dirty)
		) {
			return true;
		}
		return false;
	}

	editAdminUserSubmit(): boolean | void {
		if (!this.isDisable) {
			const formValue = this.editAdminUserForm.value;
			this.submitted = true;
			if (this.editAdminUserForm.invalid) {
				this.editAdminUserForm.markAllAsTouched();
				return true;
			}
			// form is valid
			this.isDisable = true;
			let formdata = new FormData();
			formdata.append('id', this.userId as string);
			formdata.append(
				'email',
				this.editAdminUserForm.get('email')?.value
			);
			formdata.append('name', this.editAdminUserForm.get('name')?.value);
			formdata.append(
				'contact',
				this.editAdminUserForm.get('phone_number')?.value
			);
			formdata.append(
				'status',
				this.editAdminUserForm.get('status')?.value ? 'A' : 'I'
			);
			formdata.append('type', 'A');
			formdata.append(
				'image',
				this.editAdminUserForm.get('image')?.value
			);
			// for (var pair of formData.entries()) {
			// 	console.log('hello', pair[0] + ', ' + pair[1]);
			// }
			this._loader.useRef().start();
			this.subscriptions.push(
				this._http.post('edit', formdata).subscribe({
					next: (apiResult) => {
						this.isDisable = false;
						this._loader.useRef().complete();
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
	 * *admin user details method
	 *
	 * @date 30 May 2023
	 * @developer Somnath Sil
	 */
	getAdminUserDetails() {
		const param = {
			id: this.userId
		};
		this.subscriptions.push(
			this._http.post('details', param).subscribe({
				next: (apiResult) => {
					console.log(apiResult);
					this.editAdminUserForm.patchValue({
						userId: apiResult.response.dataset[0].userId,
						email: apiResult.response.dataset[0].email,
						name: apiResult.response.dataset[0].name,
						phone_number: apiResult.response.dataset[0].contact,
						status:
							apiResult.response.dataset[0].status == 'A'
								? true
								: false
					});
					if (apiResult.response.dataset[0].image) {
						this.adminUserImage =
							apiResult.response.dataset[0].image;
					}
				},
				error: (apiError) => {}
			})
		);
	}

	/**
	 * *Back to last visit page
	 *
	 * @date 29 May 2023
	 * @developer Somnath Sil
	 */
	backTo() {
		this._location.back();
	}

	/**
	 * *Image Upload Method
	 *
	 * @date 30 May 2023
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
						this.editAdminUserForm
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
					this.adminUserImage = e.target.result;
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
	 * @date 26 May 2023
	 * @developer Somnath Sil
	 */
	ngOnDestroy(): void {
		this.subscriptions.forEach((subscription) => {
			subscription.unsubscribe();
		});
	}
}
