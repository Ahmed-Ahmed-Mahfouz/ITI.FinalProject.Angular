import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderReportComponent } from './Components/order-report/order-report.component';
import { LoginComponent } from './Components/login/login.component';

const routes: Routes = [{ path: '', component: LoginComponent }];


@NgModule({
  imports: [RouterModule.forChild(routes),RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SharedModuleRoutingModule {}
