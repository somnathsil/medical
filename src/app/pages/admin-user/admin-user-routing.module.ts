import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
	AdminUserAddComponent,
	AdminUserEditComponent,
	AdminUserListComponent
} from './pages';

const routes: Routes = [
	{
		path: '',
		component: AdminUserListComponent,
		title: 'Admin User List',
		data: {
			title: 'admin user list',
			breadcrumb: 'Admin User List',
			data: 'admin user'
		}
	},
	{
		path: 'add',
		component: AdminUserAddComponent,
		title: 'Admin User Add',
		data: {
			title: 'add admin user',
			breadcrumb: 'Add Admin User',
			data: 'admin user'
		}
	},
	{
		path: 'edit/:id',
		component: AdminUserEditComponent,
		title: 'Admin User Edit',
		data: {
			title: 'edit admin user',
			breadcrumb: 'Edit Admin User',
			data: 'admin user'
		}
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AdminUserRoutingModule {}
