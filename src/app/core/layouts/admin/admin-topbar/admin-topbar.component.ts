import { Component, OnInit } from '@angular/core';
import { fadeInOut } from '@app/shared/animations';

@Component({
	selector: 'admin-topbar',
	templateUrl: './admin-topbar.component.html',
	styleUrls: ['./admin-topbar.component.scss'],
	animations: [fadeInOut]
})
export class AdminTopbarComponent implements OnInit {
	constructor() {}

	public isSidebarOpen: boolean = false;
	public profileDropdown: boolean = false;
	public searchDropdown: boolean = false;

	ngOnInit(): void {}

	toggleSidebar(event: Event) {
		event.preventDefault();
		const adminWrapperEl = document.querySelector(
			'.admin-layout-container'
		) as HTMLElement;
		this.isSidebarOpen = !this.isSidebarOpen;
		if (this.isSidebarOpen) {
			adminWrapperEl.classList.add('sidebar-collapse');
		} else {
			adminWrapperEl.classList.remove('sidebar-collapse');
		}
	}

	getProfileDropdown() {
		this.profileDropdown = !this.profileDropdown;
	}

	getSearchDropdown() {
		this.searchDropdown = !this.searchDropdown;
	}
}
