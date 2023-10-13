import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-day-routine-settings',
  templateUrl: './day-routine-settings.component.html',
  styleUrls: ['./day-routine-settings.component.scss']
})
export class DayRoutineSettingsComponent {
  
  constructor(private route: ActivatedRoute, private router: Router){

    let prova : any = this.router.getCurrentNavigation()?.extras.state;
    console.log(prova);
  
  }
}
