import { Injectable } from '@angular/core';
import { Table, TableManager } from './table-manager.service';
import { ClientsGroup, ClientGroupManager } from './client-group.service';
import TimeManager from './time-manager.service';

@Injectable()
export default class RestManager {
  private tables: Map<string, Table>;
  private notServedGroups: ClientsGroup[] = [];
  private servedGroups: ClientsGroup[] = [];
  // private statistics ?

  constructor(
    private clientGroupManager: ClientGroupManager,
    private tableManager: TableManager,
    private timeManager: TimeManager
  ) {
    this.tables = this.tableManager.initTables();
  }

  public openRestaurant(): void {
    this.makeSubscriptions();
    this.clientGroupManager.startGroupManager();
  }

  public closeRestaurant(): void {
    this.clientGroupManager.stopGroupManager();
  }

  private makeSubscriptions(): void {
    this.clientGroupManager.groupArrived.subscribe((group: ClientsGroup) => {
      this.onArrive(group);
    });
    this.timeManager.stayTimeTimer.subscribe((data: any) => {
      this.onStayTimeIsOver(data.table, data.groupSize);
    });
  }

  private onArrive(group: ClientsGroup): void {
    this.notServedGroups.push(group);
    const table = this.lookup(/*group*/);
    if (table) {
      this.servedGroups.push(this.notServedGroups.pop()); // !!!!
      this.groupSatAtTheTable(table, group.getGroupSize());
      this.timeManager.runStayTimeTimer(
        table,
        group.getGroupSize(),
        group.getStayTime()
      );
      return;
    }
    // runTableWaitTimer()
    // runLookupByTimer
  }

  private onLeave(group: ClientsGroup): void {}

  private onStayTimeIsOver(table: Table, groupSize: number): void {
    const currentFreeChairs = table.getFreeChairs() + groupSize;
    this.tables.get(table.getId()).setFreeChairs(currentFreeChairs);
    console.log(
      `A group of ${groupSize} people left table ${JSON.stringify(table)}`
    );
  }

  private onTableWaitTimeIsOver() {}

  private lookup(/*group: ClientsGroup*/): Table {
    /*for (const value of this.tables.values()) {
      if (value.getFreeChairs() >= group.getGroupSize()) {
        return value;
      }
    }
    return undefined;*/
    let result: Table;
    console.log('lookup this.notServedGroups', this.notServedGroups);

    this.notServedGroups.map(group => {
      console.log('-group ', group);

      result = this.getTableForGroup(group);
      if (result) {
        return;
      }
    });
    console.log('end lookup with result = ', result);

    return result;
  }

  private getTableForGroup(group: ClientsGroup): Table {
    for (const value of this.tables.values()) {
      if (value.getFreeChairs() >= group.getGroupSize()) {
        return value;
      }
    }
    return undefined;
  }

  private groupSatAtTheTable(table: Table, groupSize: number): void {
    const currentFreeChairs = table.getFreeChairs() - groupSize;
    // this.tables.get(table.getId()).setFreeChairs(currentFreeChairs);
    table.setFreeChairs(currentFreeChairs);

    // console.log(
    //   'this.tables.get(table.getId())',
    //   this.tables.get(table.getId())
    // );
    console.log(
      `A Group of ${groupSize} people sat at the table ${JSON.stringify(
        this.tables.get(table.getId())
      )}`
    );
  }
}
