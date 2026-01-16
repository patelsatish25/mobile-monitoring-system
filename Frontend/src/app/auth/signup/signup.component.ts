import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { passwordValidator, usernamevalidation } from './input.validators';
import { BackendapiService } from 'src/app/services/backendapi.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent {

  alertMessage=""
  alertbox=false;
  constructor(private api:BackendapiService,private router:Router){}

     form=new FormGroup({
      username:new FormControl("",[Validators.required,
        usernamevalidation,
        Validators.minLength(6)
      ]),
      password:new FormControl("",[
        Validators.required,
        passwordValidator,
        Validators.minLength(6)
        
      ]),
      email:new FormControl("",[Validators.required,Validators.email])
    })
      
    
     
    getusername():string | null
    {
     
      const user=this.form.get('username')
       if(!user || (user.touched && user.invalid))
       {
           switch(true)
           {
            case user?.errors?.['required']:{
              return "username must be requured";
              break;
            }
            case user?.errors?.['hasNumber']:{
              return "Username must contain at least one number"
              break;
            }
            case user?.errors?.['hasLater']:{
              return "Username must contain Laters "
              break;
            }
            case user?.hasError('minlength'):
              return 'Username must be at least 6 characters';

           }
       }
       return "";
    }

    getpasssworError():string 
    {
      const user=this.form.get('password')
      if(!user || (user.touched && user.invalid))
        {
            switch(true)
            {
             case user?.errors?.['required']:{
               return "password must be requured";
               break;
             }
             case user?.errors?.['hasNumber']:{
               return "Password must contain at least one number"
               break;
             }
             case user?.errors?.['startWithLetter']:{
               return "password must start with  Laters "
               break;
             }

             case user?.errors?.['hasSpecial']:{
              return "password must be use Special charachter "
              break;
            }
             case user?.hasError('minlength'):
               return 'password must be at least 6 characters';
 
            }
        }
        return "";
    }

    getemailerror():string
    {
      const user=this.form.get('email')
     
      if(!user || (user.touched && user.invalid))
        {
          switch(true)
          {
           case user?.errors?.['required']:{
             return "email must be requured";
            
           }
           case user?.errors?.['email']:{
            return "email is not valid"
           }
          }
        }
        return ""

    }

    handleSubmt()
    { 
    
      if(this.form.valid)
      {
        const data= {
          username: this.form.get('username')!.value!,
          password: this.form.get('password')!.value!,
          email: this.form.get('email')!.value!
        };
      
        console.log(data)
       this.api.signup(data).subscribe({
        next:(res)=>{
          this.router.navigate(["devicess"])
        }
        ,
        error:(error)=>{
          console.log("error",error)
          this.alertMessage=error?.error?.error;
          this.alertbox=true;
          setTimeout(()=>{
        
            this.alertMessage="";
            this.alertbox=false;
          },1500)
        }
       });
      }
    }
}
