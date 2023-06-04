import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServiceAddComponent, ServiceListComponent } from './pages';

const routes: Routes = [
	{
		path: '',
		component: ServiceListComponent,
		title: 'Service list',
		data: {
			title: 'service list',
			breadcrumb: 'Service List',
			data: 'Services'
		}
	},
	{
		path: 'add',
		component: ServiceAddComponent,
		title: 'Service Add',
		data: {
			title: 'service add',
			breadcrumb: 'Service add',
			data: 'Services'
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ServicesRoutingModule {}
