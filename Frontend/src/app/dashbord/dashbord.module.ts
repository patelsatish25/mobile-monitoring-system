  import { NgModule } from '@angular/core';
  import { CommonModule } from '@angular/common';
  import { DashbordComponent } from './dashbord/dashbord.component';
  import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
  import { MaterialModule } from '../material/material.module';
  import { DevicesComponent } from './devices/devices.component';
  import { DashbordRoutingModule } from './dashbord-routing.module';
  import { ManuComponent } from './layout/manu/manu.component';



  @NgModule({
    declarations: [
      DashbordComponent,
      AdmindashboardComponent,
      DevicesComponent,
      ManuComponent,
      
    ],
    imports: [
      CommonModule,
      MaterialModule,
      DashbordRoutingModule,
      
    ]
    
  
  })
  export class DashbordModule { }
