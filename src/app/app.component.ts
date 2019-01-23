import { Component } from '@angular/core';
import RestManager from './shared-services/rest-manager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'restaurant-simulation';
  constructor(private restManager: RestManager) {
    this.restManager.openRestaurant();
  }
}
