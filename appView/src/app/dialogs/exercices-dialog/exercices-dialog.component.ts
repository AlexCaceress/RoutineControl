import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ExercicesService } from 'src/app/services/exercices.service';

@Component({
  selector: 'app-exercices-dialog',
  templateUrl: './exercices-dialog.component.html',
  styleUrls: ['./exercices-dialog.component.scss']
})
export class ExercicesDialogComponent {

  baseImageURL = "assets/"
  view = false;

  constructor(public exercicesService : ExercicesService, public dialogRef: MatDialogRef<ExercicesDialogComponent>){}

  dayName : string = "";

  changeView(day : string){
    this.dayName = day;
    this.view = this.view ? false : true;
  }

  getArrayExercice() : any {

    if(this.dayName == "chest"){
      return this.exercicesService.getChestExercices();
    }
    else if(this.dayName == "back"){
      return this.exercicesService.getBackExercices();
    }
    else if(this.dayName == "leg"){
      return this.exercicesService.getLegExercices();
    }
    else if(this.dayName == "shoulders"){
      return this.exercicesService.getShouldersExercices();
    }
    
    return []

  }

  returnNameExercice(name : string){
    this.dialogRef.close(name);
  }
}
