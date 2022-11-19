import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgScrollbarModule } from 'ngx-scrollbar';

// Custom Directives
import { AutocompleteOffDirective, ClickoutsideDirective } from './directives';

/* Third party import */
import { NgSelectModule } from '@ng-select/ng-select';
import { PreLoaderComponent } from './components/pre-loader/pre-loader.component';
import { CustomToastComponent } from './components/custom-toast/custom-toast.component';

const MODULES = [
	FormsModule,
	CommonModule,
	ReactiveFormsModule,
	NgScrollbarModule,
	NgSelectModule
];

const COMPONENTS = [PreLoaderComponent, CustomToastComponent];

const DIRECTIVES = [AutocompleteOffDirective, ClickoutsideDirective];

@NgModule({
	declarations: [...DIRECTIVES, ...COMPONENTS],
	imports: [...MODULES],
	exports: [...DIRECTIVES, ...MODULES, ...COMPONENTS]
})
export class SharedModule {}
