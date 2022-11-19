import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Auth component imports
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { LoginComponent } from './login/login.component';
import { EnterOtpComponent } from './enter-otp/enter-otp.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RegistrationComponent } from './registration/registration.component';

const authRoutes: Routes = [
	{
		path: '',
		redirectTo: 'login',
		pathMatch: 'full'
	},
	{
		path: 'login',
		title: 'Sign In',
		component: LoginComponent,
		data: { title: 'Login' }
	},
	{
		path: 'registration',
		title: 'Registration',
		component: RegistrationComponent,
		data: { title: 'Registration' }
	},
	{
		path: 'forget-password',
		title: 'Forget Password',
		component: ForgetPasswordComponent,
		data: { title: 'Forget Password' }
	},
	{
		path: 'enter-otp',
		title: 'Enter OTP',
		component: EnterOtpComponent,
		data: { title: 'Enter OTP' }
	},
	{
		path: 'reset-password',
		title: 'Reset Password',
		component: ResetPasswordComponent,
		data: { title: 'Reset Password' }
	}
];

@NgModule({
	imports: [RouterModule.forChild(authRoutes)],
	exports: [RouterModule]
})
export class AuthRoutingModule {}
