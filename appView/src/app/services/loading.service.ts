import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private loading: BehaviorSubject<boolean>;

  constructor() {
    this.loading = new BehaviorSubject<boolean>(false);
  }

  appLoading(){
    this.loading.next(true);
  }

  appFinishLoading(){
    this.loading.next(false);
  }

  getLoadingStatus(){
    this.loading.asObservable();
  }


}
