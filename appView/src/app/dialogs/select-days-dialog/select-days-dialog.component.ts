import { Component, Inject } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-select-days-dialog',
  templateUrl: './select-days-dialog.component.html',
  styleUrls: ['./select-days-dialog.component.scss']
})
export class SelectDaysDialogComponent {

  listSelectedDays : string[] = []

  constructor(public dialogRef: MatDialogRef<SelectDaysDialogComponent>){}

  selectedDay(day : string){

    if(this.listSelectedDays.includes(day)){
      this.listSelectedDays.splice(this.listSelectedDays.indexOf(day), 1)
    }else{
      this.listSelectedDays.push(day);  
    }    
  }
   
  closeDialog() {
    this.dialogRef.close(this.listSelectedDays);
  }

}
