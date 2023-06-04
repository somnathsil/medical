import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
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

	/**
	 * *Create Observable for User Name
	 *
	 * @date 06 May 2023
	 * @developer
	 */

	private _userNameStatus = new BehaviorSubject<any>('');

	public setUserName(message: string) {
		this._userNameStatus.next({ text: message });
	}
	public getUserName(): Observable<any> {
		return this._userNameStatus.asObservable();
	}

	/**
	 * *Create Observable for Profile Image
	 *
	 * @date 06 May 2023
	 * @developer
	 */

	private _profileImageStatus = new BehaviorSubject<any>('');

	public setProfileImage(image: string) {
		this._profileImageStatus.next({ proimage: image });
	}
	public getProfileImage(): Observable<any> {
		return this._profileImageStatus.asObservable();
	}
}
