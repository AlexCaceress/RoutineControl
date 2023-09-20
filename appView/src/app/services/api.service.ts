import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseURL = "http://localhost:5000/"

  constructor(private http : HttpClient){}
  

  getRoutines(){
    return new Promise((resolv, reject) => {
      this.http.get(this.baseURL + "getRoutines/").subscribe((res : any) => {
        resolv(res);
      })
    });
  }

  createNewRoutine(){
    return new Promise( (resolv, reject) => {
      this.http.get(this.baseURL + "createRoutine/").subscribe( (res : any) => {
        resolv(res)
      })
    })
  }

  viewMyRoutine(nameRoutine : string){
    return new Promise( (resolv, reject) => {
      this.http.get(this.baseURL + `routine/${nameRoutine}/`).subscribe( (res : any) => {
        resolv(res)
      })
    })
  }

  
}
