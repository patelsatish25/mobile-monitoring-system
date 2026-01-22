import { Component } from '@angular/core';
import { ViewChild} from '@angular/core';
import { FormControl } from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { SocketService } from 'src/app/services/socket.service';
import { BackendapiService } from 'src/app/services/backendapi.service';
import { jwtDecode } from 'jwt-decode';
export interface PeriodicElement {
  username: string;
  id: string;
  email: number;
  status: string;
}
@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent   {

  constructor(private socket:SocketService,private api:BackendapiService){}
  displayedColumns: string[] = ['id', 'username','email', 'status','button'];
 
  dataSource = new MatTableDataSource();
  number=1;
  totalRecords=100;
  pageSize=5;
  pageIndex=0;
  filterState="";
  latestSocketData: any = null;
  


  

  
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  onPageChange(data:any)
  {
    this.pageIndex=data.pageIndex;
    console.log(this.pageIndex)
    this.getfilterdata();
  }

  statusControl=new FormControl('');
  filterIsOn=false;
  filterByState(data:any)
  {
         if(data!="All")
         {
          this.filterIsOn=true; 
          this.filterState=data;
          this.getfilterdata();
         }else{
          this.filterIsOn=false; 
          this.filterState=""
           console.log('hello')
         
        if (this.latestSocketData) {
    
      console.log(this.latestSocketData.users);
      this.dataSource.data = this.latestSocketData.users;
      this.totalRecords = this.latestSocketData.total;
    }
         }  
        
  }

   getfilterdata()
   {
      
      this.api.getuserfilterdata({
        pageIndex:this.pageIndex+1,
        statetype:this.filterState
      }).subscribe({
        next:(data:any)=>{
          this.dataSource.data=data.users;
          this.totalRecords=data.total;
        
        
        }
      })
   }

   setstate(id:any,state:string)
   {
        this.api.updateState(id,state).subscribe(
          {
            next:(res)=>{
             
              if(this.filterIsOn)
                {
                  this.getfilterdata();
                }
            }
          }
        );
   }

  ngOnInit()
  {
       
    
      this.socket.getusers().subscribe({
        next:(data:any)=>{  
          this.latestSocketData=data;      
          console.log(data)
          if(!this.filterIsOn)
            {
              
              console.log(data)
              
             this.dataSource.data=data.users;
            this.totalRecords=data.total;
            console.log(this.totalRecords)

        }
       }
      })
     
    
     
  }
  
  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  // }
 


  
}



