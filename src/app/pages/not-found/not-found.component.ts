import { Component, OnInit } from '@angular/core';
import { CommonService } from '@app/core/services';

@Component({
	selector: 'app-not-found',
	templateUrl: './not-found.component.html',
	styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {
	constructor(private _commonService: CommonService) {}

	public place: any[] = [];
	public parentSelector = false;

	ngOnInit(): void {
		this._commonService.setLoadingStatus(false);
		this.place = [
			{ id: 1, select: false, name: 'Kolkata' },
			{ id: 2, select: true, name: 'Mumbai' },
			{ id: 3, select: false, name: 'Goa' }
		];
	}

	onChangePlace(event: any) {
		const id = event.target.value;
		const isChecked = event.target.checked;

		this.place = this.place.map((p) => {
			if (p.id == id) {
				p.select = isChecked;
				this.parentSelector = false;
				return p;
			}

			if (id == -1) {
				p.select = this.parentSelector;
				return p;
			}
			return p;
		});
		console.log(this.place);
	}
}
