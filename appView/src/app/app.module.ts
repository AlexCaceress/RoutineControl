import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './pages/home/home.component';
import {HttpClientModule} from '@angular/common/http';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { RoutineComponent } from './pages/routine/routine.component';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { SelectDaysDialogComponent } from './dialogs/select-days-dialog/select-days-dialog.component';
import { TestPageComponent } from './pages/test-page/test-page.component';
import { ExercicesDialogComponent } from './dialogs/exercices-dialog/exercices-dialog.component';
import {FormsModule} from "@angular/forms";
import { SubRouteTestPageComponent } from './pages/sub-route-test-page/sub-route-test-page.component';
import { DayRoutineSettingsComponent } from './pages/day-routine-settings/day-routine-settings.component';
import { SettingsRoutineDialogComponent } from './dialogs/settings-routine-dialog/settings-routine-dialog.component'



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RoutineComponent,
    SelectDaysDialogComponent,
    TestPageComponent,
    ExercicesDialogComponent,
    SubRouteTestPageComponent,
    DayRoutineSettingsComponent,
    SettingsRoutineDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
