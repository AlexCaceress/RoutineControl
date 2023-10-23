import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap } from 'rxjs';
import { LoadingService } from './loading.service';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseURL = "http://localhost:5000/"

  constructor(private http: HttpClient, public loadingService: LoadingService, public dataService: DataService) {
  }

  makeRequest(rute: string, type: string, params: any): any {

    this.loadingService.appLoading()

    if (type == "POST") {

      this.http.post(this.baseURL + rute, params).subscribe((res) => {
        this.dataService.setRoutine(res);
      })

    }
    else if (type == "GET") {

      this.http.get(this.baseURL + rute).subscribe({
        next: (res) => {
          this.dataService.setRoutine(res);
        },
      });

    }
  }

  getAllRoutines() {

    this.loadingService.appLoading()
    this.http.get(this.baseURL + "getRoutines/").subscribe(
      (res) => {
        this.dataService.setAllRoutines(res);
      },
    );
  }

  createNewRoutine(daysRoutine: string[]) {
    this.makeRequest("createRoutine/", "POST", { days: daysRoutine });
  }

  viewMyRoutine(nameRoutine: string) {

    return new Promise((resolv, reject) => {
      this.http.get(this.baseURL + `routine/${nameRoutine}/`).subscribe({
        next: (res) => {
          resolv(res);
        }
      })
    })
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
