export interface IServiceListParam {
	sort_by: string;
	search_str: string;
	page_size: string | number;
	page_no: number;
}

export interface IServiceList {
	id: number;
	service_id: number;
	service_name: string;
	doc_name: string[];
}
