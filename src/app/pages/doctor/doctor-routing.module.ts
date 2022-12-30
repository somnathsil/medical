import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
	DoctorAddComponent,
	DoctorEditComponent,
	DoctorListComponent,
	DoctorProfileComponent
} from './pages';

const routes: Routes = [
	{
		path: '',
		component: DoctorListComponent,
		title: 'Doctor List',
		data: {
			title: 'doctor list',
			breadcrumb: 'doctor list',
			data: 'doctosr'
		}
	},
	{
		path: 'add',
		component: DoctorAddComponent,
		title: 'Doctor Add',
		data: {
			title: 'add doctor',
			breadcrumb: 'add doctor',
			data: 'doctors'
		}
	},
	{
		path: 'edit/:id',
		component: DoctorEditComponent,
		title: 'Doctor Edit',
		data: {
			title: 'edit doctor',
			breadcrumb: 'edit doctor',
			data: 'doctors'
		}
	},
	{
		path: 'profile/:id',
		component: DoctorProfileComponent,
		title: 'Doctor Profile',
		data: {
			title: 'doctor profile',
			breadcrumb: 'doctor profile',
			data: 'doctors'
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class DoctorRoutingModule {}
