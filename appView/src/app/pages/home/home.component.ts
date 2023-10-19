import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SelectDaysDialogComponent } from 'src/app/dialogs/select-days-dialog/select-days-dialog.component';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  myRoutines = new Array<any>();
  baseImageURL = "assets/"
  todaysRoutine : any = {};

  constructor(private api: ApiService, public router: Router, public dialog: MatDialog) {
    this.getRoutines()
  }

  async getRoutines(){

    let myRoutines_RES : any = await this.api.getRoutines()

    if(myRoutines_RES){
      for (let routine of myRoutines_RES) {
        this.myRoutines.push(routine);
      }
    }

    this.api.getTodaysRoutine().subscribe((res) => {
      this.todaysRoutine = res;
      console.log(this.todaysRoutine)
    })
    
  }

  async createNewRoutine(daysRoutine : string[]) {
    let newRoutine: any = await this.api.createNewRoutine(daysRoutine)
    this.myRoutines.push(newRoutine);
  }


  viewRoutine(routine: any) {
    this.router.navigate([`routine/${routine.name}`])
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(SelectDaysDialogComponent, {
      width : "80vw",
      height : "70vh",
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.createNewRoutine(result)      
      }
    });
  }

  async getTodaysRoutine(){
    this.todaysRoutine = await this.api.getTodaysRoutine();
  } 

}
