import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.scss'],
})
export class TestPageComponent {
  name: string = '';
  params = { hola: '', noseque: 1 };

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.name = this.route.snapshot.params['testID'];
  }

  navigaton() {
    this.router.navigate(['./config'], {
      relativeTo: this.route,
      state: {
        name: this.route.snapshot.params['testID'],
        params: this.params,
      },
    });
  }
}
