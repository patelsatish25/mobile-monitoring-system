import { HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BackendapiService } from 'src/app/services/backendapi.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private api:BackendapiService){}
  alertmsg="";
  hide=false;
   HandleSubmitLogin(form:NgForm)
   {
        // console.log(form.value);
       
        this.api.login(form.value).subscribe({
          next:(res:HttpResponse<any>)=>{
               console.log(res)
          },
          error:(error)=>{
            console.log("error:",error)
           this.alertmsg=error.error.error;
           console.log(error.error.error);
          this.hide=true
           setTimeout(()=>{
            this.alertmsg="";
            this.hide=false;
            },2000)
          }
        })
   }
 
}
