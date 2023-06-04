import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService, HttpService } from '@app/core/services';
import { fadeInOut } from '@app/shared/animations';
import { Subscription } from 'rxjs';

@Component({
	selector: 'admin-topbar',
	templateUrl: './admin-topbar.component.html',
	styleUrls: ['./admin-topbar.component.scss'],
	animations: [fadeInOut]
})
export class AdminTopbarComponent implements OnInit {
	constructor(
		private _router: Router,
		private _commonService: CommonService,
		private _http: HttpService
	) {}

	public isSidebarOpen: boolean = false;
	public profileDropdown: boolean = false;
	public searchDropdown: boolean = false;

	public subscriptions: Subscription[] = [];
	public userName: string | null = '';
	public behaSubUserName = '';
	public profileDP: string | null = '';
	public behaSubprofileDP = '';

	ngOnInit(): void {
		this.userName = localStorage.getItem('USER_NAME');
		/* Instantly profile name change by subject behaviour  */
		this._commonService.getUserName().subscribe((message) => {
			this.behaSubUserName = message.text;
		});

		this.profileDP = localStorage.getItem('PROFILE_IMAGE');
		/* Instantly profile image change by subject behaviour  */
		this._commonService.getProfileImage().subscribe((profilePicture) => {
			this.behaSubprofileDP = profilePicture.proimage;
		});

		// this.getProfileDetails();
	}

	/**
	 *  Set Profile Picture From API
	 *  Date - 17Feb 2022
	 *  Name - Somnath Sil
	 */
	// getProfileDetails() {
	// 	this._http.post('getProfileDtls').subscribe({
	// 		next: (apiResult) => {
	// 			if (apiResult.response.dataset[0].image) {
	// 				this.profileDP = apiResult.response.dataset[0].image;
	// 			}
	// 		},
	// 		error: (apiError) => {
	// 			console.log(apiError);
	// 		}
	// 	});
	// }

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

	/**
	 * *Logout Method
	 *
	 * @date 04 May 2023
	 * @developer Somnath Sil
	 */
	logout() {
		localStorage.removeItem('JWT_TOKEN');
		localStorage.removeItem('USER_NAME');
		localStorage.removeItem('REFRESH_TOKEN');
		localStorage.removeItem('USER_TYPE');
		localStorage.removeItem('PROFILE_IMAGE');
		this._router.navigate(['/']);
	}

	/**
	 * *Unsubscribing observable on destroy
	 *
	 * @date 06 May 2023
	 * @developer Somnath Sil
	 */
	// ngOnDestroy(): void {
	// 	this.subscriptions.forEach((subscription) => {
	// 		subscription.unsubscribe();
	// 	});
	// }
}
