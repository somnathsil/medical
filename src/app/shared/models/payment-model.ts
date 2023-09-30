export interface IPaymentList {
	name: string;
	amount: number;
	contact: string;
	payment_status: string;
	payment_date: string;
	payment_mode: string;
	service_name: string;
	payment_id: number;
}

export interface IPaymentMode {
	id: number;
	label: string;
	name?: string;
}

export interface IPaymentListParam {
	sort_by: string;
	filter_by: string;
	search_str: string;
	page_size: string | number;
	page_no: number;
}
