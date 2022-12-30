import { Component, OnInit } from '@angular/core';
import { CommonService } from '@app/core/services';
import { IAdminUserList } from '@app/shared/models';

@Component({
	selector: 'app-admin-user-list',
	templateUrl: './admin-user-list.component.html',
	styleUrls: ['./admin-user-list.component.scss']
})
export class AdminUserListComponent implements OnInit {
	constructor(private _commonService: CommonService) {}

	public users: IAdminUserList[] = [];

	ngOnInit(): void {
		this._commonService.setLoadingStatus(false);
		this.getData();
	}

	public getData() {
		this.users = [
			{
				id: 1,
				image: './assets/images/default-img.jpg',
				name: 'Alex Dugin',
				email: 'admin123@gmail.com',
				phone_number: 9903246644,
				status: 1
			},
			{
				id: 2,
				image: './assets/images/default-img.jpg',
				name: 'Alex Dugin',
				email: 'admin123@gmail.com',
				phone_number: 9903246644,
				status: 0
			},
			{
				id: 3,
				image: './assets/images/default-img.jpg',
				name: 'Alex Dugin',
				email: 'admin123@gmail.com',
				phone_number: 9903246644,
				status: 0
			},
			{
				id: 4,
				image: './assets/images/default-img.jpg',
				name: 'Alex Dugin',
				email: 'admin123@gmail.com',
				phone_number: 9903246644,
				status: 1
			}
		];
	}
}
