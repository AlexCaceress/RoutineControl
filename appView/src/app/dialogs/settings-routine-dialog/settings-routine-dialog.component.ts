import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-settings-routine-dialog',
  templateUrl: './settings-routine-dialog.component.html',
  styleUrls: ['./settings-routine-dialog.component.scss']
})
export class SettingsRoutineDialogComponent {

  constructor(public dialogRef: MatDialogRef<SettingsRoutineDialogComponent>){
    
  }

}
