import { Injectable } from '@angular/core';
import { CommonService } from './common.service';

export interface IToasterInfo {
	title: string;
	message: string;
	isVisible: boolean;
	color: string;
	toastConfig: {
		timeout?: number;
		position?: 'top' | 'bottom' | 'left' | 'right';
	};
}

@Injectable({
	providedIn: 'root'
})
export class ToasterService {
	constructor(private _common: CommonService) {}

	success(
		title: string,
		message: string,
		toastConfig: {
			timeout?: number;
			position?: 'top' | 'bottom' | 'left' | 'right';
		}
	) {
		this._common._toasterSubject.next({
			title,
			message,
			toastConfig,
			isVisible: true,
			color: 'green'
		});
	}

	error(
		title: string,
		message: string,
		toastConfig: {
			timeout?: number;
			position?: 'top' | 'bottom' | 'left' | 'right';
		}
	) {
		this._common._toasterSubject.next({
			title,
			message,
			toastConfig,
			isVisible: true,
			color: 'red'
		});
	}

	warning(
		title: string,
		message: string,
		toastConfig: {
			timeout?: number;
			position?: 'top' | 'bottom' | 'left' | 'right';
		}
	) {
		this._common._toasterSubject.next({
			title,
			message,
			toastConfig,
			isVisible: true,
			color: 'orange'
		});
	}
}
