import { Component, OnInit } from '@angular/core';
import { slideInOut } from '@app/shared/animations';
import { IMenu } from '@app/shared/models';

@Component({
	selector: 'admin-leftbar',
	templateUrl: './admin-leftbar.component.html',
	styleUrls: ['./admin-leftbar.component.scss'],
	animations: [slideInOut]
})
export class AdminLeftbarComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {
		this.getMenus();
	}

	public menus: IMenu[] = [];

	/* Dynamic Menu and Submenus */
	getMenus() {
		this.menus = [
			{
				id: 1,
				label: 'dashboard',
				icon: 'icon-home-outline',
				routerLinkActive: 'active',
				URl: '/dashboard',
				isSubMenuOpen: false,
				subMenus: []
			},
			{
				id: 2,
				label: 'Appointments',
				icon: 'icon-calendar-outline',
				routerLinkActive: 'active',
				URl: '',
				isSubMenuOpen: false,
				subMenus: [
					{ label: 'All Appointments', URl: '/appointments' },
					{ label: 'Add Appointments', URl: '/appointments/add' }
				]
			},
			{
				id: 3,
				label: 'Doctors',
				icon: 'icon-plus-square-outline',
				routerLinkActive: 'active',
				URl: '',
				isSubMenuOpen: false,
				subMenus: [
					{
						label: 'All Doctors',
						URl: 'form/reactive-form'
					},
					{ label: 'Add Doctors', URl: '' }
				]
			},
			{
				id: 4,
				label: 'Patients',
				icon: 'icon-people-outline',
				routerLinkActive: 'active',
				URl: '',
				isSubMenuOpen: false,
				subMenus: [
					{ label: 'All Patients', URl: '/patients' },
					{ label: 'Add Patients', URl: '/patients/add' }
				]
			},
			{
				id: 5,
				label: 'Admin Users',
				icon: 'icon-person-outline',
				routerLinkActive: 'active',
				URl: '/admin-users',
				isSubMenuOpen: false,
				subMenus: []
			},
			{
				id: 6,
				label: 'my profile',
				icon: 'icon-person-outline',
				routerLinkActive: 'active',
				URl: '/profile/my-profile',
				isSubMenuOpen: false,
				subMenus: []
			},
			{
				id: 7,
				label: 'change password',
				icon: 'icon-unlock-outline',
				routerLinkActive: 'active',
				URl: '/profile/change-password',
				isSubMenuOpen: false,
				subMenus: []
			},
			{
				id: 8,
				label: 'Payments',
				icon: 'icon-layers-outline',
				routerLinkActive: 'active',
				URl: '',
				isSubMenuOpen: false,
				subMenus: [
					{ label: 'All Payments', URl: 'payments' },
					{ label: 'Add Payments', URl: 'payments/add' }
				]
			}
		];
	}

	/* Toggle Dropdown Menu */
	toggleSubMenu(event: Event, menuID: number) {
		event.preventDefault();
		this.menus.forEach((menu) => {
			if (menu.id === menuID) {
				menu.isSubMenuOpen = !menu.isSubMenuOpen;
			} else {
				menu.isSubMenuOpen = false;
			}
		});
	}
}
