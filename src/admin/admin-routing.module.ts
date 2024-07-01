import { RepresentativeFormComponent } from './representative-form/representative-form.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MerchantListComponent } from './merchant-list/merchant-list.component';
import { MerchantAddComponent } from './merchant-add/merchant-add.component';
import { MerchantEditComponent } from './merchant-edit/merchant-edit.component';

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
