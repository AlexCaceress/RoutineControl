import { Component, Pipe, PipeTransform } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ExercicesDialogComponent } from 'src/app/dialogs/exercices-dialog/exercices-dialog.component';
import { SettingsRoutineDialogComponent } from 'src/app/dialogs/settings-routine-dialog/settings-routine-dialog.component';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-routine',
  templateUrl: './routine.component.html',
  styleUrls: ['./routine.component.scss']
})
export class RoutineComponent {

  public daysArray: any = []
  public singleRoutine: any = { photo: "" };
  public nameRoutine: string = "";

  baseImageURL = "assets/"

  constructor(private api: ApiService, private router: Router, public dialog: MatDialog, private route: ActivatedRoute, public dataService: DataService) {
    this.nameRoutine = this.route.snapshot.params['routineID']
  }

  ngOnInit() {

    if(this.dataService.allRoutines.length === 0){
      this.viewRoutine();
    }
    else{
      this.singleRoutine = this.dataService.viewSingleRoutine(this.nameRoutine);
      this.updateRoutine(this.singleRoutine);
    }

  }

  async viewRoutine() {
    
    this.singleRoutine = await this.api.viewMyRoutine(this.nameRoutine);
    console.log(this.singleRoutine);

    if(Object.keys(this.singleRoutine).length === 0){
      this.router.navigate([""])
    }else{
      this.updateRoutine(this.singleRoutine);
    }


  }

  updateRoutine(newRoutine: any) {
    this.singleRoutine = newRoutine;
    this.daysArray = [];

    for (let [key, value] of Object.entries(newRoutine.days)) {
      this.daysArray.push(value);
    }
  }

  async updateListDaysExercice(nameDay: any, data: any) {
    let updatedRoutine = await this.api.addExerciceDay(nameDay, data, this.singleRoutine.name);
    this.updateRoutine(updatedRoutine)

  }

  async updateConfigRoutine(newConfigRoutine: any) {
    let updatedRoutine = await this.api.changeConfigRoutine(this.singleRoutine.name, newConfigRoutine);
    this.updateRoutine(updatedRoutine)
  }

  viewDayConfig(dayRoutine: any, event: Event) {

    if ((event.target as HTMLElement).className !== "addExercice") {
      this.router.navigate(['./config'], {
        relativeTo: this.route,
        state: {
          params: dayRoutine
        },
      });
    }

  }

  //DIALOGS

  openDialogConfigRoutine() {
    const dialogRef = this.dialog.open(SettingsRoutineDialogComponent, {
      width: "600px",
      height: "350px",
      data: {
        "nameRoutine": this.singleRoutine.name,
        "descriptionRoutine": this.singleRoutine.description,
        "imageRoutine": this.singleRoutine.photo,
        "activateRoutine": this.singleRoutine.activeRoutine
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