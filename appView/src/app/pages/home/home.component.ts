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
  todaysRoutine: any = {};

  constructor(private api: ApiService, public router: Router, public dialog: MatDialog, public dataService: DataService) { }


  ngOnInit() {
    this.getTodaysRoutine();
  }

  async getTodaysRoutine() {
    this.todaysRoutine = await this.api.getTodaysRoutine();
  }

  createNewRoutine(daysRoutine: string[]) {

    this.api.createNewRoutine(daysRoutine).then((res) => {
      this.dataService.appendRoutine(res);
    });

  }

  viewRoutine(routine: any) {
    this.router.navigateByUrl(`routine/${routine.name}`);
  }


  //DIALOGS

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
