import { Component, OnInit } from '@angular/core';
import { CommonService, IConfirmationInfo } from '@app/core/services';

@Component({
	selector: 'custom-confirmation',
	templateUrl: './custom-confirmation.component.html',
	styleUrls: ['./custom-confirmation.component.scss']
})
export class CustomConfirmationComponent implements OnInit {
	public confirmMessageInfo!: IConfirmationInfo;
	public isDialogOpen: boolean = false;

	constructor(private _common: CommonService) {
		this._common._confirmSubject.subscribe((data) => {
			if (data) {
				this.confirmMessageInfo = data;
				this.isDialogOpen = true;
			}
		});
	}

	ngOnInit(): void {}
}
