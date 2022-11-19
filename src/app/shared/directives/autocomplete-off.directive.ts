import {
	Directive,
	ElementRef,
	Renderer2,
	AfterViewInit,
	Input
} from '@angular/core';

@Directive({
	selector: '[autocompleteOff]'
})
export class AutocompleteOffDirective implements AfterViewInit {
	constructor(private _el: ElementRef, private _renderer: Renderer2) {}

	@Input('autocompleteOff') autocompleteType: string = '';

	/**
	 * *Disabling autocomoplete of an Inout file
	 *  - setting a random number in name and autocomplete of input
	 *
	 * Example:
	 * [autocompleteOff]="'off'"
	 *
	 * @param autocompleteType : type
	 * @date 22 July 2021
	 * @developer Rahul Kundu
	 */
	ngAfterViewInit() {
		if (this.autocompleteType == 'off') {
			const randomString = Math.random().toString(36).slice(-6);
			this._renderer.setAttribute(
				this._el.nativeElement,
				'name',
				randomString
			);
			this._renderer.setAttribute(
				this._el.nativeElement,
				'autocomplete',
				randomString
			);
			this._renderer.setAttribute(
				this._el.nativeElement,
				'autofill',
				'off'
			);
		}
	}
}
