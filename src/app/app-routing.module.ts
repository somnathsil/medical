import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminWrapperComponent, AuthLayoutComponent } from './core/layouts';

const routes: Routes = [
	{
		path: '',
		component: AuthLayoutComponent,
		loadChildren: () =>
			import('./pages/auth/auth.module').then((m) => m.AuthModule)
	},
	{
		path: '',
		component: AdminWrapperComponent,
		children: [
			{
				path: 'dashboard',
				loadChildren: () =>
					import('./pages/dashbard/dashbard.module').then(
						(m) => m.DashbardModule
					)
			},
			{
				path: 'profile',
				loadChildren: () =>
					import('./pages/profile/profile.module').then(
						(m) => m.ProfileModule
					)
			},
			{
				path: 'appointments',
				loadChildren: () =>
					import('./pages/appointment/appointment.module').then(
						(m) => m.AppointmentModule
					)
			},
			{
				path: 'patients',
				loadChildren: () =>
					import('./pages/patient/patient.module').then(
						(m) => m.PatientModule
					)
			},
			{
				path: 'admin-users',
				loadChildren: () =>
					import('./pages/admin-user/admin-user.module').then(
						(m) => m.AdminUserModule
					)
			},
			{
				path: 'payments',
				loadChildren: () =>
					import('./pages/payment/payment.module').then(
						(m) => m.PaymentModule
					)
			}
		]
	},
	{
		path: 'not-found',
		loadChildren: () =>
			import('./pages/not-found/not-found.module').then(
				(m) => m.NotFoundModule
			)
	},
	{
		path: '**',
		redirectTo: '/not-found'
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
