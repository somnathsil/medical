import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found.component';

const routes: Routes = [
	{
		path: '',
		component: NotFoundComponent,
		title: 'Not Found',
		data: { title: 'not found' }
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class NotFoundRoutingModule {}
