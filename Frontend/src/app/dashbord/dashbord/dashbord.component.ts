import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})
export class DashbordComponent implements OnInit{
  private map!: L.Map;

  customIcon = L.icon({
  iconUrl: 'assets/placeholder.png',
  iconSize: [32, 32],        // width, height
  iconAnchor: [16, 32],      // point of icon which will correspond to marker's location
  popupAnchor: [0, -32]      // where popup appears (optional)
});
  
  ngOnInit(): void {
    
    this.loadMap();
    
  }

  loadMap() {
  
    this.map = L.map('map').setView([21.24, 73.19], 10);

   
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19
    }).addTo(this.map);

    L.marker([21.24, 73.19], { icon: this.customIcon })
    .addTo(this.map)
    .bindPopup('Device Location')
    .openPopup();
  
    L.circle([21.24, 73.19],{
      radius:200,
      color:"red",
      fillColor:"blue",
      fillOpacity: 0.3
    }).addTo(this.map)
  }
    

}
