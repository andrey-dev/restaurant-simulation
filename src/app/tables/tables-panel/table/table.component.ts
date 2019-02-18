import { Component, OnInit, Input } from '@angular/core';
import { Table } from '../../../shared-services/table-manager.service';
import * as CONSTANTS from '../../../constants/constants';
import { ClientsGroup } from 'src/app/shared-services/client-group.service';
import { RestManager } from 'src/app/shared-services/rest-manager.service';
declare const fabric: any;

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() table: Table;
  @Input() canvas: any;
  private chairs: any = [];
  private chairsConfig: CONSTANTS.ChairsConfig[];
  private colors: CONSTANTS.TableColor[];
  private currentColorIdx = 0;
  constructor(private restManager: RestManager) {}

  ngOnInit() {
    this.getChairsConfig();
    this.initColors();
    this.createTable();
    this.restManager.groupGetTable.subscribe(data => {
      if (data.table !== this.table) {
        return;
      }
      this.groupArrived(data.group);
    });
    this.restManager.groupLeavedTable.subscribe(data => {
      if (data.table !== this.table) {
        return;
      }
      this.groupLeaved(data.group);
    });
  }

  private groupLeaved(group: ClientsGroup): void {
    const color = this.releaseColorForGroup(group);
    for (let i = 0; i < this.chairs.length; i++) {
      if (this.chairs[i].fill === color) {
        this.chairs[i].setColor(CONSTANTS.EmptyChair);
      }
    }
    this.canvas.renderAll();
  }

  private groupArrived(group: ClientsGroup): void {
    const color = this.getColorForGroup(group);
    const count = group.getGroupSize();
    let colored = 0;
    for (let i = 0; i < this.chairs.length; i++) {
      if (this.isEmpty(this.chairs[i])) {
        this.chairs[i].setColor(color);
        colored++;
      }
      if (colored === count) {
        break;
      }
    }
    this.canvas.renderAll();
  }

  private isEmpty(chair: any): boolean {
    return chair.fill === CONSTANTS.EmptyChair;
  }

  private getColorForGroup(group: ClientsGroup): string {
    if (this.currentColorIdx >= this.colors.length) {
      this.currentColorIdx = 0;
    }
    this.colors[this.currentColorIdx].group = group;
    const res = this.colors[this.currentColorIdx].color;
    this.currentColorIdx++;
    return res;
  }

  private releaseColorForGroup(group: ClientsGroup): string {
    let result = '';
    this.colors.map(color => {
      if (color.group === group) {
        color.group = null;
        result = color.color;
        return;
      }
    });
    return result;
  }

  private createTable(): void {
    const rect = new fabric.Rect(this.getTableConfig());
    this.canvas.add(rect);
    this.createChairs();
  }

  private createChairs(): void {
    this.chairsConfig.map(conf => {
      this.chairs.push(new fabric.Circle(conf));
    });
    this.canvas.add(...this.chairs);
  }

  private getTableConfig(): CONSTANTS.TableConfig {
    switch (this.table.getSize()) {
      case 2:
        return CONSTANTS.TableConfig2;
      case 3:
        return CONSTANTS.TableConfig3;
      case 4:
        return CONSTANTS.TableConfig4;
      case 5:
        return CONSTANTS.TableConfig5;
      case 6:
        return CONSTANTS.TableConfig6;
      default:
        break;
    }
  }

  private getChairsConfig(): void {
    switch (this.table.getSize()) {
      case 2:
        this.chairsConfig = CONSTANTS.ChairsConfig2;
        break;
      case 3:
        this.chairsConfig = CONSTANTS.ChairsConfig3;
        break;
      case 4:
        this.chairsConfig = CONSTANTS.ChairsConfig4;
        break;
      case 5:
        this.chairsConfig = CONSTANTS.ChairsConfig5;
        break;
      case 6:
        this.chairsConfig = CONSTANTS.ChairsConfig6;
        break;
      default:
        break;
    }
  }

  private initColors(): void {
    switch (this.table.getSize()) {
      case 2:
        this.colors = CONSTANTS.TableColors2;
        break;
      case 3:
        this.colors = CONSTANTS.TableColors3;
        break;
      case 4:
        this.colors = CONSTANTS.TableColors4;
        break;
      case 5:
        this.colors = CONSTANTS.TableColors5;
        break;
      case 6:
        this.colors = CONSTANTS.TableColors6;
        break;
      default:
        break;
    }
  }
}
