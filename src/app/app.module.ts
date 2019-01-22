import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StatisticComponent } from './statistic/statistic.component';
import { TablesPanelComponent } from './tables-panel/tables-panel.component';
import { GroupsQueueComponent } from './groups-queue/groups-queue.component';
import { TableComponent } from './tables-panel/table/table.component';

@NgModule({
  declarations: [
    AppComponent,
    StatisticComponent,
    TablesPanelComponent,
    GroupsQueueComponent,
    TableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
