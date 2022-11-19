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
import { fadeInOut } from '@app/shared/animations';

@Component({
	selector: 'app-my-profile',
	templateUrl: './my-profile.component.html',
	styleUrls: ['./my-profile.component.scss'],
	animations: [fadeInOut]
})
export class MyProfileComponent implements OnInit, AfterViewInit {
	constructor(private _formBuilder: FormBuilder) {}

	public submitted = false;
	public myProfileForm!: FormGroup;
	@ViewChild('inputFocus') inputFocus!: ElementRef;

	ngOnInit(): void {
		this.initMyPofileForm();
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
			email: new FormControl(
				{ value: 'hello@gmail.com', disabled: true },
				[Validators.required]
			),
			phone_number: new FormControl('', [
				Validators.required,
				Validators.pattern('[- +()0-9]+')
			])
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
		this.submitted = true;
		const formValue = this.myProfileForm.value;

		// stop here if form is invalid
		if (this.myProfileForm.invalid) {
			return false;
		}

		//form is valid
		if (this.myProfileForm.valid) {
			console.log(formValue);
		}
	}
}
