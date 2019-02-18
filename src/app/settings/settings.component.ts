import { Component, OnInit } from '@angular/core';
import { ClientGroupManager } from '../shared-services/client-group.service';
import { MatSliderChange } from '@angular/material';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  public appearenceTime: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  public minAppearenceSelected = 2;
  public maxAppearenceSelected = 3;
  private readonly second = 1000;
  constructor(private clientGroupManager: ClientGroupManager) {}

  ngOnInit() {}

  public onMinAppearenceChanged() {
    this.clientGroupManager.setMinAppearenceTime(
      this.minAppearenceSelected * this.second
    );
  }

  public onMaxAppearenceChanged() {
    this.clientGroupManager.setMaxAppearenceTime(
      this.maxAppearenceSelected * this.second
    );
  }
}
