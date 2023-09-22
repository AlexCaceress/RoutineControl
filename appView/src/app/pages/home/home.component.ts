import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SelectDaysDialogComponent } from 'src/app/dialogs/select-days-dialog/select-days-dialog.component';
import { Routine } from 'src/app/interfaces/routine';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  myRoutines = new Array<any>();

  constructor(private api: ApiService, public router: Router, public dialog: MatDialog) {
    this.getRoutines()
  }

  getRoutines(){
    this.api.getRoutines().then((res: any) => {
      for (let routine of res) {
        this.myRoutines.push(routine);
      }
    })
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(SelectDaysDialogComponent, {
      width : "80vw",
      height : "70vh",
      disableClose : true
    });

    dialogRef.afterClosed().subscribe(result => {
      this.createNewRoutine(result)      
    });
  }


  async createNewRoutine(daysRoutine : string[]) {
    let newRoutine: any = await this.api.createNewRoutine(daysRoutine)
    this.myRoutines.push(newRoutine);
  }


  viewRoutine(routine: any) {
    this.router.navigate([`routine/${routine.name}`])
  }

}
