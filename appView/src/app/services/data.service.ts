import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoadingService } from './loading.service';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  public dataList : any = [];
  private myRoutines$ = new BehaviorSubject<any>(this.dataList);
  public myRoutines = this.myRoutines$.asObservable();

  constructor(public loadingService: LoadingService, public api: ApiService) { 

    this.api.getAllRoutines().then((res) => {
      this.fetchData(res);
    })

  }

  fetchData(allRoutines : any) {
    this.dataList = allRoutines;
    this.myRoutines$.next(this.dataList);
  }

  appendRoutine(routine : any) {
    this.dataList.push(routine);
    this.myRoutines$.next(this.dataList);
  }

  getData() : Observable<any>{
    return this.myRoutines;
  }

}
