import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseURL = "http://localhost:5000/"
  constructor(private http: HttpClient) { }


  getRoutines() {
    return new Promise((resolv, reject) => {
      this.http.get(this.baseURL + "getRoutines/").subscribe((res: any) => {
        resolv(res);
      })
    });
  }

  createNewRoutine(daysRoutine: string[]) {

    const headers = new HttpHeaders({

      'Content-Type': 'application/json; charset=utf-8'

    });

    const requestOptions = { headers: headers };

    return new Promise((resolv, reject) => {
      this.http.post(this.baseURL + "createRoutine/", { days: daysRoutine }).subscribe((res) => {
        resolv(res);
      })
    })
  }

  viewMyRoutine(nameRoutine: string) {

    return new Promise((resolv, reject) => {
      this.http.get(this.baseURL + `routine/${nameRoutine}/`).subscribe((res: any) => {
          resolv(res)
        }, (err: any) => {
          resolv("Error")
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

  getTodaysRoutine() : Observable<any> {


    return this.http.get(this.baseURL + "todaysRoutine/")

    // return new Promise((resolv, reject) => {
    //   this.http.get(this.baseURL + "todaysRoutine/").subscribe((res) => {
    //     resolv(res);
    //   })
    // })

  }







}
