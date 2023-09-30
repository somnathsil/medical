import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
	AppointmentAddComponent,
	AppointmentEditComponent,
	AppointmentListComponent
} from './pages';

const routes: Routes = [
	{
		path: '',
		component: AppointmentListComponent,
		title: 'Appointment List',
		data: {
			title: 'appointment list',
			breadcrumb: 'Appointment List',
			data: 'appointments'
		}
	},
	{
		path: 'add',
		component: AppointmentAddComponent,
		title: 'Appointment Add',
		data: {
			title: 'add appointment',
			breadcrumb: 'Add Appointment',
			data: 'appointments'
		}
	},
	{
		path: 'edit/:username/:id',
		component: AppointmentEditComponent,
		title: 'Appointment Edit',
		data: {
			title: 'edit appointment',
			breadcrumb: 'Edit Appointment',
			data: 'appointments'
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AppointmentRoutingModule {}
