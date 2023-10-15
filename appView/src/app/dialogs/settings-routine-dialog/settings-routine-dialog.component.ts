import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-settings-routine-dialog',
  templateUrl: './settings-routine-dialog.component.html',
  styleUrls: ['./settings-routine-dialog.component.scss']
})
export class SettingsRoutineDialogComponent {

  nameRoutine : any;
  descritpionRoutine : any;
  backgroundImage : any;
  touchingImageSection : boolean = false;
  activateRoutine : boolean = false;


  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<SettingsRoutineDialogComponent>){

    this.nameRoutine = data.nameRoutine;
    this.descritpionRoutine = data.descriptionRoutine;
    this.backgroundImage = data.imageRoutine;
    this.activateRoutine = data.activateRoutine
    
  }

  sendInfo(){
    let data = {"nameRoutine" : this.nameRoutine, "descritpionRoutine" : this.descritpionRoutine, "imageRoutine" : this.backgroundImage, "activateRoutine" : this.activateRoutine}
    console.log(data);
    this.dialogRef.close(data);
  }

  processFile(imageInput: any) {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event: any) => {

      let selectedFile = new ImageSnippet(event.target.result, file);
      this.changeBackgroundImage(selectedFile.src);
      
    });

    reader.readAsDataURL(file);
    
  }

  moseOverImageDiv(){
    this.touchingImageSection = true;
  }

  moseLeaveImageDiv(){
    this.touchingImageSection = false;

  }

  changeBackgroundImage(image:any){
    this.backgroundImage = image
  }

}

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}
