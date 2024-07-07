import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderShowComponent } from './order-show/order-show.component';

const routes: Routes = [
  {path:"order",component:OrderShowComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
