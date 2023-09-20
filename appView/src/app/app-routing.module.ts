import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RoutineComponent } from './pages/routine/routine.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'routine/:routineID', component: RoutineComponent },
  { path: "**", component: HomeComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
