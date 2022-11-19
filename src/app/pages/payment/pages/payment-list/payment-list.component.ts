import { Component, OnInit } from '@angular/core';
import { IPaymentList } from '@app/shared/models';

@Component({
	selector: 'app-payment-list',
	templateUrl: './payment-list.component.html',
	styleUrls: ['./payment-list.component.scss']
})
export class PaymentListComponent implements OnInit {
	constructor() {}

	public payments: IPaymentList[] = [];

	ngOnInit(): void {
		this.getData();
	}

	public getData() {
		this.payments = [
			{
				id: 1,
				name: 'Alex Michael',
				disease: 'Fever',
				payment_date: '22 Jul, 2022',
				total_amount: 7000,
				payment_mode: 'Credit Card',
				status: 1
			},
			{
				id: 2,
				name: 'Hello World',
				disease: 'Diabaties',
				payment_date: '10 Aug, 2022',
				total_amount: 13000,
				payment_mode: 'Debit Card',
				status: 0
			},
			{
				id: 3,
				name: 'Alex Michael',
				disease: 'Fever',
				payment_date: '05 March, 2022',
				total_amount: 7000,
				payment_mode: 'Credit Card',
				status: 0
			},
			{
				id: 4,
				name: 'Alex Michael',
				disease: 'Fever',
				payment_date: '22 Jul, 2022',
				total_amount: 7000,
				payment_mode: 'Credit Card',
				status: 1
			},
			{
				id: 5,
				name: 'Hello World',
				disease: 'Diabaties',
				payment_date: '10 Aug, 2022',
				total_amount: 13000,
				payment_mode: 'Debit Card',
				status: 0
			}
		];
	}
}
