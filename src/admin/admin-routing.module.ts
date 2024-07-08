import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MerchantAddComponent } from './Components/merchant-add/merchant-add.component';
import { RepresentativeFormComponent } from './Components/representative-form/representative-form.component';
import { BranchFromComponent } from './Components/branch-from/branch-from.component';
import { GovernorateListComponent } from './Components/governorate-list/governorate-list.component';
import { BranchListComponent } from './Components/branch-list/branch-list.component';
import { MerchantListComponent } from './Components/merchant-list/merchant-list.component';
import { MerchantEditComponent } from './Components/merchant-edit/merchant-edit.component';

const routes: Routes = [
  { path: 'representative/add', component: RepresentativeFormComponent },
  { path: 'representative/edit/:id', component: RepresentativeFormComponent },
  { path: 'merchant', component: MerchantListComponent },
  { path: 'merchant/add', component: MerchantAddComponent },
  { path: 'merchant/edit/:id', component: MerchantEditComponent },
  { path: 'branch', component: BranchListComponent },
  { path: 'branch/add', component: BranchFromComponent },
  { path: 'branch/edit/:id', component: BranchFromComponent },
  { path: 'governorate', component: GovernorateListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
