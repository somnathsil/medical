import { Component, OnInit } from '@angular/core';
import { CommonService } from '@app/core/services';

@Component({
	selector: 'app-doctor-profile',
	templateUrl: './doctor-profile.component.html',
	styleUrls: ['./doctor-profile.component.scss']
})
export class DoctorProfileComponent implements OnInit {
	constructor(private _commonService: CommonService) {}

	ngOnInit(): void {
		this._commonService.setLoadingStatus(false);
	}
}
