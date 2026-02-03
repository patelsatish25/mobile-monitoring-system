import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThameService {

  dark=new BehaviorSubject<boolean>(false)
  isDark$=this.dark.asObservable();
  isDarkTheme: boolean = false;



  constructor() { }



  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    this.dark.next(this.isDarkTheme)
    console.log(this.isDarkTheme);

    const body = document.body;

    if (this.isDarkTheme) {
      body.classList.add('darkTheme');
    } else {
      body.classList.remove('darkTheme');
    }
  }
}
