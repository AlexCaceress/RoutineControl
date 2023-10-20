import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SelectDaysDialogComponent } from 'src/app/dialogs/select-days-dialog/select-days-dialog.component';
import { ApiService } from 'src/app/services/api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],

})
export class HomeComponent {

  baseImageURL = "assets/"
  todaysRoutine: any = {}
  myRoutines?: Observable<any>;

  constructor(private api: ApiService, public router: Router, public dialog: MatDialog) { }

  ngOnInit() {
    this.myRoutines = this.api.myRoutines$
    this.api.getRoutines();
    this.getTodaysRoutine();
  }

  ngOnDestroy() {
    this.api.myRoutines = [];
  }

  async getTodaysRoutine() {
    this.todaysRoutine = await this.api.getTodaysRoutine()
    console.log(this.todaysRoutine);
  }

  async createNewRoutine(daysRoutine: string[]) {
    this.api.createNewRoutine(daysRoutine);
  }

  viewRoutine(routine: any) {

    let viewOfMyRoutine;

    for (let rt of this.api.myRoutines) {
      if (rt.name == routine.name) {
        viewOfMyRoutine = rt;
      }
    }
    this.router.navigateByUrl(`routine/${routine.name}`, { state: { rutine: viewOfMyRoutine } });
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
