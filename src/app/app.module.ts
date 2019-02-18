import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import {
  MatFormFieldModule,
  MatInputModule,
  MatSliderModule
} from '@angular/material';

// vendor.js 213 B/ 489 ms

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StatisticComponent } from './statistic/statistic.component';
import { GroupsQueueComponent } from './groups-queue/groups-queue.component';
import { TableManager } from './shared-services/table-manager.service';
import { ClientGroupManager } from './shared-services/client-group.service';
import { RestManager } from './shared-services/rest-manager.service';
import { TimeManager } from './shared-services/time-manager.service';
import { SettingsComponent } from './settings/settings.component';
import { TablesModule } from './tables/tables.module';

@NgModule({
  declarations: [
    AppComponent,
    StatisticComponent,
    GroupsQueueComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TablesModule,
    BrowserAnimationsModule,
    MatSelectModule,
    FormsModule,
    MatSliderModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [RestManager, TableManager, TimeManager, ClientGroupManager],
  bootstrap: [AppComponent]
})
export class AppModule {}
