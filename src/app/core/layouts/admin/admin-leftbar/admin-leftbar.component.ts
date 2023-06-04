import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { slideInOut } from '@app/shared/animations';
import { IMenu } from '@app/shared/models';

@Component({
	selector: 'admin-leftbar',
	templateUrl: './admin-leftbar.component.html',
	styleUrls: ['./admin-leftbar.component.scss'],
	animations: [slideInOut]
})
export class AdminLeftbarComponent implements OnInit {
	public menus: IMenu[] = [];
	public childSetIndex!: number;
	public parentSetIndex!: number;
	public date!: number;

	constructor(private _router: Router) {}

	ngOnInit(): void {
		this.getMenus();
		this.getRoute();
		this.date = new Date().getFullYear();
	}

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
					{
						label: 'All Appointments',
						URl: '/appointments',
						isActive: false
					},
					{
						label: 'Add Appointments',
						URl: '/appointments/add',
						isActive: false
					}
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
						URl: '/doctors',
						isActive: false
					},
					{
						label: 'Add Doctors',
						URl: '/doctors/add',
						isActive: false
					}
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
					{
						label: 'All Patients',
						URl: '/patients',
						isActive: false
					},
					{
						label: 'Add Patients',
						URl: '/patients/add',
						isActive: false
					}
				]
			},
			{
				id: 9,
				label: 'Services',
				icon: 'icon-people-outline',
				routerLinkActive: 'active',
				URl: '',
				isSubMenuOpen: false,
				subMenus: [
					{
						label: 'All Services',
						URl: '/services',
						isActive: false
					},
					{
						label: 'Add services',
						URl: '/services/add',
						isActive: false
					}
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
					{ label: 'All Payments', URl: 'payments', isActive: false },
					{
						label: 'Add Payments',
						URl: 'payments/add',
						isActive: false
					}
				]
			}
		];
	}

	/* Toggle Dropdown Menu */
	toggleSubMenu(event: Event, menuID: number) {
		event.preventDefault();
		this.menus.forEach((menu) => {
			if (menu.id === menuID) {
				menu.isSubMenuOpen = true;
			} else {
				menu.isSubMenuOpen = false;
			}
		});
	}

	/**
	 * *Getting Active Class From Parent List
	 *
	 * @date 25 Nov 2022
	 * @developer Somnath Sil
	 */
	onActiveParentMenu(item: number) {
		this.parentSetIndex = item;
	}

	/**
	 * *Getting Active Class From Child List
	 *
	 * @date 25 Nov 2022
	 * @developer Somnath Sil
	 */
	onActiveChildMenu(item: number) {
		this.childSetIndex = item;
	}

	/**
	 * *Routing
	 *
	 * @date 9 Dec 2022
	 * @developer Somnath Sil
	 */
	routeToLink(route: string, isActive: boolean, id: number) {
		if (route == 'javascript:void(0)') {
			return;
		}
		if (isActive) {
			return;
		}
		// this._commonService.setRouterLinkSubject(route);
		this._router.navigate([route]);
	}

	/**
	 * * Getting Current Route and setting as active
	 *
	 * @date 10 Dec 2022
	 * @developer Somnath Sil
	 */

	getRoute() {
		this._router.events.subscribe((event) => {
			if (event instanceof NavigationEnd) {
				const url = event.url;
				const urlArray = (url.split('/') as string[]).filter(
					(item) => item !== ''
				);
				const primaryMenu = urlArray[0];
				let secondaryMenu = urlArray[urlArray.length - 1];
				const tempSecondaryMenuArr = secondaryMenu.split(
					'?'
				) as string[];
				secondaryMenu = tempSecondaryMenuArr[0];
				for (let i = 0; i < this.menus.length; i++) {
					if (
						this.menus[i].URl == '/' + primaryMenu &&
						this.menus[i].subMenus.length > 0
					) {
						for (
							let j = 0;
							j < this.menus[i].subMenus.length;
							j++
						) {
							if (
								this.menus[i].subMenus[j].URl ==
								primaryMenu + '/' + secondaryMenu
							) {
								this.menus[i].subMenus[j].isActive = true;
								this.menus[i].isSubMenuOpen = true;
							} else {
								this.menus[i].subMenus[j].isActive = false;
							}
						}
					}
					if (
						this.menus[i].URl == '/' + primaryMenu &&
						this.menus[i].subMenus.length == 0
					) {
						this.menus[i].isSubMenuOpen = true;
					}
					if (this.menus[i].URl != '/' + primaryMenu) {
						for (
							let j = 0;
							j < this.menus[i].subMenus.length;
							j++
						) {
							this.menus[i].subMenus[j].isActive = false;
						}
					}
				}
			}
		});
	}
}
