import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared/shared.module';

import { ServicesRoutingModule } from './services-routing.module';
import { ServiceAddComponent, ServiceListComponent } from './pages';

@NgModule({
	declarations: [ServiceListComponent, ServiceAddComponent],
	imports: [CommonModule, ServicesRoutingModule, SharedModule]
})
export class ServicesModule {}
