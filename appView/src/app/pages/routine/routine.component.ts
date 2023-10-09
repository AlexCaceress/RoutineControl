import { Component, Pipe, PipeTransform } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ExercicesDialogComponent } from 'src/app/dialogs/exercices-dialog/exercices-dialog.component';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-routine',
  templateUrl: './routine.component.html',
  styleUrls: ['./routine.component.scss']
})
export class RoutineComponent {

  myRoutine: any = {}
  daysArray: any = []

  baseImageURL = "assets/"


  constructor(private api: ApiService, private router: Router, public dialog: MatDialog) {

    let nameRoutine = this.router.url.split("/")[2];

    this.api.viewMyRoutine(nameRoutine).then((res: any) => {

      if (Object.keys(res).length > 0 && res != "Error") {

        this.updateRoutine(res);

      } else {

        this.router.navigate([""])

      }
    })

  }

  updateRoutine(newRoutine: any) {
    this.myRoutine = newRoutine;
    this.daysArray = [];

    for (let [key, value] of Object.entries(newRoutine.days)) {
      this.daysArray.push(value);
    }
  }

  openDialogAddExercice(nameDay: any): void {
    const dialogRef = this.dialog.open(ExercicesDialogComponent, {
      width: "70vw",
      height: "85vh",
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateListDaysExercice(nameDay, result);
      }
    });
  }


  async updateListDaysExercice(nameDay: any, data : any) {
    let updateRoutine = await this.api.addExerciceDay(nameDay, data, this.myRoutine.name);
    this.updateRoutine(updateRoutine)
  }


}