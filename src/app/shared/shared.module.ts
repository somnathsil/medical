import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgScrollbarModule } from 'ngx-scrollbar';

// Custom Directives
import { ClickoutsideDirective, AutocompleteOffDirective } from './directives';

//Custom pipes
import {
	CastPipe,
	SummaryPipe,
	FileSizePipe,
	SafeSanitizePipe,
	NameInitialsPipe
} from './pipes';

/* Third party import */
import { NgSelectModule } from '@ng-select/ng-select';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { NgxPaginationModule } from 'ngx-pagination';

/* Components */
import { PreLoaderComponent } from './components/pre-loader/pre-loader.component';
import { CustomToastComponent } from './components/custom-toast/custom-toast.component';
import { CustomConfirmationComponent } from './components/custom-confirmation/custom-confirmation.component';

const MODULES = [
	FormsModule,
	CommonModule,
	ReactiveFormsModule,
	NgScrollbarModule,
	NgSelectModule,
	LoadingBarModule,
	NgxPaginationModule
];

const COMPONENTS = [
	PreLoaderComponent,
	CustomToastComponent,
	CustomConfirmationComponent
];

const CUSTOM_PIPES = [
	CastPipe,
	SummaryPipe,
	FileSizePipe,
	SafeSanitizePipe,
	NameInitialsPipe
];

const DIRECTIVES = [ClickoutsideDirective, AutocompleteOffDirective];

@NgModule({
	declarations: [...CUSTOM_PIPES, ...DIRECTIVES, ...COMPONENTS],
	imports: [...MODULES],
	exports: [...CUSTOM_PIPES, ...DIRECTIVES, ...MODULES, ...COMPONENTS]
})
export class SharedModule {}
