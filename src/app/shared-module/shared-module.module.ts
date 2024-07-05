import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModuleRoutingModule } from './shared-module-routing.module';
import { OrderReportComponent } from './Components/order-report/order-report.component';
import { HomeComponent } from './Components/home/home.component';


@NgModule({
  declarations: [],
  imports: [CommonModule, SharedModuleRoutingModule, OrderReportComponent,HomeComponent],
  exports: [OrderReportComponent,HomeComponent],
})
export class SharedModuleModule {}
