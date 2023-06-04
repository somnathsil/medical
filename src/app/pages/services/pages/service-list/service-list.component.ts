import { Component, OnInit } from '@angular/core';
import { CommonService } from '@app/core/services';

@Component({
	selector: 'app-service-list',
	templateUrl: './service-list.component.html',
	styleUrls: ['./service-list.component.scss']
})
export class ServiceListComponent implements OnInit {
	public serviceList: any[] = [
		{
			id: 1,
			service_name: 'Fever',
			doctors: 'Alex Michael, Alex Michael, Alex Michael'
		},
		{
			id: 1,
			service_name: 'Fever',
			doctors: 'Alex Michael, Alex Michael, Alex Michael'
		},
		{
			id: 1,
			service_name: 'Fever',
			doctors: 'Alex Michael, Alex Michael, Alex Michael'
		},
		{
			id: 1,
			service_name: 'Fever',
			doctors: 'Alex Michael, Alex Michael, Alex Michael'
		},
		{
			id: 1,
			service_name: 'Fever',
			doctors: 'Alex Michael, Alex Michael, Alex Michael'
		}
	];

	constructor(private _commonService: CommonService) {}

	ngOnInit(): void {
		this._commonService.setLoadingStatus(false);
	}
}
