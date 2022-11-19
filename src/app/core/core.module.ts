import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@app/shared/shared.module';

// Auth Admin layout imports
import { AdminWrapperComponent, AuthLayoutComponent } from './layouts';

//Component import for layouts
import {
	AdminLeftbarComponent,
	AdminTopbarComponent,
	AdminTitleBarComponent
} from './layouts';

const MODULES = [CommonModule, SharedModule, RouterModule];

const LAYOUTS = [AuthLayoutComponent, AdminWrapperComponent];

const COMPONENTS = [
	AdminLeftbarComponent,
	AdminTopbarComponent,
	AdminTitleBarComponent
];

@NgModule({
	declarations: [...LAYOUTS, ...COMPONENTS],
	imports: [...MODULES],
	exports: [...LAYOUTS, ...COMPONENTS]
})
export class CoreModule {}
