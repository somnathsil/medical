import { Component, OnInit } from '@angular/core';
import {
	Router,
	NavigationEnd,
	PRIMARY_OUTLET,
	ActivatedRoute,
	RoutesRecognized,
	ActivatedRouteSnapshot
} from '@angular/router';
import { IBreadCrumb } from '@app/shared/models';
import { distinctUntilChanged, filter, map, Subscription } from 'rxjs';

@Component({
	selector: 'admin-title-bar',
	templateUrl: './admin-title-bar.component.html',
	styleUrls: ['./admin-title-bar.component.scss']
})
export class AdminTitleBarComponent implements OnInit {
	constructor(private _router: Router, private _route: ActivatedRoute) {
		// this.getPageTitle();
		// this.initBreadcrumb(this._route.root);
		this.subs[0] = this._router.events
			.pipe(
				filter((event) => event instanceof NavigationEnd),
				map(() => this._route.snapshot),
				map((route) => {
					while (route.firstChild) {
						route = route.firstChild;
					}
					return route;
				})
			)
			.subscribe((route: ActivatedRouteSnapshot) => {
				this.breadcrumbData = route.data;
				// console.log(this.breadcrumbData);
			});
	}

	public pageTitle!: string;
	public breadcrumbs: IBreadCrumb[] = [];
	private subs: Array<Subscription> = [];
	public breadcrumbData: any = null;

	ngOnInit() {
		// this.updateBreadCrumbOnRouteChange();
	}

	/**
	 * Get routes url for page title
	 *
	 * @date 07 April 2022
	 */
	// private getPageTitle() {
	// 	this._router.events.subscribe((event) => {
	// 		if (event instanceof NavigationEnd) {
	// 			const parsedURL = event.url.split('/').pop() as string;
	// 			const newURl = parsedURL.replace('-', ' ') as string;
	// 			this.pageTitle = newURl === '' ? 'dashboard' : newURl;
	// 		}
	// 	});
	// }

	/**
	 * Recursively build breadcrumb according to route change.
	 *
	 * @date 07 April 2022
	 */
	// private updateBreadCrumbOnRouteChange() {
	// 	this._router.events
	// 		.pipe(
	// 			filter((event) => event instanceof NavigationEnd),
	// 			distinctUntilChanged()
	// 		)
	// 		.subscribe(() => {
	// 			this.breadcrumbs = this.initBreadcrumb(this._route.root);
	// 		});
	// }

	/**
	 * Recursively build breadcrumb according to activated route.
	 * @param route
	 * @param url
	 * @param breadcrumbs
	 *
	 * @date 07 April 2022
	 */
	private initBreadcrumb(
		route: ActivatedRoute,
		url: string = '',
		breadcrumbs: IBreadCrumb[] = []
	): IBreadCrumb[] {
		//If no routeConfig is avalailable we are on the root path
		let label =
			route.routeConfig && route.routeConfig.data
				? route.routeConfig.data['label']
				: '';

		let isClickable =
			route.routeConfig &&
			route.routeConfig.data &&
			route.routeConfig.data['isClickable'];

		let path =
			route.routeConfig && route.routeConfig.data
				? route.routeConfig.path
				: '';

		// If the route is dynamic route such as ':id', remove it
		const lastRoutePart = path?.split('/').pop() as string;
		const isDynamicRoute = lastRoutePart.startsWith(':');
		if (isDynamicRoute && !!route.snapshot) {
			const paramName = lastRoutePart.split(':')[1];
			path = (<string>path).replace(
				lastRoutePart,
				route.snapshot.params[paramName]
			);
			label = route.snapshot.params[paramName];
		}

		//In the routeConfig the complete path is not available,
		//so we rebuild it each time
		const nextUrl = path ? `${url}/${path}` : url;

		const breadcrumb: IBreadCrumb = {
			label: label,
			url: nextUrl
		};
		// Only adding route with non-empty label
		const newBreadcrumbs = breadcrumb.label
			? [...breadcrumbs, breadcrumb]
			: [...breadcrumbs];
		if (route.firstChild) {
			//If we are not on our current path yet,
			//there will be more children to look after, to build our breadcumb
			return this.initBreadcrumb(
				route.firstChild,
				nextUrl,
				newBreadcrumbs
			);
		}
		return newBreadcrumbs;
	}
}
