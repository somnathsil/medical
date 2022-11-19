export interface IPaymentList {
	id: number;
	name: string;
	disease: string;
	payment_date: string;
	total_amount: number;
	payment_mode: string;
	status: 0 | 1;
}

export interface IPaymentMode {
	id: number;
	label: string;
}
