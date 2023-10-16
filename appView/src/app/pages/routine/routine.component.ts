import { Component, Pipe, PipeTransform } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ExercicesDialogComponent } from 'src/app/dialogs/exercices-dialog/exercices-dialog.component';
import { SettingsRoutineDialogComponent } from 'src/app/dialogs/settings-routine-dialog/settings-routine-dialog.component';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-routine',
  templateUrl: './routine.component.html',
  styleUrls: ['./routine.component.scss']
})
export class RoutineComponent {

  myRoutine: any = {photo : ""}
  daysArray: any = []

  baseImageURL = "assets/"

  constructor(private api: ApiService, private router: Router, public dialog: MatDialog, private route: ActivatedRoute) {
    this.getInfoRoutine()
  }

  async getInfoRoutine() {

    let nameRoutine: any = this.route.snapshot.params['routineID'];
    let res: any = await this.api.viewMyRoutine(nameRoutine);

    if (Object.keys(res).length > 0 && res != "Error") {
      this.updateRoutine(res);
    } else {
      this.router.navigate([""])
    }

  }

  updateRoutine(newRoutine: any) {
    this.myRoutine = newRoutine;
    this.daysArray = [];

    for (let [key, value] of Object.entries(newRoutine.days)) {
      this.daysArray.push(value);
    }
  }


  async updateListDaysExercice(nameDay: any, data: any) {
    let updateRoutine = await this.api.addExerciceDay(nameDay, data, this.myRoutine.name);
    this.updateRoutine(updateRoutine)
  }

  async updateConfigRoutine(newConfigRoutine: any) {
    let updateRoutine = await this.api.changeConfigRoutine(this.myRoutine.name, newConfigRoutine);
    this.updateRoutine(updateRoutine)

  }


  //DIALOGS

  openDialogConfigRoutine() {
    const dialogRef = this.dialog.open(SettingsRoutineDialogComponent, {
      width: "600px",
      height: "350px",
      data: {
        "nameRoutine": this.myRoutine.name,
        "descriptionRoutine": this.myRoutine.description,
        "imageRoutine": this.myRoutine.photo,
        "activateRoutine": this.myRoutine.activeRoutine
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateConfigRoutine(result);
      }
    });
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


}