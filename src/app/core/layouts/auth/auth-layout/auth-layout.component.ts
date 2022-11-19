import { AfterViewInit, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { routerAnimation } from '@app/shared/animations';

@Component({
	selector: 'app-auth-layout',
	templateUrl: './auth-layout.component.html',
	styleUrls: ['./auth-layout.component.scss'],
	animations: [routerAnimation]
})
export class AuthLayoutComponent implements OnInit, AfterViewInit {
	constructor() {}

	public isLoadingFirstTime = true;

	ngOnInit(): void {}

	ngAfterViewInit(): void {
		/**
		 * *Disabling router animation first time on page load
		 *
		 * @date 20 Sep 2022
		 * @developer
		 */
		setTimeout(() => {
			this.isLoadingFirstTime = false;
		}, 300);
	}

	/**
	 * *Getting router outlet for animation
	 *
	 * @date 20 Sep 2022
	 * @developer
	 */
	public getRouterOutletState(outlet: RouterOutlet) {
		return outlet.isActivated ? outlet.activatedRoute : '';
	}
}
