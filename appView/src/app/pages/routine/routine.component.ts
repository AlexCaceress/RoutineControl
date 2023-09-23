import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-routine',
  templateUrl: './routine.component.html',
  styleUrls: ['./routine.component.scss']
})
export class RoutineComponent {

  myRoutine: any = {}

  constructor(private api: ApiService, private router: Router) {

    let nameRoutine = this.router.url.split("/")[2];

    this.api.viewMyRoutine(nameRoutine).then((res: any) => {

      if (Object.keys(res).length > 0 && res != "Error") {
        
        console.log(res)

        this.myRoutine = res;

      } else {

        // this.router.navigate([""])
        
      }
    })

  }

  ngOnInit() {
  }


}
