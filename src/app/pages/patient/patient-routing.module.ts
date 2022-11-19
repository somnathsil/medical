import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
	PatientAddComponent,
	PatientEditComponent,
	PatientListComponent,
	PatientProfileComponent
} from './pages';

const routes: Routes = [
	{
		path: '',
		component: PatientListComponent,
		title: 'Patient List',
		data: {
			title: 'patient list',
			breadcrumb: 'patient list',
			data: 'patients'
		}
	},
	{
		path: 'add',
		component: PatientAddComponent,
		title: 'Patient Add',
		data: {
			title: 'add patient',
			breadcrumb: 'add patient',
			data: 'patients'
		}
	},
	{
		path: 'edit/:id',
		component: PatientEditComponent,
		title: 'Patient Edit',
		data: {
			title: 'edit patient',
			breadcrumb: 'edit patient',
			data: 'patients'
		}
	},
	{
		path: 'profile/:id',
		component: PatientProfileComponent,
		title: 'Patient Profile',
		data: {
			title: 'patient profile',
			breadcrumb: 'patient profile',
			data: 'patients'
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class PatientRoutingModule {}
