import { Component, OnInit } from '@angular/core';
import {
  Statistic,
  RestManager
} from '../shared-services/rest-manager.service';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.scss']
})
export class StatisticComponent implements OnInit {
  public statistic: Statistic;
  constructor(private restManager: RestManager) {}

  ngOnInit() {
    this.statistic = this.restManager.getStatistic();
  }
}
