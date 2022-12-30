import { Component, OnInit } from '@angular/core';
import { CommonService } from '@app/core/services';
import { IPatientList } from '@app/shared/models';

@Component({
	selector: 'app-patient-list',
	templateUrl: './patient-list.component.html',
	styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent implements OnInit {
	public appointments: IPatientList[] = [];
	constructor(private _commonService: CommonService) {}

	ngOnInit(): void {
		this._commonService.setLoadingStatus(false);
		this.getData();
	}

	public getData() {
		this.appointments = [
			{
				id: 1,
				image: './assets/images/default-img.jpg',
				name: 'Alex Dugin',
				phone_number: 9903246644,
				disease: 'Dental',
				blood_group: 'A+',
				dob: '22 Jul, 2022',
				gender: 'Male'
			},
			{
				id: 2,
				image: './assets/images/default-img.jpg',
				name: 'Somnath Sil',
				phone_number: 9903246644,
				disease: 'Allergy',
				blood_group: 'B-',
				dob: '22 Jul, 2022',
				gender: 'Male'
			},
			{
				id: 3,
				image: './assets/images/default-img.jpg',
				name: 'Lilly Cole',
				phone_number: 9903246644,
				disease: 'Skin Problem',
				blood_group: 'AB+',
				dob: '22 Jul, 2022',
				gender: 'Female'
			},
			{
				id: 4,
				image: './assets/images/default-img.jpg',
				name: 'Alex Dugin',
				phone_number: 9903246644,
				disease: 'Malaria',
				blood_group: 'A-',
				dob: '22 Jul, 2022',
				gender: 'Famale'
			},
			{
				id: 1,
				image: './assets/images/default-img.jpg',
				name: 'Alex Dugin',
				phone_number: 9903246644,
				disease: 'Fever',
				blood_group: 'B+',
				dob: '22 Jul, 2022',
				gender: 'Male'
			}
		];
	}
}
