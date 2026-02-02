import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThameService {

  constructor() { }
 private thame=false;


   setThame(thame:boolean)
   {
    this.thame=thame;
    if(this.thame)
    {
      document.body.classList.add('darkThame')
    }
   }



}
