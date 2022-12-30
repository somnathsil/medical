import { Injectable } from '@angular/core';
import { CommonService } from './common.service';

export interface IConfirmationInfo {
	icon: string;
	message: string;
	accept: Function;
	reject: Function;
}

@Injectable({
	providedIn: 'root'
})
export class ConfirmationService {
	constructor(private _common: CommonService) {}

	confirm(data: IConfirmationInfo) {
		this._common._confirmSubject.next(data);
	}
}
