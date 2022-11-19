import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
	PaymentAddComponent,
	PaymentEditComponent,
	PaymentListComponent
} from './pages';

const routes: Routes = [
	{
		path: '',
		component: PaymentListComponent,
		title: 'Payment List',
		data: {
			title: 'payment list',
			breadcrumb: 'Payment List',
			data: 'payments'
		}
	},
	{
		path: 'add',
		component: PaymentAddComponent,
		title: 'Payment Add',
		data: {
			title: 'add payment',
			breadcrumb: 'Add payment',
			data: 'payments'
		}
	},
	{
		path: 'edit/:id',
		component: PaymentEditComponent,
		title: 'Payment Edit',
		data: {
			title: 'payment edit',
			breadcrumb: 'Edit payment',
			data: 'payments'
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class PaymentRoutingModule {}
