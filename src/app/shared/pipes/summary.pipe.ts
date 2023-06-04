import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'summary'
})
export class SummaryPipe implements PipeTransform {
	/**
	 * *Pipe to turncate long texts
	 *
	 * Example:
	 *      text | summary : 450 : isCollapsed
	 *      returns lorem ipsu...
	 * @param value : A long javasript string
	 * @param limit : A javasript number to turncate value
	 * @param isCollapsed : boolean to toggle full text | short text
	 *
	 * @date 22 July 2021
	 * @developer 
	 * @returns turncated text
	 */
	transform(
		value: string,
		limit: number,
		completeWords = false,
		isCollapsed?: boolean
	): string {
		if (value === null) {
			return '';
		} else {
			if (isCollapsed) {
				return value;
			} else {
				const defaultLimit = 50;
				const elipses = '...';

				if (typeof value === 'undefined') {
					return '';
				}
				if (value.length <= limit) {
					return value;
				}

				if (completeWords) {
					limit = value.substr(0, limit).lastIndexOf(' ');
				}

				const desiredLimit = limit ? limit : defaultLimit;

				// .. truncate to about correct lenght
				const truncatedText = value.substr(0, desiredLimit);

				return truncatedText + elipses;
			}
		}
	}
}
