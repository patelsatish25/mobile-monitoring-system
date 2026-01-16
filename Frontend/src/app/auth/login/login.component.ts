import { HttpResponse } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BackendapiService } from 'src/app/services/backendapi.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private api:BackendapiService,private router:Router){}
  alertmsg="";
  hide=false;
   HandleSubmitLogin(form:NgForm)
   {
    
       
        this.api.login(form.value).subscribe({
          next:(res:HttpResponse<any>)=>{
             
             localStorage.setItem('token',res.body.token)
            this.router.navigate(['/devicess']);
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
