import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { DevicesComponent } from './devices/devices.component';
import { AuthGuard } from '../auth.guard';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { DevicesGuard } from '../devices.guard';

const routes:Routes=[

  {path:'devicess',component:DevicesComponent,canActivate:[AuthGuard]},
  {path:"admindashboard",component:AdmindashboardComponent,canActivate:[AuthGuard]},
  {path:'dashboard',component:DashbordComponent,canActivate:[AuthGuard,DevicesGuard]}
 
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
