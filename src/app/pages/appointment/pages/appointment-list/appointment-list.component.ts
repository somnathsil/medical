import { Component, OnInit } from '@angular/core';
import { IAppointmentList } from '@app/shared/models';

// interface IStatus {
// 	label: string;
// 	value: string;
// }

@Component({
	selector: 'app-appointment-list',
	templateUrl: './appointment-list.component.html',
	styleUrls: ['./appointment-list.component.scss']
})
export class AppointmentListComponent implements OnInit {
	constructor() {}

	public appointments: IAppointmentList[] = [];
	// public statuses: IStatus[] = [];

	ngOnInit(): void {
		this.getData();
		// this.statuses = [
		// 	{ label: 'Active', value: '1' },
		// 	{ label: 'Inactive', value: '0' }
		// ];
	}

	public getData() {
		this.appointments = [
			{
				id: 1,
				name: 'Alex Dugin',
				email: 'helloworld@gmail.com',
				phone_number: 9903246644,
				service: 'ENT Checkup',
				appointment_date: '22 Jul, 2022',
				gender: 'Male'
			},
			{
				id: 2,
				name: 'Somnath Sil',
				email: 'som121@gmail.com',
				phone_number: 9903246644,
				service: 'Heart Checkup',
				appointment_date: '15 Jul, 2022',
				gender: 'Male'
			},
			{
				id: 3,
				name: 'Lilly Cole',
				email: 'helloworld@gmail.com',
				phone_number: 9903246644,
				service: 'Full Body Checkup',
				appointment_date: '07 Jul, 2022',
				gender: 'Female'
			},
			{
				id: 4,
				name: 'Alex Dugin',
				email: 'helloworld@gmail.com',
				phone_number: 9903246644,
				service: 'Dental Checkup',
				appointment_date: '22 Jul, 2022',
				gender: 'Famale'
			},
			{
				id: 1,
				name: 'Alex Dugin',
				email: 'helloworld@gmail.com',
				phone_number: 9903246644,
				service: 'ENT Checkup',
				appointment_date: '22 Jul, 2022',
				gender: 'Male'
			}
		];
	}
}
