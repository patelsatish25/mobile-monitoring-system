import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashbordComponent } from './dashbord/dashbord.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
    DashbordComponent,
    AdmindashboardComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
  ,
  exports:[DashbordComponent,AdmindashboardComponent]
})
export class DashbordModule { }
