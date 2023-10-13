import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-settings-routine-dialog',
  templateUrl: './settings-routine-dialog.component.html',
  styleUrls: ['./settings-routine-dialog.component.scss']
})
export class SettingsRoutineDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<SettingsRoutineDialogComponent>){
    
  }

  nameRoutine : any = this.data.nameRoutine;
  descritpionRoutine : any = this.data.descriptionRoutine;
  touchingImageSection : boolean = false;
  backgroundImage : any = "";

  sendInfo(){
    let data = {"nameRoutine" : this.nameRoutine, "descritpionRoutine" : this.descritpionRoutine, "imageRoutine" : this.backgroundImage}
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
