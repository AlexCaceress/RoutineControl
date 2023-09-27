import { Component } from '@angular/core';

@Component({
  selector: 'app-exercices-dialog',
  templateUrl: './exercices-dialog.component.html',
  styleUrls: ['./exercices-dialog.component.scss']
})
export class ExercicesDialogComponent {

  baseImageURL = "http://localhost:5000/img/"
  view = false;


  changeView(){
    this.view = this.view ? false : true;
  }
}
