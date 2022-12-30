import { Component, OnInit } from '@angular/core';
import { CommonService } from '@app/core/services';

@Component({
	selector: 'app-patient-profile',
	templateUrl: './patient-profile.component.html',
	styleUrls: ['./patient-profile.component.scss']
})
export class PatientProfileComponent implements OnInit {
	constructor(private _commonService: CommonService) {}

	ngOnInit(): void {
		this._commonService.setLoadingStatus(false);
	}
}
