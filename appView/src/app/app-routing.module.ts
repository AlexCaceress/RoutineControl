import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CreateNewRoutineComponent } from './pages/create-new-routine/create-new-routine.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'createNewRoutine', component: CreateNewRoutineComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
