import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MerchantListComponent } from './Components/merchant-list/merchant-list.component';
import { MerchantAddComponent } from './Components/merchant-add/merchant-add.component';
import { MerchantEditComponent } from './Components/merchant-edit/merchant-edit.component';
import { RepresentativeFormComponent } from './Components/representative-form/representative-form.component';
import { BranchFromComponent } from './Components/branch-from/branch-from.component';
import { CityListComponent } from './Components/City/city-list/city-list.component';
import { CityAddComponent } from './Components/City/city-add/city-add.component';
import { CityEditComponent } from './Components/City/city-edit/city-edit.component';
import { GovernorateListComponent } from './Components/governorate-list/governorate-list.component';


const routes: Routes = [
  { path: 'representative/add', component: RepresentativeFormComponent },
  { path: 'representative/edit/:id', component: RepresentativeFormComponent },
  { path: 'merchant', component: MerchantListComponent },
  { path: 'merchant/add', component: MerchantAddComponent },
  { path: 'merchant/edit/:id', component: MerchantEditComponent },
  { path: 'branch/add', component: BranchFromComponent },
  { path: 'branch/edit/:id', component: BranchFromComponent },
  {path:'city',component:CityListComponent},
  {path:'city/add',component:CityAddComponent},
  {path:'city/edit/:id',component:CityEditComponent},
  { path: 'governorate', component:GovernorateListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
