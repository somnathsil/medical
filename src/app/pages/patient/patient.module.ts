import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';

import { PatientRoutingModule } from './patient-routing.module';

/* Ngx Bootstrap */
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import {
	PatientListComponent,
	PatientAddComponent,
	PatientEditComponent,
	PatientProfileComponent
} from './pages';

@NgModule({
	declarations: [
		PatientListComponent,
		PatientAddComponent,
		PatientEditComponent,
		PatientProfileComponent
	],
	imports: [
		CommonModule,
		PatientRoutingModule,
		SharedModule,
		BsDatepickerModule.forRoot()
	]
})
export class PatientModule {}
