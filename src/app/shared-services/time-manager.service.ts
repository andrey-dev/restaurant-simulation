import { EventEmitter } from '@angular/core';
import { Table } from './table-manager.service';

export default class TimeManager {
  public stayTimeTimer = new EventEmitter<{}>();
  public waitTimeTimer = new EventEmitter<{}>();
  constructor() {}

  public runStayTimeTimer(
    table: Table,
    groupSize: number,
    stayTime: number
  ): void {
    setTimeout(() => {
      this.stayTimeTimer.emit({ table, groupSize });
    }, stayTime);
  }

  public runTableWaitTimer(): void {}
}
