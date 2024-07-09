import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingListComponent } from './settings/setting-list/setting-list.component';
import { SettingEditComponent } from './settings/setting-edit/setting-edit.component';

const routes: Routes = [
    { path: 'setting', component:SettingListComponent},
    { path: 'setting/edit/:id', component:SettingEditComponent},    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
