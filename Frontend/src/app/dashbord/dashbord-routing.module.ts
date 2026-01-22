import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { DevicesComponent } from './devices/devices.component';
import { AuthGuard } from '../auth.guard';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { DevicesGuard } from '../devices.guard';
import { AdminGuard } from '../admin.guard';

const routes:Routes=[

  {path:'devices',component:DevicesComponent,canActivate:[AuthGuard]},
  {path:"admin",component:AdmindashboardComponent,canActivate:[AuthGuard,AdminGuard]},
  {path:'devices/:id',component:DashbordComponent,canActivate:[AuthGuard,DevicesGuard]}
 
]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class DashbordRoutingModule { }
