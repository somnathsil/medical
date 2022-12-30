export interface IMenu {
	id: number;
	label: string;
	icon: string;
	routerLinkActive: string;
	routerLinkActiveOptions?: IRouterLinkActiveOption;
	URl: string;
	isSubMenuOpen: boolean;
	subMenus: ISubMenus[];
}

export interface ISubMenus {
	label: string;
	URl: string;
	isActive: boolean;
}

interface IRouterLinkActiveOption {
	exact: boolean;
}

export interface IBreadCrumb {
	label: string;
	url: string;
}
