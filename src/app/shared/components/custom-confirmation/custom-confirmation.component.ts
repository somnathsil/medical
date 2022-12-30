import { Component, OnInit } from '@angular/core';
import { CommonService, IConfirmationInfo } from '@app/core/services';

@Component({
	selector: 'custom-confirmation',
	templateUrl: './custom-confirmation.component.html',
	styleUrls: ['./custom-confirmation.component.scss']
})
export class CustomConfirmationComponent implements OnInit {
	public confirmMessageInfo!: IConfirmationInfo;
	public isDialogOpen: boolean = false;

	constructor(private _common: CommonService) {
		this._common._confirmSubject.subscribe((data) => {
			if (data) {
				this.confirmMessageInfo = data;
				this.isDialogOpen = true;
			}
		});
	}

	ngOnInit(): void {
		// this.confirmDialog();
	}

	/**
	 * *Initializing Custom Confirmation Dialog
	 *
	 * @date  27 Nov 2022
	 * @developer Somnath Sil
	 */
	// private confirmDialog() {
	// 	const modal = document.querySelector('.modal-dialog');
	// 	const overlay = document.querySelector('.overlay-backdrop');
	// 	const btnCloseModal = document.querySelector('.close-modal-dialog');
	// 	const btnOpenModal = document.querySelector('.show-modal');

	// 	const openModal = () => {
	// 		modal?.classList.remove('hidden');
	// 		overlay?.classList.remove('hidden');
	// 	};

	// 	const closeModal = () => {
	// 		modal?.classList.add('hidden');
	// 		overlay?.classList.add('hidden');
	// 	};

	// 	btnOpenModal?.addEventListener('click', openModal);
	// 	btnCloseModal?.addEventListener('click', closeModal);
	// 	overlay?.addEventListener('click', closeModal);
	// }
}
