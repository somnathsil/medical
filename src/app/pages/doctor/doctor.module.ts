import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';

import { DoctorRoutingModule } from './doctor-routing.module';

/* Ngx Bootstrap */
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import {
	DoctorListComponent,
	DoctorAddComponent,
	DoctorEditComponent,
	DoctorProfileComponent
} from './pages';

@NgModule({
	declarations: [
		DoctorListComponent,
		DoctorAddComponent,
		DoctorEditComponent,
		DoctorProfileComponent
	],
	imports: [CommonModule, DoctorRoutingModule, SharedModule, BsDatepickerModule.forRoot()]
})
export class DoctorModule {}
