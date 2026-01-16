import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { jwtDecode } from 'jwt-decode';
import { SocketService } from 'src/app/services/socket.service';
import { BackendapiService } from 'src/app/services/backendapi.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent {
  gridCols = 5;
  apiDevices: any[] = [];      
  socketDevices: any[] = [];   
  hide=false;
  constructor(private socket : SocketService,private api:BackendapiService,private router:Router) {}
  
      
     alertmsg=""
 
      dashboardname="User dashoard";
    
      isAdmin=false;
    
     token:string|null=""
     trackByText(index: number, tile: any) {
      return tile.text;
    }
  ngOnInit()
  {
    
   
   this.token=localStorage.getItem('token');
    
   if(this.token)
   {
  
    const decode:any=jwtDecode(this.token)
   
    if(decode.type=="admin")
    {
        this.isAdmin=true;

    }
    
  }
    
    this.socket.isnewcome().subscribe({
      next:()=>{
        this.loaddevicess();
      }
    })


    this.loaddevicess()
    this.socket.getdevices().subscribe(data => {
    this.socketDevices = data;
    console.log(data)


  });

  }

  loaddevicess()
  {
    this.api.getdevices().subscribe({
      next:(res:any)=>
      {
           
            this.apiDevices = res.devices ?? res;
      }
    })
  }
  isActive(deviceId: string): boolean {
    return this.socketDevices.some(
      d => d.deviceId === deviceId
    );
  }




  opendevice(Id:any)
  {
      if(this.isActive(Id))
        {
          this.api.isAllowTodevice().subscribe({
            next:(res)=>{
                   this.router.navigate(['dashboard'])
                   return true;
            },
            error:(res)=>{
             
              this.hide=true;
      this.alertmsg="You don’t have permission to access device data"
      setTimeout(() => {
       this.hide=false;
       this.alertmsg=""
      }, 1400);
            
            }
           })
        }else{
             this.hide=true;
             this.alertmsg="device is not active"
             setTimeout(() => {
              this.hide=false;
              this.alertmsg=""
             }, 1400);
        }

      
       
    
  }



  



}

