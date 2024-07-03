import { RepresentativeFormComponent } from './Components/representative-form/representative-form.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MerchantAddComponent } from './Components/merchant-add/merchant-add.component';
import { MerchantEditComponent } from './Components/merchant-edit/merchant-edit.component';
import { MerchantListComponent } from './Components/merchant-list/merchant-list.component';

const routes: Routes = [
  { path: 'representativeForm', component: RepresentativeFormComponent },
  { path: 'merchant', component: MerchantListComponent },
  { path: 'merchant/add', component: MerchantAddComponent },
  { path: 'merchant/edit/:id', component: MerchantEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
