import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IConfirmationInfo } from './confirmation.service';
import { IToasterInfo } from './toaster.service';

@Injectable({
	providedIn: 'root'
})
export class CommonService {
	constructor() {}

	/**
	 * *Create Observable for pre loader
	 *
	 * @date 05 Nov 2022
	 * @developer
	 */
	private _loadingStatus = new BehaviorSubject<boolean>(true);
	public loadingStatus$ = this._loadingStatus.asObservable();

	public setLoadingStatus(data: boolean) {
		this._loadingStatus.next(data);
	}

	/**
	 * *Create Observable for toaster
	 *
	 * @date 13 Nov 2022
	 * @developer
	 */
	public _toasterSubject = new BehaviorSubject<IToasterInfo | null>(null);

	/**
	 * *Create Observable for Confirm Dialog
	 *
	 * @date 13 Nov 2022
	 * @developer
	 */
	public _confirmSubject = new BehaviorSubject<IConfirmationInfo | null>(
		null
	);
}
