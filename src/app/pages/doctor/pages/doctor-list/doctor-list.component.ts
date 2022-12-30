import { Component, OnInit } from '@angular/core';
import { CommonService } from '@app/core/services';
import { IDoctorList } from '@app/shared/models';

@Component({
	selector: 'app-doctor-list',
	templateUrl: './doctor-list.component.html',
	styleUrls: ['./doctor-list.component.scss']
})
export class DoctorListComponent implements OnInit {
	public doctorList: IDoctorList[] = [];

	constructor(private _commonService: CommonService) {}

	ngOnInit(): void {
		this._commonService.setLoadingStatus(false);
		this.getDoctorList();
	}

	public getDoctorList() {
		this.doctorList = [
			{
				id: 1,
				image: './assets/images/default-img.jpg',
				name: 'Alex Dugin',
				phone_number: 9903246644,
				department: 'Neurology',
				specialist: 'Eye',
				dob: '22 Jul, 2022',
				gender: 'Male'
			},
			{
				id: 2,
				image: './assets/images/default-img.jpg',
				name: 'Alex Dugin',
				phone_number: 9836108414,
				department: 'Gynaecology',
				specialist: 'Child',
				dob: '05 Sep, 2022',
				gender: 'Female'
			},
			{
				id: 3,
				image: './assets/images/default-img.jpg',
				name: 'Alex Dugin',
				phone_number: 9874102584,
				department: 'Microbiology',
				specialist: 'Skin',
				dob: '05 Sep, 2022',
				gender: 'Female'
			},
			{
				id: 4,
				image: './assets/images/default-img.jpg',
				name: 'Alex Dugin',
				phone_number: 9874102584,
				department: 'Pharmacy',
				specialist: 'ENT',
				dob: '05 Sep, 2022',
				gender: 'Male'
			},
			{
				id: 5,
				image: './assets/images/default-img.jpg',
				name: 'Alex Dugin',
				phone_number: 907458963,
				department: 'Neonatal',
				specialist: 'Eye',
				dob: '22 Jul, 2022',
				gender: 'Male'
			}
		];
	}
}
