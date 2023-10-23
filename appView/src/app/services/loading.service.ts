import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  // isLoading$ = new Subject<boolean>();
  isLoading$ : boolean = false;
  
  appLoading(){ 
    // this.isLoading$.next(true);
    this.isLoading$ = true;
  }

  appFinishLoading(){
    // this.isLoading$.next(false);
    this.isLoading$ = false;
  }
}
