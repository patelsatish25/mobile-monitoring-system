import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
interface usertype{
  username:string,
  password:string,
  email?:string
}
@Injectable({
  providedIn: 'root'
})

export class BackendapiService {

  constructor(private http:HttpClient) { }

  login(user:usertype)
  {
       return this.http.post("http://localhost:5000/api/userAuth/login",user,{observe:'response'});
     
  }

  signup(user:usertype)
  {
      return this.http.post("http://localhost:5000/api/userAuth/signup",user,{observe:'response'});
  }


}
