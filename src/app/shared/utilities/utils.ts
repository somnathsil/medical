/**
 * *Checking if a arg is object
 *
 * @param arg - object | array
 * @returns obecjt | boolean
 * @date 04 Aug 2021
 * @developer Rahul Kundu
 */
export function isObject(arg: any) {
	return typeof arg === 'object' && arg !== null && !(arg instanceof Array)
		? arg
		: false;
}

/**
 * *Formatting bytes to human readble units
 *
 * @param fileSize : A javascript number contains file size in bytes
 * @date 04 Aug 2021
 * @developer Rahul Kundu
 */
export function formatSizeUnits(fileSize: number) {
	if (fileSize > 0) {
		const bytes: number = fileSize;
		const decimals = 2;

		if (bytes === 0) {
			return '0 Bytes';
		}

		const k = 1024;
		const dm = decimals < 0 ? 0 : decimals;
		const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

		const i = Math.floor(Math.log(bytes) / Math.log(k));

		return (
			parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
		);
	} else {
		return null;
	}
}

/**
 * *Random UUID generator
 *
 * @date 04 Aug 2021
 * @developer Rahul Kundu
 */
export function getGuid() {
	// Timestamp
	let d = new Date().getTime();
	// Time in microseconds since page-load or 0 if unsupported
	let d2 = (performance && performance.now && performance.now() * 1000) || 0;
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
		let r = Math.random() * 16; // random number between 0 and 16
		if (d > 0) {
			// Use timestamp until depleted
			r = (d + r) % 16 | 0;
			d = Math.floor(d / 16);
		} else {
			// Use microseconds since page-load if supported
			r = (d2 + r) % 16 | 0;
			d2 = Math.floor(d2 / 16);
		}
		return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
	});
}

/**
 * *Uploaded file size and extension validation
 *
 * @param event javascript file chnage event
 * @date 04 Aug 2021
 * @developer Rahul Kundu
 */
export function fileUploadvalidation(
	event: Event,
	filesize: number,
	filesiseType: 'kb' | 'mb',
	fileTypes: string[]
): any {
	let validationInfo: any;
	filesize = filesize || 1;
	const files = (event.target as HTMLInputElement).files as FileList;
	if (files.length > 0) {
		// Getting list of files
		for (let i = 0; i < files.length; i++) {
			const file = files[i];
			const _fileName = file.name; // file name
			const _fileSize = file.size; // file size
			const _fileTypes = fileTypes; // preferred extensions
			const _sizeInMB = file.size / (1024 * 1024);
			const _sizeInKB = file.size / 1024;

			const _fileExtension = _fileName
				.split('.')
				[_fileName.split('.').length - 1].toLowerCase(); // file extension

			const _isMatchedExt: boolean =
				_fileTypes.indexOf(_fileExtension) > -1;
			const _isSizeExceeds: boolean =
				filesiseType === 'mb'
					? _sizeInMB > filesize
					: _sizeInKB > filesize;

			// OR together the accepted extensions and NOT it. Then OR the size cond.
			if (!_isMatchedExt || _isSizeExceeds) {
				/**
				 * !avoid this due to Object Literal Shorthand Syntax
				 * ! _fileName: _fileName to _fileName
				 * !_fileSize: _fileSize to _fileSize
				 * *This rule enforces the use of the shorthand syntax
				 */
				return (validationInfo = {
					_fileName,
					_fileSize,
					_isMatchedExt,
					_isSizeExceeds
				});
			} else {
				return null;
			}
		}
	} else {
		return null;
	}
}

/**
 * *Filter to abbreviate a number
 *
 * @param value : A javasript number as parameter
 * @date 04 Aug 2021
 * @developer Rahul Kundu
 */
export function toAbbreviateNumber(value: number) {
	let newValue: any = value;
	if (value >= 1000) {
		const suffixes = ['', 'k', 'm', 'b', 't'];
		const suffixNum = Math.floor(('' + value).length / 3);
		let shortValue: any = '';
		for (let precision = 2; precision >= 1; precision--) {
			shortValue = parseFloat(
				(suffixNum !== 0
					? value / Math.pow(1000, suffixNum)
					: value
				).toPrecision(precision)
			);
			const dotLessShortValue = (shortValue + '').replace(
				/[^a-zA-Z 0-9]+/g,
				''
			);
			if (dotLessShortValue.length <= 2) {
				break;
			}
		}
		if (shortValue % 1 !== 0) {
			shortValue = shortValue.toFixed(1);
		}
		newValue = shortValue + suffixes[suffixNum];
	}
	return newValue;
}

/**
 * *Generating random string
 *
 * @param length : length of the string to return
 * @date 04 Aug 2021
 * @developer Rahul Kundu
 */
export function generateRandomString(length: number) {
	let randomString = '';
	const possible =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

	for (let i = 0; i < length; i++) {
		randomString += possible.charAt(
			Math.floor(Math.random() * possible.length)
		);
	}
	return randomString;
}

/**
 * *Defining time for greeting
 *
 * @returns string
 * @date 04 Aug 2021
 * @developer Rahul Kundu
 */
export function timeGreeting(): string {
	let greeting = '';
	const data = [
		[0, 4, 'Good morning'],
		[5, 11, 'Good morning'],
		[12, 16, 'Good afternoon'],
		[17, 18, 'Good evening'],
		[19, 24, 'Good night']
	];
	const hour = new Date().getHours();

	for (let i = 0; i < data.length; i++) {
		if (hour >= data[i][0] && hour <= data[i][1]) {
			const result = data[i][2].toString();
			greeting = result
				.split(' ')
				.map((s) => s.charAt(0).toUpperCase() + s.substring(1))
				.join(' ');
			break;
		}
	}

	return greeting;
}

/**
 * *Generating short name from user name
 *
 * @returns string
 * @date 04 Aug 2021
 * @developer Rahul Kundu
 */
export function getNameInitials(name: string): string {
	let initials: string;
	const nameArray = name.split(' ');
	initials = nameArray[0].substring(0, 1).toUpperCase();
	if (nameArray.length > 1) {
		initials += nameArray[nameArray.length - 1]
			.substring(0, 1)
			.toUpperCase();
	}
	return initials;
}

/**
 * *Converting image to base 64 from file change event
 *
 * @param event mouse event
 * @date 04 Aug 2021
 * @developer Rahul Kundu
 * @returns base64 string
 */
export function getBase64(event: Event): Promise<string> {
	const target = event.target as HTMLInputElement;
	const file: File = (target.files as FileList)[0];
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result as string);
		reader.onerror = (error) => reject(error);
	});
}

/**
 * *Function to check if a email is valid
 *
 * @param email
 * @date 04 Aug 2021
 * @developer Rahul Kundu
 * @returns boolean
 */
export function validateEmail(email: string): boolean {
	const re =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
}

/**
 * *Formatting timestamp to desired format
 *
 * @param timestamp
 * @param returnType
 * @returns number | hour | minute | second
 *
 * @date 26 Aug 2021
 * @developer Rahul Kundu
 */
export function formattedTime(
	timestamp: number,
	returnType: 'hour' | 'minute' | 'second'
): number {
	const unix_timestamp = timestamp;
	const date = new Date(unix_timestamp * 1000);
	const hours = date.getHours();
	const minutes = date.getMinutes();
	const seconds = date.getSeconds();
	let toReturn!: number;

	switch (returnType) {
		case 'hour':
			toReturn = hours;
			break;
		case 'minute':
			toReturn = minutes;
			break;
		case 'second':
			toReturn = seconds;
			break;
		default:
			break;
	}

	return toReturn;
}
