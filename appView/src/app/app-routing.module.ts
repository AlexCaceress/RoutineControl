import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RoutineComponent } from './pages/routine/routine.component';
import { SelectDaysDialogComponent } from './dialogs/select-days-dialog/select-days-dialog.component';
import { TestPageComponent } from './pages/test-page/test-page.component';
import { ExercicesDialogComponent } from './dialogs/exercices-dialog/exercices-dialog.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'routine/:routineID', component: RoutineComponent },
  { path: 'test', component: ExercicesDialogComponent },
  { path: "**", component: HomeComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
