import { AfterViewInit, Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { LoadingService } from './services/loading.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ViewContainerRef, ChangeDetectorRef, AfterContentChecked } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'appView';
  constructor(public loadingService: LoadingService, public cd: ChangeDetectorRef) { }

  

}
