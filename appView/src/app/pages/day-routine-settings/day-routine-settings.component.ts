import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-day-routine-settings',
  templateUrl: './day-routine-settings.component.html',
  styleUrls: ['./day-routine-settings.component.scss']
})
export class DayRoutineSettingsComponent {

  dayName: string = "";
  idRoutine: string = ""
  private dataSubscriptor: Subscription = new Subscription;

  routine: any = {};
  private routine$ = new BehaviorSubject<any>(this.routine);
  public observableRoutine = this.routine$.asObservable();


  constructor(private route: ActivatedRoute, private router: Router, private dataService: DataService) {

    try {

      this.updateRoutine(this.router.getCurrentNavigation()?.extras.state!["params"]);

    } catch{ }

    if(Object.keys(this.routine).length === 0){
      this.dayName = this.route.snapshot.params['day'];
      this.idRoutine = this.route.snapshot.params['routineID'];
      this.getDayRoutine()
    }

  }

  updateRoutine(routine : any){

    this.routine = routine;
    this.routine$.next(this.routine);
    
  }

  getDayRoutine() {

    this.dataSubscriptor = this.dataService.myRoutines.subscribe((res) => {
      
      if (res !== null) {

        for (let routine of res) {
          if (routine.id == this.idRoutine) {

            for (let [key, value] of Object.entries(routine.days)) {

              let dayRoutine : any = value;

              if(dayRoutine.day === this.dayName){
                this.updateRoutine(dayRoutine);
              }

            }

          }
        
        }
      }
    });

  }

  ngOnDestroy() {
    this.dataSubscriptor.unsubscribe()
  }

}
