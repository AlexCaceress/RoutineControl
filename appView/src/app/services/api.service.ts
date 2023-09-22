import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs';

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

    let x: any = "error"


    return new Promise((resolv, reject) => {
      this.http.get(this.baseURL + `routine/${nameRoutine}/`)
        .subscribe((res: any) => {
          resolv(res)
        }, (err: any) => {
          console.log("Error");
          resolv("Error")
        })

    })
  }


}
