import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
interface usertype{
  username:string,
  password:string,
  email?:string
}
interface users{
  pageIndex:number;
  statetype:string
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

  getuserfilterdata(data:users)
  {
     return this.http.get(`http://localhost:5000/api/admin/${data.pageIndex}?status=${data.statetype}`);
  } 

  updateState(id:any,state:string)
  {
    
    return this.http.patch(`http://localhost:5000/api/admin/${id}`,{state:state},{observe:'response'});
  }

  getdevices()
  {
    return this.http.get('http://localhost:5000/devices')
  }
  isAllowTodevice()
  {
    return this.http.get("http://localhost:5000/users",{observe:'response'})
  }
}
