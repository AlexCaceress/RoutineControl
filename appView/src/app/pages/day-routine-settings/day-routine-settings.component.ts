import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-day-routine-settings',
  templateUrl: './day-routine-settings.component.html',
  styleUrls: ['./day-routine-settings.component.scss']
})
export class DayRoutineSettingsComponent {
  
  routine : any = {}

  constructor(private route: ActivatedRoute, private router: Router){ }

  ngOnInit(){

    this.routine = this.router.getCurrentNavigation()?.extras.state;
    console.log(this.routine);
    
  }
}
