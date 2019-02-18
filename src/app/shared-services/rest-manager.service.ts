import { Injectable, EventEmitter } from '@angular/core';
import { Table, TableManager } from './table-manager.service';
import { ClientsGroup, ClientGroupManager } from './client-group.service';
import { TimeManager } from './time-manager.service';

export interface Statistic {
  total: number;
  served: number;
  waiting: number;
  abandon: number;
}

export interface TableInfo {
  size: number;
  groups: [];
}

@Injectable()
export class RestManager {
  public groupArrived = new EventEmitter<ClientsGroup>();
  public groupLeavedQueue = new EventEmitter<ClientsGroup>();
  public groupGetTable = new EventEmitter<{}>();
  public groupLeavedTable = new EventEmitter<{}>();
  private tables: Map<string, Table>;
  private waitingGroups: Map<string, ClientsGroup> = new Map();
  private statistics: Statistic = {
    total: 0,
    served: 0,
    waiting: 0,
    abandon: 0
  };

  constructor(
    private timeManager: TimeManager,
    private clientGroupManager: ClientGroupManager,
    private tableManager: TableManager
  ) {
    this.tables = this.tableManager.initTables();
  }

  public getStatistic(): Statistic {
    return this.statistics;
  }

  public openRestaurant(): void {
    this.makeSubscriptions();
    this.clientGroupManager.startGroupManager();
  }

  public closeRestaurant(): void {
    this.clientGroupManager.stopGroupManager();
    this.timeManager.stopTimeManager();
  }

  public getTables(): Table[] {
    return Array.from(this.tables.values());
  }

  public getWaitingGroups(): ClientsGroup[] {
    return Array.from(this.waitingGroups.values());
  }

  private makeSubscriptions(): void {
    this.clientGroupManager.groupArrived.subscribe((group: ClientsGroup) => {
      this.onArrive(group);
    });
    this.timeManager.stayTimeTimer.subscribe((data: any) => {
      this.onLeaveServed(data.table, data.group);
    });
    this.timeManager.waitTimeTimer.subscribe((group: ClientsGroup) => {
      this.onLeaveNotServed(group);
    });
  }

  private onArrive(group: ClientsGroup): void {
    this.groupArrived.emit(group);
    this.statistics.total++;
    this.waitingGroups.set(group.getId(), group);
    this.timeManager.runTableWaitTimer(group);
    this.statistics.waiting++;
    this.findTable();
  }

  private onLeaveNotServed(group: ClientsGroup): void {
    this.groupLeavedQueue.emit(group);
    this.waitingGroups.delete(group.getId());
    this.statistics.abandon++;
    this.statistics.waiting--;
  }

  private onLeaveServed(table: Table, group: ClientsGroup): void {
    const currentFreeChairs = table.getFreeChairs() + group.getGroupSize();
    this.tables.get(table.getId()).setFreeChairs(currentFreeChairs);
    this.tables.get(table.getId()).removeFromGroups(group);
    this.groupLeavedTable.emit({ group, table });
    if (this.waitingGroups.size) {
      this.findTable();
    }
  }

  private findTable(): void {
    for (const notServedGroup of this.waitingGroups.values()) {
      const table = this.lookup(notServedGroup);
      if (table) {
        return this.tableWasFound(table, notServedGroup);
      }
    }
  }

  private lookup(group: ClientsGroup): Table {
    return this.getTableForGroup(group);
  }

  private getTableForGroup(group: ClientsGroup): Table {
    let partiallyFreeTable: Table;
    for (const value of this.tables.values()) {
      if (value.getFreeChairs() >= group.getGroupSize() && value.isFree()) {
        return value;
      }
      if (
        value.getFreeChairs() >= group.getGroupSize() &&
        value.isPartiallyFree() &&
        !partiallyFreeTable
      ) {
        partiallyFreeTable = value;
      }
    }
    return partiallyFreeTable ? partiallyFreeTable : undefined;
  }

  private groupSatAtTheTable(table: Table, group: ClientsGroup): void {
    const currentFreeChairs = table.getFreeChairs() - group.getGroupSize();
    this.tables.get(table.getId()).setFreeChairs(currentFreeChairs);
    this.tables.get(table.getId()).setToGroups(group);
    this.groupGetTable.emit({ group, table });
  }

  private tableWasFound(table: Table, group: ClientsGroup): void {
    this.timeManager.stopTableWaitTimer(group);
    this.waitingGroups.delete(group.getId());
    this.statistics.waiting--;
    this.statistics.served++;
    this.groupLeavedQueue.emit(group);
    this.groupSatAtTheTable(table, group);
    this.timeManager.runStayTimeTimer(table, group);
  }
}
