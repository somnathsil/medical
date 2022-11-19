import {
	animate,
	group,
	query,
	style,
	transition,
	trigger
} from '@angular/animations';

/**
 * *Slide In Out Animation
 *
 * @date 20 Sep 2022
 * @developer:
 */

export const slideInRight = trigger('slideInRight', [
	transition(':enter', [
		style({ transform: 'translateX(100%)' }),
		animate('800ms ease', style({ transform: 'translateX(-0%)' }))
	]),
	transition(':leave', [
		animate('800ms ease', style({ transform: 'translateX(-100%)' }))
	])
]);

export const slideInOut = trigger('slideInOut', [
	// Note the trigger name
	transition(':enter', [
		// :enter is alias to 'void => *'
		style({ height: '0', overflow: 'hidden' }),
		animate(250, style({ height: '*' }))
	]),
	transition(':leave', [
		// :leave is alias to '* => void'
		animate(250, style({ height: 0, overflow: 'hidden' }))
	])
]);

/**
 * *Fade In Out Animation
 *
 * @date 20 Sep 2022
 * @developer:
 */
export const fadeInOut = trigger('fadeInOut', [
	transition(':enter', [
		style({ opacity: 0 }),
		animate(400, style({ opacity: 1 }))
	]),
	transition(':leave', [animate(400, style({ opacity: 0 }))])
]);

/**
 * *Fade In Out Router Animation
 *
 * @date 20 Sep 2022
 * @developer:
 */
export const routerAnimation = trigger('routerAnimation', [
	transition('* <=> *', [
		query(':enter, :leave', style({ opacity: 0, right: '-2%' }), {
			optional: true
		}),
		group([
			query(
				':enter',
				[
					style({ opacity: 0, right: '-2%' }),
					animate(
						'0.3s ease-in-out',
						style({ opacity: 1, right: '0' })
					)
				],
				{ optional: true }
			),
			query(
				':leave',
				[
					style({ opacity: 1, right: '0' }),
					animate(
						'0.3s ease-in-out',
						style({ opacity: 0, right: '-2%' })
					)
				],
				{ optional: true }
			)
		])
	])
]);
