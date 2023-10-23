import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public allRoutines: any = new Array();
  public allRoutines$: BehaviorSubject<any>;
  public todaysRoutine : any = {};

  constructor(public loadingService : LoadingService) {
    this.allRoutines$ = new BehaviorSubject<any>(this.allRoutines);
  }

  setRoutine(routine : any){
    this.allRoutines.push(routine);
    this.allRoutines$.next(this.allRoutines);
    this.loadingService.appFinishLoading();
  }

  setAllRoutines(routines : any){
    
    for(let routine of routines){
      this.allRoutines.push(routine);
    }

    this.allRoutines$.next(this.allRoutines);
    this.loadingService.appFinishLoading()
  }


  viewSingleRoutine(name : string){
    
    let singleRoutine;

    for (let rt of this.allRoutines) {
      if (rt.name == name) {
        singleRoutine = rt;
      }
    }

    return singleRoutine;


  }
}
