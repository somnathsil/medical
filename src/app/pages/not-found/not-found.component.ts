import { Component, OnInit } from '@angular/core';
import { CommonService } from '@app/core/services';

@Component({
	selector: 'app-not-found',
	templateUrl: './not-found.component.html',
	styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {
	constructor(private _commonService: CommonService) {}

	ngOnInit(): void {
		this._commonService.setLoadingStatus(false);
	}
}
