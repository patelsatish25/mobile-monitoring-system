import { AbstractControl, ValidationErrors } from "@angular/forms";


function usernamevalidation(control:AbstractControl):ValidationErrors |null
{

    const username=control.value||''
    const errors:ValidationErrors={};

    const hasNumber=/\d/.test(username);
    const hasLater=/[A-Za-z]/.test(username);
 
    if(!hasLater)
    {
        errors['hasLater']=true;
    }
    if(!hasNumber)
    {
        errors['hasNumber']=true;
    }
   
    return Object.keys(errors).length?errors:null;


}

function passwordValidator(control:AbstractControl)
{
     const password=control.value||'';
     const errors:ValidationErrors={};

     const startWithLetter = /[A-Za-z]/.test(password);
     const hasNumber = /\d/.test(password);
     const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
   
     if (!startWithLetter) {
       errors['startWithLetter'] = true;
     }
   
     if (!hasNumber) {
       errors['hasNumber'] = true;
     }
   
     if (!hasSpecial) {
       errors['hasSpecial'] = true;
     }
   
     return Object.keys(errors).length ? errors : null;
   

     

}
export {usernamevalidation,passwordValidator}