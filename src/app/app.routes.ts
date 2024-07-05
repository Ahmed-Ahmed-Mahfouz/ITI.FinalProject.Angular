import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () =>
      import('../admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'employee',
    loadChildren: () =>
      import('../employee/employee.module').then((m) => m.EmployeeModule),
  },
  {
    path: 'merchant',
    loadChildren: () =>
      import('../merchant/merchant.module').then((m) => m.MerchantModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('../app/shared-module/shared-module.module').then((l)=>l.SharedModuleModule),
  }
];
