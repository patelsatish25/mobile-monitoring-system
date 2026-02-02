import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ThameService } from 'src/app/services/thame.service';

@Component({
  selector: 'app-menu',
  templateUrl: './manu.component.html',
  styleUrls: ['./manu.component.css']
})
export class ManuComponent {

  constructor(private router:Router,private thame:ThameService){}
  @Input() dashboardname!:string;
  @Input() routerlink!:string;
  @Input() isAdmin!:boolean;
   isThame:any=false
   isdevicessurl():boolean
   {
     if(this.router.url=="/device")
     {
      return true
     }else{
      return false
     }
   }
   isadminurl():boolean
   {
    if(this.router.url=="/admin")
    {
      return true;
    }else{
      return false;
    }
   }

   Logout()
   {
       let logout=confirm("do you want to Logout");
       if(logout)
       {
          localStorage.removeItem('token');
          this.router.navigate(['/']);

       }
   }

   setTheme(event: Event) {
     console.log(event)
  }





}
