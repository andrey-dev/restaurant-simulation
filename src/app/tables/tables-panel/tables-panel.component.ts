import { Component, OnInit } from '@angular/core';
import { Table } from '../../shared-services/table-manager.service';
import { RestManager } from '../../shared-services/rest-manager.service';
declare const fabric: any;

@Component({
  selector: 'app-tables-panel',
  templateUrl: './tables-panel.component.html',
  styleUrls: ['./tables-panel.component.scss']
})
export class TablesPanelComponent implements OnInit {
  public tables: Table[];
  private canvas: any;
  constructor(private restManager: RestManager) {}

  ngOnInit() {
    this.tables = this.restManager.getTables();
    this.canvas = new fabric.Canvas('tableCanvas');
  }
}
