import { Component, OnInit } from '@angular/core';
import { ToasterService } from '@app/core/services';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
	constructor(private _toast: ToasterService) {}

	ngOnInit(): void {
		this._toast.success('Success', 'This is a message', {
			timeout: 3000,
			position: 'top'
		});
	}
}
