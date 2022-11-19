import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';

import { DashbardRoutingModule } from './dashbard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
	declarations: [DashboardComponent],
	imports: [CommonModule, DashbardRoutingModule, SharedModule]
})
export class DashbardModule {}
