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
import { Router } from '@angular/router';
import { fadeInOut } from '@app/shared/animations';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
	animations: [fadeInOut]
})
export class LoginComponent implements OnInit, AfterViewInit {
	constructor(private _router: Router, private _formBuilder: FormBuilder) {}

	public submitted = false;
	public loginForm!: FormGroup;
	public toggleInputType = false;
	public email!: string;
	public password!: string;
	@ViewChild('inputFocus') inputFocus!: ElementRef;

	ngOnInit(): void {
		this.initLoginForm();
	}

	ngAfterViewInit(): void {
		this.inputFocus.nativeElement.focus();
	}

	/**
	 * *Initializing form controls and validation in login form
	 *
	 * @date 31 Aug 2022
	 * @developer Somnath Sil
	 */
	private initLoginForm() {
		this.loginForm = this._formBuilder.group({
			email: new FormControl('', [
				Validators.required,
				Validators.pattern(
					/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
				)
			]),
			password: new FormControl('', [Validators.required]),
			rememberMe: new FormControl(false)
		});
	}

	/**
	 * *Getting all form controls from login Form
	 *
	 * @returns form controls
	 * @date 31 Aug 2022
	 * @developer Somnath Sil
	 */

	get formcontrol() {
		return this.loginForm.controls;
	}

	/**
	 * *Checking if control has error
	 *
	 * @returns boolean
	 * @date 31 Aug 2022
	 * @developer Somnath Sil
	 */
	public hasFormControlError(field: string): boolean {
		const control = this.loginForm.get(field) as FormControl;
		if (
			(this.submitted && control.errors) ||
			(control.invalid && control.dirty)
		) {
			return true;
		}
		return false;
	}

	loginSubmit(): boolean | void {
		this.submitted = true;
		const formValue = this.loginForm.value;

		// stop here if form is invalid
		if (this.loginForm.invalid) {
			return false;
		}

		//form is valid
		if (this.loginForm.valid) {
			console.log(formValue);

			/* Static Login Method */
			if (this.email === 'abc@gmail.com' && this.password === '123456') {
				this._router.navigate(['/dashboard']);
			} else {
				return false;
			}
		}
	}
}
