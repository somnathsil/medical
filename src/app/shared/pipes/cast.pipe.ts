import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'as',
	pure: true
})
export class CastPipe implements PipeTransform {
	transform(value: any, args?: any): number {
		return value;
	}
}
