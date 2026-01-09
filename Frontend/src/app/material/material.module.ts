import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table'
import {MatPaginatorModule} from '@angular/material/paginator'

@NgModule({
  declarations: [],
  exports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule
  ],
 
})
export class MaterialModule { }
