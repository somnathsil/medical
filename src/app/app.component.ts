import { Component } from '@angular/core';
import {
	NavigationCancel,
	NavigationError,
	NavigationStart,
	Router
} from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonService } from './core/services';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	constructor(private _common: CommonService, private _router: Router) {
		this.handleLoadingState();
		// setTimeout(() => {
		// 	this._common.setLoadingStatus(false);
		// }, 1000);
	}

	// title = 'DoctorProject';
	private subscriptions: Subscription[] = [];

	/**
	 * *Subscribing to router events to toggle pre loader
	 *
	 * @date 05 Nov 2022
	 * @developer
	 */
	private handleLoadingState() {
		this.subscriptions.push(
			this._router.events.subscribe((event) => {
				switch (true) {
					case event instanceof NavigationStart: {
						this._common.setLoadingStatus(true);
						break;
					}
					case event instanceof NavigationCancel:
					case event instanceof NavigationError: {
						this._common.setLoadingStatus(false);
						break;
					}
				}
			})
		);
	}

	/**
	 * *Unsubscribing observable on destroy
	 *
	 * @date 05 Nov 2022
	 * @developer
	 */
	ngOnDestroy(): void {
		this.subscriptions.forEach((subscription) =>
			subscription.unsubscribe()
		);
	}
}
