import { Component } from '@angular/core';
import { Routine } from 'src/app/interfaces/routine';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private api : ApiService){
  }

  myRoutines = new Array<Routine>();
  
  ngOnInit(){
    this.api.getRoutines().then( (res : any) => {
      for(let routine of res.rutinas){
        this.myRoutines.push(routine);9
      }
    })
  }
  
}
