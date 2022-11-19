import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';

import { PaymentRoutingModule } from './payment-routing.module';

/* Ngx Bootstrap */
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import {
	PaymentListComponent,
	PaymentAddComponent,
	PaymentEditComponent
} from './pages';

@NgModule({
	declarations: [
		PaymentListComponent,
		PaymentAddComponent,
		PaymentEditComponent
	],
	imports: [
		CommonModule,
		PaymentRoutingModule,
		SharedModule,
		BsDatepickerModule.forRoot()
	]
})
export class PaymentModule {}
