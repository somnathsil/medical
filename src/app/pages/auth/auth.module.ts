import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';

//Auth component imports
import { LoginComponent } from './login/login.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { EnterOtpComponent } from './enter-otp/enter-otp.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RegistrationComponent } from './registration/registration.component';

@NgModule({
	declarations: [
		LoginComponent,
		ForgetPasswordComponent,
		EnterOtpComponent,
		ResetPasswordComponent,
		RegistrationComponent
	],
	imports: [CommonModule, AuthRoutingModule, SharedModule]
})
export class AuthModule {}
