import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MerchantListComponent } from './merchant-list/merchant-list.component';
import { MerchantAddComponent } from './merchant-add/merchant-add.component';
import { MerchantEditComponent } from './merchant-edit/merchant-edit.component';
import { RepresentativeFormComponent } from './Components/representative-form/representative-form.component';
import { BranchFromComponent } from './Components/branch-from/branch-from.component';

const routes: Routes = [
  { path: 'representative/add', component: RepresentativeFormComponent },
  { path: 'representative/edit/:id', component: RepresentativeFormComponent },
  { path: 'merchant', component: MerchantListComponent },
  { path: 'merchant/add', component: MerchantAddComponent },
  { path: 'merchant/edit/:id', component: MerchantEditComponent },
  {path:'branch/add',component: BranchFromComponent},
  {path:'branch/edit/:id',component: BranchFromComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
