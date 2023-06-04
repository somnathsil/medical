import { Pipe, PipeTransform } from '@angular/core';
import {
	DomSanitizer,
	SafeHtml,
	SafeStyle,
	SafeScript,
	SafeUrl,
	SafeResourceUrl
} from '@angular/platform-browser';

@Pipe({
	name: 'safe'
})
export class SafeSanitizePipe implements PipeTransform {
	constructor(protected _sanitizer: DomSanitizer) {}

	/**
	 * *Pipe to sanitize any resource type supported by DomSanitizer
	 *
	 * Example:
	 *      url | safe : 'url
	 * @param value : A value fot sanitization
	 * @param type : sanitization types - html | style | script | url | resourceUrl
	 *
	 * @date 22 July 2021
	 * @developer 
	 * @returns sanitized data
	 */
	transform(
		value: any,
		type: string
	): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {
		switch (type) {
			case 'html':
				return this._sanitizer.bypassSecurityTrustHtml(value);
			case 'style':
				return this._sanitizer.bypassSecurityTrustStyle(value);
			case 'script':
				return this._sanitizer.bypassSecurityTrustScript(value);
			case 'url':
				return this._sanitizer.bypassSecurityTrustUrl(value);
			case 'resourceUrl':
				return this._sanitizer.bypassSecurityTrustResourceUrl(value);
			default:
				throw new Error(`Invalid safe type specified: ${type}`);
		}
	}
}
