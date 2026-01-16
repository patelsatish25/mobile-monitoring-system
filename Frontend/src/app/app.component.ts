import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Frontend';
  
  ngOnInit()
  {
     window.addEventListener('storage',(event)=>{
      if (event.key === 'token') {
        window.location.href = '/';
      }
     })
  }
}
