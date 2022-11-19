import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';

import { AppointmentRoutingModule } from './appointment-routing.module';

/* Ngx Bootstrap */
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import {
	AppointmentListComponent,
	AppointmentAddComponent,
	AppointmentEditComponent
} from './pages';

@NgModule({
	declarations: [
		AppointmentListComponent,
		AppointmentAddComponent,
		AppointmentEditComponent
	],
	imports: [
		CommonModule,
		AppointmentRoutingModule,
		SharedModule,
		BsDatepickerModule.forRoot()
	]
})
export class AppointmentModule {}
