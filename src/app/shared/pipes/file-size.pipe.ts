import { Pipe, PipeTransform } from '@angular/core';

type unit = 'bytes' | 'KB' | 'MB' | 'GB' | 'TB' | 'PB';
type unitPrecisionMap = {
	[u in unit]: number;
};

const defaultPrecisionMap: unitPrecisionMap = {
	bytes: 0,
	KB: 0,
	MB: 1,
	GB: 1,
	TB: 2,
	PB: 2
};

@Pipe({
	name: 'fileSize'
})
export class FileSizePipe implements PipeTransform {
	private readonly units: unit[] = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];

	/**
	 * *Convert bytes into largest possible unit
	 *
	 * Example:
	 *      bytes | fileSize -- {{ 1500 | fileSize }}
	 *      returns 1 KB
	 *      bytes | fileSize:precision -- {{ 1500 | fileSize:2 }}
	 *      returns 1.46 KB
	 * @param number : A javasript number to count size
	 * @param precision : Takes an precision argument that can be a number or a map for each unit.
	 *
	 * @date: 22 July 2021
	 * @developer: 
	 */
	transform(
		bytes: number = 0,
		precision: number | unitPrecisionMap = defaultPrecisionMap
	): string {
		if (isNaN(parseFloat(String(bytes))) || !isFinite(bytes)) {
			return '?';
		}

		let unitIndex = 0;

		while (bytes >= 1024) {
			bytes /= 1024;
			unitIndex++;
		}

		const unitAsIndex = this.units[unitIndex];

		if (typeof precision === 'number') {
			return `${bytes.toFixed(+precision)} ${unitAsIndex}`;
		}
		return `${bytes.toFixed(precision[unitAsIndex])} ${unitAsIndex}`;
	}
}
