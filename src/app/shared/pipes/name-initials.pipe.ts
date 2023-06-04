import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'nameInitials'
})
export class NameInitialsPipe implements PipeTransform {
	transform(value: string): string {
		const nameSplited = value.split(' ');
		return nameSplited
			.filter(
				(word, index) => index === 0 || index === nameSplited.length - 1
			)
			.map((word) => word.charAt(0).toUpperCase())
			.join('');
	}
}
