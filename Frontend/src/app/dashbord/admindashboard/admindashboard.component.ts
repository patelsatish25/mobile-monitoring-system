import { Component } from '@angular/core';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent implements AfterViewInit  {
  displayedColumns: string[] = ['position', 'username','email', 'status'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}

export interface PeriodicElement {
  username: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, username: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, username: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, username: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, username: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, username: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, username: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, username: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, username: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, username: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, username: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 11, username: 'Sodium', weight: 22.9897, symbol: 'Na'},
  {position: 12, username: 'Magnesium', weight: 24.305, symbol: 'Mg'},
  {position: 13, username: 'Aluminum', weight: 26.9815, symbol: 'Al'},
  {position: 14, username: 'Silicon', weight: 28.0855, symbol: 'Si'},
  {position: 15, username: 'Phosphorus', weight: 30.9738, symbol: 'P'},
  {position: 16, username: 'Sulfur', weight: 32.065, symbol: 'S'},
  {position: 17, username: 'Chlorine', weight: 35.453, symbol: 'Cl'},
  {position: 18, username: 'Argon', weight: 39.948, symbol: 'Ar'},
  {position: 19, username: 'Potassium', weight: 39.0983, symbol: 'K'},
  {position: 20, username: 'Calcium', weight: 40.078, symbol: 'Ca'},
];
