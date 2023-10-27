import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoadingService } from './loading.service';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public dataList: any = null;
  private myRoutines$ = new BehaviorSubject<any>(this.dataList);
  public myRoutines = this.myRoutines$.asObservable();

  constructor(public loadingService: LoadingService, public api: ApiService) {

    this.api.getAllRoutines().then((res) => {
      this.fetchData(res);
    })

  }

  fetchData(allRoutines: any) {
    this.dataList = allRoutines;
    this.myRoutines$.next(this.dataList);
  }

  appendRoutine(routine: any) {
    this.dataList.push(routine);
    this.myRoutines$.next(this.dataList);
  }

  updateRoutine(updatedRoutine: any) {
    for (let i = 0; i < this.dataList.length; i++) {
      if (this.dataList[i].name == updatedRoutine.name) {
        this.dataList[i] = updatedRoutine;
      }
    }

    this.myRoutines$.next(this.dataList);
  }

  async addExerciceRoutine(nameDay: string, data: any, routineName: any) {

    let updatedRoutine = await this.api.addExerciceDay(nameDay, data, routineName);
    this.updateRoutine(updatedRoutine);

  }

  async changeConfigRoutine(nameRoutine: any, newConfigRoutine: any) {

    let updatedRoutine = await this.api.changeConfigRoutine(nameRoutine, newConfigRoutine);
    this.updateRoutine(updatedRoutine);

  }

  getData(): Observable<any> {
    return this.myRoutines;
  }

}
