import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangePasswordComponent, MyProfileComponent } from './pages';

const routes: Routes = [
	{
		path: 'my-profile',
		component: MyProfileComponent,
		title: 'My Profile',
		data: {
			title: 'my profile',
			breadcrumb: 'My Profile',
			data: 'my profile'
		}
	},
	{
		path: 'change-password',
		component: ChangePasswordComponent,
		title: 'Change Password',
		data: {
			title: 'change password',
			breadcrumb: 'Change Password',
			data: 'change password'
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ProfileRoutingModule {}
