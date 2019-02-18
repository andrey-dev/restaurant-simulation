import { Component, OnInit, OnDestroy } from '@angular/core';
import { RestManager } from './shared-services/rest-manager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  constructor(private restManager: RestManager) {}

  public ngOnInit(): void {
    this.restManager.openRestaurant();
  }

  public ngOnDestroy(): void {
    this.restManager.closeRestaurant();
  }
}
