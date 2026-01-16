import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, observeOn } from 'rxjs';
import { io, Socket } from 'socket.io-client';
interface PeriodicElement{
  username:string,
  email:string,
  id:string,
  status:string
}
@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket:Socket
  
  private divicess=new BehaviorSubject<any[]>([])
  private usersSubject = new BehaviorSubject<PeriodicElement[]>([]);
 users$ = this.usersSubject.asObservable();
 devices$=this.divicess.asObservable();

constructor() {
 

 

    this.socket=io("http://localhost:5000")

    
    this.socket.on('usersdata', (data: PeriodicElement[]) => {
      this.usersSubject.next(data); // store + emit
    });
  
    this.socket.on('divices', (devices: any[]) => {
      this.divicess.next(devices);
      console.log(devices)
    });
   

  }

  connectDevice(deviceId:string)
  {
        this.socket.emit('dashboardjoin',deviceId)
  }

  getlocation()
  {
       return new Observable((Observer)=>{
             this.socket.on('location',(data)=>{
                   Observer.next(data);
             })
       })
  }
  getVideo()
  {
    return new Observable((Observer)=>{
      this.socket.on('videostream',(data)=>{
            Observer.next(data);
      })
})
  }

  getBattery()
  {
    return new Observable((Observer)=>{
      this.socket.on('battery',(data)=>{
        Observer.next(data);
  })
    })
  }


  getOrientation()
  {
   
    return new Observable((Observer)=>{
      this.socket.on('deviceorientation',(data)=>{
        Observer.next(data);
  })
    })
  }

  getMotion()
  {
    return new Observable((Observer)=>{
      this.socket.on('devicemotion',(data)=>{
        Observer.next(data);
  })
    })
  }

  getNetInfo()
  {
    return new Observable((Observer)=>{
      this.socket.on('netinfo',(data)=>{
        Observer.next(data);
  })
    })
  }

  getspeed()
  {
    return new Observable((Observer)=>{
      this.socket.on('speedmbps',(data)=>{
        Observer.next(data);
  })
    })
  }
  

  getusers(): Observable<PeriodicElement[]> {
    return this.users$;
  }
 getdevices()
 {
  console.log(this.devices$)
   return this.devices$;
 }
   
 isnewcome()
 {
    return new Observable((Observer)=>{
      this.socket.on('newdevice',()=>{
        Observer.next("newcome")
      })
    })
 }

}
