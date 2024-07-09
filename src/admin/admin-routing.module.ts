import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MerchantListComponent } from './Components/merchant-list/merchant-list.component';
import { MerchantAddComponent } from './Components/merchant-add/merchant-add.component';
import { MerchantEditComponent } from './Components/merchant-edit/merchant-edit.component';
import { RepresentativeFormComponent } from './Components/representative-form/representative-form.component';
import { BranchFromComponent } from './Components/branch-from/branch-from.component';
import { GovernorateListComponent } from './Components/governorate-list/governorate-list.component';
import { GovernorateAddComponent } from './Components/governorate-add/governorate-add.component';
import { RolePowersListComponent } from './Components/role-powers-list/role-powers-list.component';
import { GovernorateEditComponent } from './Components/governorate-edit/governorate-edit.component';
import { RolePowersEditComponent } from './Components/role-powers-edit/role-powers-edit.component';

const routes: Routes = [
  { path: 'representative/add', component: RepresentativeFormComponent },
  { path: 'representative/edit/:id', component: RepresentativeFormComponent },
  { path: 'merchant', component: MerchantListComponent },
  { path: 'merchant/add', component: MerchantAddComponent },
  { path: 'merchant/edit/:id', component: MerchantEditComponent },
  { path: 'branch/add', component: BranchFromComponent },
  { path: 'branch/edit/:id', component: BranchFromComponent },
  { path: 'governorate', component:GovernorateListComponent},
  { path: 'governorate/add', component:GovernorateAddComponent},
  { path: 'role', component:RolePowersListComponent},
  { path: 'governorate/edit/:id', component:GovernorateEditComponent },
  { path: 'role/edit/:id', component:RolePowersEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
