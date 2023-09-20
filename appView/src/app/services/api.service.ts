import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient){}
  

  getRoutines(){

    return new Promise((resolv, reject) => {
      let url = "http://localhost:5000/getRoutines/";

      this.http.get(url).subscribe((res : any) => {
        resolv(res);
      })
    });
  }
}
