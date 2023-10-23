import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SelectDaysDialogComponent } from 'src/app/dialogs/select-days-dialog/select-days-dialog.component';
import { ApiService } from 'src/app/services/api.service';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],

})
export class HomeComponent {

  baseImageURL = "assets/"

  constructor(private api: ApiService, public router: Router, public dialog: MatDialog, public dataService: DataService) { }

  ngOnInit() {


    setTimeout(() => {
        this.api.getAllRoutines();
        this.getTodaysRoutine();      
    }, 0);

  }

  async getTodaysRoutine() {
    this.api.getTodaysRoutine()
  }

  async createNewRoutine(daysRoutine: string[]) {
    this.api.createNewRoutine(daysRoutine);
  }

  viewRoutine(routine: any) {

    this.router.navigateByUrl(`routine/${routine.name}`);

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(SelectDaysDialogComponent, {
      width: "80vw",
      height: "70vh",
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.createNewRoutine(result)
      }
    });
  }

}
