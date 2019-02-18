import { EventEmitter } from '@angular/core';
import { Table } from './table-manager.service';
import { ClientsGroup } from './client-group.service';

export class TimeManager {
  public stayTimeTimer = new EventEmitter<{}>();
  public waitTimeTimer = new EventEmitter<ClientsGroup>();
  private groupsTimers: Map<string, any> = new Map();
  private stopped = false;
  constructor() {}

  public runStayTimeTimer(table: Table, group: ClientsGroup): void {
    setTimeout(() => {
      if (!this.stopped) {
        this.stayTimeTimer.emit({ table, group });
      }
    }, group.getStayTime());
  }

  public runTableWaitTimer(group: ClientsGroup): void {
    const timerId = setTimeout(() => {
      this.waitTimeTimer.emit(group);
    }, group.getWaitingTime());
    this.groupsTimers.set(group.getId(), timerId);
  }

  public stopTableWaitTimer(group: ClientsGroup): void {
    const timerId = this.groupsTimers.get(group.getId());
    clearTimeout(timerId);
    this.groupsTimers.delete(group.getId());
  }

  public stopTimeManager(): void {
    this.stopped = true;
    this.groupsTimers.forEach((value, key, map) => {
      clearTimeout(value);
    });
  }
}
