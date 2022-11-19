import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';

import { AdminUserRoutingModule } from './admin-user-routing.module';
import {
	AdminUserListComponent,
	AdminUserAddComponent,
	AdminUserEditComponent
} from './pages';

@NgModule({
	declarations: [
		AdminUserListComponent,
		AdminUserAddComponent,
		AdminUserEditComponent
	],
	imports: [CommonModule, AdminUserRoutingModule, SharedModule]
})
export class AdminUserModule {}
