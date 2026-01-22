import { Component, OnInit } from '@angular/core';
import { SocketService } from 'src/app/services/socket.service';

import * as L from 'leaflet';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent implements OnInit {

  

  constructor(
    private socket: SocketService,
    private router: ActivatedRoute
  ) { }
  frame="";

  private map!: L.Map;

  customIcon = L.icon({
    iconUrl: 'assets/placeholder.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });

  battery = {
    per: 0,
    Charging: false
  };

  netspeed = 0;

  netinfo = {
    type: '',
    speed: 0,
    latency: 0
  };

  location = {
    latitude: 21.24,
    longitude: 73.19,
    accuracy:10
  };

  marker: any;
  circle: any;

  motion={
    accelerationx:0,
    accelerationy:0,
    accelerationz:0,
  }
  Orientation={
    alpha:0,
    beta:0,
    gamma:0
  }
  ngOnInit(): void {

    const id: any = this.router.snapshot.paramMap.get('id');
    console.log("Device ID:", id);

    this.socket.connectDevice(id);

    this.loadMap();   // create map once

    this.socket.getBattery().subscribe({
      next: (res: any) => {
        this.battery.per = (res.battrylevel * 100);
        this.battery.Charging = res.Charging;
      }
    });

    this.socket.getlocation().subscribe({
      next: (res: any) => {
      

        this.location.latitude = res.location.latitude;
        this.location.longitude = res.location.longitude;
        this.location.accuracy=res.location.accuracy;
        this.updateMap(res.location);  
      }
    });

    this.socket.getspeed().subscribe({
      next: (res: any) => {
        this.netspeed = res.speedMbps;
      }
    }); 

    this.socket.getNetInfo().subscribe({
      next: (res: any) => {
        this.netinfo.type = res.type;
        this.netinfo.speed = res.speed;
        this.netinfo.latency = res.latency;
       
      }
    });
    this.socket.getVideo().subscribe({
    next:(res:any)=>{
            console.log(res)
            this.frame=res.frame
            }
   } )

   this.socket.getMotion().subscribe({
    next:(res:any)=>{
              console.log(res)
              this.motion.accelerationx=res.motion.x;
              this.motion.accelerationy=res.motion.y;
              this.motion.accelerationz=res.motion.z
    }
   })

   this.socket.getOrientation().subscribe({
    next:(res:any)=>{
            this.Orientation.alpha=res.alpha;
            this.Orientation.beta=res.gamma;
            this.Orientation.gamma=res.gamma

    }
   })
  }
   


  loadMap() {

    this.map = L.map('map')
      .setView([this.location.latitude, this.location.longitude], 10);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19
    }).addTo(this.map);

   
    setTimeout(() => {
      this.map.invalidateSize();
    }, 200);
  }

  
  updateMap(loc: any) {

    if (!loc || !this.map) return;

    const lat = Number(loc.latitude);
    const lng = Number(loc.longitude);

    this.map.setView([lat, lng], 12);

    if (this.marker) {
      this.map.removeLayer(this.marker);
    }

    if (this.circle) {
      this.map.removeLayer(this.circle);
    }

    this.marker = L.marker([lat, lng], { icon: this.customIcon })
      .addTo(this.map)
      .bindPopup('Device Location')
      .openPopup();

    this.circle = L.circle([lat, lng], {
      radius: 200,
      color: "red",
      fillColor: "blue",
      fillOpacity: 0.3
    }).addTo(this.map);
  }
}
