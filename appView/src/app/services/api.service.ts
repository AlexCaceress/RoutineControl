import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap } from 'rxjs';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseURL = "http://localhost:5000/"

  public myRoutines: any = [];
  public myRoutines$: BehaviorSubject<any>;

  constructor(private http: HttpClient, public loadingService: LoadingService) {
    this.myRoutines$ = new BehaviorSubject<any>(this.myRoutines);
  }

  setMyRoutine(routines: any) {

    if (Array.isArray(routines)) {
      for (let routine of routines) {
        this.myRoutines.push(routine);
      }
    } else {
      this.myRoutines.push(routines);
    }

    this.myRoutines$.next(this.myRoutines);
    this.loadingService.appFinishLoading();

  }

  makeRequest(rute: string, type: string, params: any): any {

    this.loadingService.appLoading()

    if (type == "POST") {

      this.http.post(this.baseURL + rute, params).subscribe((res) => {
        this.setMyRoutine(res);
      })
    }
    else if (type == "GET") {

      this.http.get(this.baseURL + rute).subscribe({

        next: (res) => {
          this.setMyRoutine(res);
        },
        //error : (err) => { }


      });
    }
  }


  getRoutines() {
    this.makeRequest("getRoutines/", "GET", false);
  }

  createNewRoutine(daysRoutine: string[]) {
    this.makeRequest("createRoutine/", "POST", { days: daysRoutine });
  }

  viewMyRoutine(nameRoutine: string) {
    this.makeRequest(`routine/${nameRoutine}/`, "GET", false);
  }

  addExerciceDay(day: string, dataExercice: string, nameRoutine: string) {

    return new Promise((resolv, reject) => {
      this.http.post(this.baseURL + "modifyRoutine/", { nameRoutine: nameRoutine, day: day, dataExercice: dataExercice }).subscribe((res) => {
        resolv(res);
      })
    })

  }

  changeConfigRoutine(nameRoutine: string, newConfigRoutine: any) {

    return new Promise((resolv, reject) => {
      this.http.post(this.baseURL + "changeConfigRoutine/", { nameRoutine: nameRoutine, newConfigRoutine: newConfigRoutine }).subscribe((res) => {
        resolv(res);
      })
    })

  }

  getTodaysRoutine(): Promise<any> {

    return new Promise((resolv, reject) => {
      this.http.get(this.baseURL + "todaysRoutine/").subscribe((res) => {
        resolv(res);

      })
    })

  }

}
