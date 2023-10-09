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
  categoriSelected = false;
  exerciceSelected = false;

  exerciceCategory: string = "";
  nameExercice : string = "";

  repsNumber : number = 0;
  setsNumber : number = 0;

  constructor(public exercicesService: ExercicesService, public dialogRef: MatDialogRef<ExercicesDialogComponent>) { }

  showExercicesPage(exerciceCategory: string) {

    this.exerciceCategory = exerciceCategory;
    this.categoriSelected = this.categoriSelected ? false : true;

  }

  showSetsPage(nameExercice : string){

    this.nameExercice = nameExercice;
    this.exerciceSelected = this.exerciceSelected ? false : true;

    if(this.exerciceSelected == false){
      this.repsNumber = 0;
      this.setsNumber = 0;
    }

  }

  getArrayExercice(): any {

    if (this.exerciceCategory == "chest") {
      return this.exercicesService.getChestExercices();
    }
    else if (this.exerciceCategory == "back") {
      return this.exercicesService.getBackExercices();
    }
    else if (this.exerciceCategory == "leg") {
      return this.exercicesService.getLegExercices();
    }
    else if (this.exerciceCategory == "shoulders") {
      return this.exercicesService.getShouldersExercices();
    }

    return []

  }

  returnNameExercice() {
    let dataReturn = {reps : this.repsNumber, sets : this.setsNumber, nameExercice : this.nameExercice};
    this.dialogRef.close(dataReturn);
  }
}
