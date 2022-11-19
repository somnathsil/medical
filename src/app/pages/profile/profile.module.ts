import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';

import { ProfileRoutingModule } from './profile-routing.module';
import { MyProfileComponent, ChangePasswordComponent } from './pages';

@NgModule({
	declarations: [MyProfileComponent, ChangePasswordComponent],
	imports: [CommonModule, ProfileRoutingModule, SharedModule]
})
export class ProfileModule {}
