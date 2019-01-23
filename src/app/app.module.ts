import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StatisticComponent } from './statistic/statistic.component';
import { TablesPanelComponent } from './tables-panel/tables-panel.component';
import { GroupsQueueComponent } from './groups-queue/groups-queue.component';
import { TableComponent } from './tables-panel/table/table.component';
import { TableManager } from './shared-services/table-manager.service';
import { ClientGroupManager } from './shared-services/client-group.service';
import RestManager from './shared-services/rest-manager.service';
import TimeManager from './shared-services/time-manager.service';

@NgModule({
  declarations: [
    AppComponent,
    StatisticComponent,
    TablesPanelComponent,
    GroupsQueueComponent,
    TableComponent
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [TableManager, ClientGroupManager, RestManager, TimeManager],
  bootstrap: [AppComponent]
})
export class AppModule {}
