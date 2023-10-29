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

  constructor(private http: HttpClient, public loadingService: LoadingService) { }


  getAllRoutines() {

    return new Promise((resolv, reject) => {
      this.http.get(this.baseURL + "getRoutines/").subscribe((res) => {
        resolv(res);
      });
    });

  }

  createNewRoutine(newRoutine: object) {
    
    return new Promise((resolv, reject) => {
      this.http.post(this.baseURL + "createRoutine/", newRoutine).subscribe((res) => {
        resolv(res);
      })
    })

  }

  viewMyRoutine(idRoutine: string) {

    return new Promise((resolv, reject) => {
      this.http.get(this.baseURL + `routine/${idRoutine}/`).subscribe({
        next: (res) => {
          resolv(res);
        }
      })
    })

  }

  addExerciceDay(day: string, dataExercice: string, idRoutine: string) {

    return new Promise((resolv, reject) => {
      this.http.post(this.baseURL + "modifyRoutine/", { idRoutine: idRoutine, day: day, dataExercice: dataExercice }).subscribe((res) => {
        resolv(res);
      })
    })

  }

  changeConfigRoutine(idRoutine: string, newConfigRoutine: any) {

    return new Promise((resolv, reject) => {
      this.http.post(this.baseURL + "changeConfigRoutine/", { idRoutine: idRoutine, newConfigRoutine: newConfigRoutine }).subscribe((res) => {
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
