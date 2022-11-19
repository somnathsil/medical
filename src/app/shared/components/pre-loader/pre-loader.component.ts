import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonService } from '@app/core/services';

@Component({
	selector: 'app-pre-loader',
	templateUrl: './pre-loader.component.html',
	styleUrls: ['./pre-loader.component.scss']
})
export class PreLoaderComponent implements OnInit {
	constructor(private _common: CommonService) {}

	public isLoading!: boolean;
	private subscriptions: Subscription[] = [];

	ngOnInit(): void {
		this.getPreloaderStatus();
	}

	/**
	 * *Subscribing to loader source to get the updated state
	 *
	 * @date 05 Nov 2022
	 * @developer
	 */
	private getPreloaderStatus() {
		this.subscriptions.push(
			this._common.loadingStatus$.subscribe({
				next: (type: boolean) => {
					console.log(type);
					type ? (this.isLoading = true) : (this.isLoading = false);
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
