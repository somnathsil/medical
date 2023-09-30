import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IConfirmationInfo } from './confirmation.service';
import { IToasterInfo } from './toaster.service';
import { IService } from '@app/shared/models';

@Injectable({
	providedIn: 'root'
})
export class CommonService {
	constructor() {}

	/**
	 * *Create total records form header for all list
	 *
	 * @date 12 June 2023
	 * @developer
	 */
	public _totalRecords = new BehaviorSubject<number>(0);
	public _totalRecordsShow = new BehaviorSubject<boolean>(false);

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

	serviceListArr(): IService[] {
		return [
			{ id: 1, name: 'Fever' },
			{ id: 2, name: 'AurthoPedic' },
			{ id: 3, name: 'ENT' },
			{ id: 4, name: 'Chest Specialist' },
			{ id: 5, name: 'Dengue' },
			{ id: 6, name: 'Malaria' },
			{ id: 7, name: 'Coronavirus' },
			{ id: 8, name: 'kidney Specialist' },
			{ id: 9, name: 'Gyno' },
			{ id: 10, name: 'Chicken Pox' },
			{ id: 11, name: 'Neuro Specialist' },
			{ id: 12, name: 'Dental' },
			{ id: 13, name: 'Skin Spacialist' },
			{ id: 14, name: 'Cardio Specialist' }
		];
	}
}
