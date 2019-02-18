import { NgModule } from '@angular/core';
import { TableComponent } from './tables-panel/table/table.component';
import { TablesPanelComponent } from './tables-panel/tables-panel.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [TableComponent, TablesPanelComponent],
  imports: [CommonModule],
  exports: [TablesPanelComponent]
})
export class TablesModule {}
