import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Routine } from 'src/app/interfaces/routine';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private api: ApiService, public router: Router) {
  }

  myRoutines = new Array<Routine>();

  ngOnInit() {
    this.api.getRoutines().then((res: any) => {
      for (let routine of res) {
        this.myRoutines.push(routine);
      }
    })

    //RUTINA DE PROVA
    // this.myRoutines.push({
    //   "name": "Rutina2",
    //   "days": 0,
    //   "description": "",
    //   "photo": "",
    //   "activeRoutine": false,
    //   "data": []
    // })

  }

  async createNewRoutine() {
    let newRoutine: any = await this.api.createNewRoutine()
    this.myRoutines.push(newRoutine);
  }


  viewRoutine(routine: Routine) {
    this.router.navigate([`routine/${routine.name}`])
  }

}
