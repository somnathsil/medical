import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@app/shared/shared.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// Auth Admin layout imports
import { AdminWrapperComponent, AuthLayoutComponent } from './layouts';

import {
	HttpService,
	AuthService,
	CommonService,
	ConfirmationService,
	ToasterService
} from './services';
import { AuthInterceptor } from './intercepters';

//Component import for layouts
import {
	AdminLeftbarComponent,
	AdminTopbarComponent,
	AdminTitleBarComponent
} from './layouts';

import { AuthGuard } from './guards';

const MODULES = [CommonModule, SharedModule, RouterModule, HttpClientModule];

const LAYOUTS = [AuthLayoutComponent, AdminWrapperComponent];

const PROVIDERS = [
	HttpService,
	AuthService,
	AuthGuard,
	CommonService,
	ConfirmationService,
	ToasterService
];

const COMPONENTS = [
	AdminLeftbarComponent,
	AdminTopbarComponent,
	AdminTitleBarComponent
];

@NgModule({
	declarations: [...LAYOUTS, ...COMPONENTS],
	imports: [...MODULES],
	exports: [...LAYOUTS, ...COMPONENTS, HttpClientModule],
	providers: [
		...PROVIDERS,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthInterceptor,
			multi: true
		}
	]
})
export class CoreModule {}
