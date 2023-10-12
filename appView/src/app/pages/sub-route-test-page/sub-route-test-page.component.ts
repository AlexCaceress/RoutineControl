import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sub-route-test-page',
  templateUrl: './sub-route-test-page.component.html',
  styleUrls: ['./sub-route-test-page.component.scss']
})
export class SubRouteTestPageComponent {

  text : any;

  constructor(private route: ActivatedRoute, private router: Router,){

    let prova : any = this.router.getCurrentNavigation()?.extras.state;
    this.text = prova.name
    console.log(prova);
  }

  
}
