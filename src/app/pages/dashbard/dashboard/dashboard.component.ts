import { Component, OnInit } from '@angular/core';
import {
	CommonService,
	ConfirmationService,
	ToasterService
} from '@app/core/services';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
	constructor(
		private _toast: ToasterService,
		private _confirmationDialog: ConfirmationService,
		private _commonService: CommonService
	) {}

	ngOnInit(): void {
		this._commonService.setLoadingStatus(false);
		this._toast.success('Success', 'This is a message', {
			timeout: 3000,
			position: 'top'
		});
		setTimeout(() => {
			this._confirmationDialog.confirm({
				icon: './assets/images/warning.svg',
				message: 'Do you want to delete?',
				accept: () => {
					console.log('Accept');
				},
				reject: () => {
					console.log('Reject');
				}
			});
		}, 1000);
	}
}
