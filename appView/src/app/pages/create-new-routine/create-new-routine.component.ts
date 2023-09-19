import { Component } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-create-new-routine',
  templateUrl: './create-new-routine.component.html',
  styleUrls: ['./create-new-routine.component.scss']
})
export class CreateNewRoutineComponent {

  constructor(private api : ApiService){

  }

  ngOnInit(){
    
  }
}
