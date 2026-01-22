import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './manu.component.html',
  styleUrls: ['./manu.component.css']
})
export class ManuComponent {

  constructor(private router:Router){}
  @Input() dashboardname!:string;
  @Input() routerlink!:string;
  @Input() isAdmin!:boolean;

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

   
}
