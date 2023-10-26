import { AfterViewInit, Component, OnDestroy, OnInit, Pipe, PipeTransform } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ExercicesDialogComponent } from 'src/app/dialogs/exercices-dialog/exercices-dialog.component';
import { SettingsRoutineDialogComponent } from 'src/app/dialogs/settings-routine-dialog/settings-routine-dialog.component';
import { ApiService } from 'src/app/services/api.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-routine',
  templateUrl: './routine.component.html',
  styleUrls: ['./routine.component.scss']
})
export class RoutineComponent implements OnInit, OnDestroy{

  public daysArray: any = []
  public singleRoutine: any = {photo : ""};
  public nameRoutine: string = "";
  private dataSubscriptor : Subscription = new Subscription;
  baseImageURL = "assets/"

  constructor(private api: ApiService, private router: Router, public dialog: MatDialog, private route: ActivatedRoute, public dataService: DataService) {}

  ngOnInit() {

    this.nameRoutine = this.route.snapshot.params['routineID']

    this.dataSubscriptor = this.dataService.myRoutines.subscribe((res) => {
      if(res !== null){
        
        if(res.length === 0){
          this.getRoutine();
        }
        else{
          this.configureRoutine(res);
        }
      }
    });

  }

  ngOnDestroy(){
    this.dataSubscriptor.unsubscribe();
  }

  async getRoutine() {
    
    this.singleRoutine = await this.api.viewMyRoutine(this.nameRoutine);

    if(Object.keys(this.singleRoutine).length === 0){
      this.router.navigate([""])
    }else{
      this.configureRoutine(this.singleRoutine);
    }

  }

  configureRoutine(allRoutines: any) {

    this.daysArray = [];

    for(let i of allRoutines){
      if(i.name == this.nameRoutine){
        this.singleRoutine = i;
      }
    }


    if(Object.keys(this.singleRoutine).length !== 0){
      for (let [key, value] of Object.entries(this.singleRoutine.days)) {
        this.daysArray.push(value);
      }
    }else{
      this.router.navigate([""])
    }

  }

  async updateListDaysExercice(nameDay: any, data: any) {
    let updatedRoutine = await this.api.addExerciceDay(nameDay, data, this.singleRoutine.name);
    this.configureRoutine(updatedRoutine)

  }

  async updateConfigRoutine(newConfigRoutine: any) {
    let updatedRoutine = await this.api.changeConfigRoutine(this.singleRoutine.name, newConfigRoutine);
    this.configureRoutine(updatedRoutine)
  }

  viewDayConfig(dayRoutine: any, event: Event) {

    if ((event.target as HTMLElement).className !== "addExercice") {
      this.router.navigate(['./config'], {relativeTo: this.route});
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