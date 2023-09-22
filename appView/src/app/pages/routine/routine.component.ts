import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-routine',
  templateUrl: './routine.component.html',
  styleUrls: ['./routine.component.scss']
})
export class RoutineComponent {

  name = "";
  description = "";
  days = 0;
  date = "";
  nameCreator = "";

  constructor(private api : ApiService, private router : Router){
    let myRoutineName = this.router.url.split("/")[2];

    this.api.viewMyRoutine(myRoutineName).then((res: any) => {
      if(Object.keys(res).length > 0 && res != "Error"){
        this.name = res.name;
        this.description = res.description;
        this.days = res.numberDays;
        this.date = "-";
        this.nameCreator = "-";
      }else{
        this.router.navigate([""])
      }
    })

  }

  ngOnInit(){
  }

  
}
