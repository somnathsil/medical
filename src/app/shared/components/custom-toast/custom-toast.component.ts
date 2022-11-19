import { Component, OnInit } from '@angular/core';
import { CommonService, IToasterInfo } from '@app/core/services';
import { fadeInOut } from '@app/shared/animations';

@Component({
	selector: 'app-custom-toast',
	templateUrl: './custom-toast.component.html',
	styleUrls: ['./custom-toast.component.scss'],
	animations: [fadeInOut]
})
export class CustomToastComponent implements OnInit {
	constructor(private _common: CommonService) {
		this._common._toasterSubject.subscribe((data) => {
			if (data) {
				this.toasterInformation = data as IToasterInfo;

				const time = this.toasterInformation.toastConfig.timeout
					? this.toasterInformation.toastConfig.timeout
					: 5000;
				setTimeout(() => {
					this.toasterInformation.isVisible = false;
				}, time);
			}
		});
	}

	public toasterInformation!: IToasterInfo;

	ngOnInit(): void {}
}
