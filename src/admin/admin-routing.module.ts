import { RepresentativeListComponent } from './Components/representative-list/representative-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MerchantAddComponent } from './Components/merchant-add/merchant-add.component';
import { RepresentativeFormComponent } from './Components/representative-form/representative-form.component';
import { BranchFromComponent } from './Components/branch-from/branch-from.component';
import { EmployeeEditComponent } from './Components/employee-edit/employee-edit.component';
import { EmployeshowComponent } from './Components/employee-show/employe-show.component';
import { EmployeeAddComponent } from './Components/employee-add/employee-add.component';

import { GovernorateListComponent } from './Components/governorate-list/governorate-list.component';
import { BranchListComponent } from './Components/branch-list/branch-list.component';


const routes: Routes = [
  {path:'representative',component:RepresentativeListComponent},
  { path: 'representative/add', component: RepresentativeFormComponent },
  { path: 'representative/edit/:id', component: RepresentativeFormComponent },
  { path: 'merchant/add', component: MerchantAddComponent },
  {path:'branch',component:BranchListComponent},
  { path: 'branch/add', component: BranchFromComponent },
  { path: 'branch/edit/:id', component: BranchFromComponent },

  {path: 'employee',component:EmployeshowComponent},
 {path:'employee/add',component:EmployeeAddComponent},
  {path:'employee/edit/:id',component:EmployeeEditComponent},

  { path: 'governorate', component:GovernorateListComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
