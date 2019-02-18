import * as CONSTANTS from '../constants/constants';
import { UUID } from 'angular2-uuid';
import { ClientsGroup } from './client-group.service';

export class Table {
  private id: string;
  private allChairsCount: number;
  private freeChairsCount: number;
  private status: CONSTANTS.TableStatus = CONSTANTS.TableStatus.Empty;
  private groups: Map<string, ClientsGroup> = new Map();

  constructor(size: number) {
    this.allChairsCount = size;
    this.freeChairsCount = size;
    this.id = UUID.UUID();
  }

  public setFreeChairs(count: number): void {
    this.freeChairsCount = count;
  }

  public getFreeChairs(): number {
    return this.freeChairsCount;
  }

  public getSize(): number {
    return this.allChairsCount;
  }

  public getId(): string {
    return this.id;
  }

  public setToGroups(group: ClientsGroup): void {
    this.groups.set(group.getId(), group);
  }

  public removeFromGroups(group: ClientsGroup): void {
    this.groups.delete(group.getId());
  }

  public getGroups(): ClientsGroup[] {
    return Array.from(this.groups.values());
  }

  public updateStatus(): CONSTANTS.TableStatus {
    if (this.freeChairsCount === this.allChairsCount) {
      return (this.status = CONSTANTS.TableStatus.Empty);
    }
    if (this.freeChairsCount === CONSTANTS.TableStatus.Busy) {
      return (this.status = CONSTANTS.TableStatus.Busy);
    }
    return (this.status = CONSTANTS.TableStatus.HaveFreeChairs);
  }

  public getStatus(): CONSTANTS.TableStatus {
    return this.status;
  }

  public isFree(): boolean {
    return this.freeChairsCount === this.allChairsCount;
  }

  public isPartiallyFree(): boolean {
    return (
      this.freeChairsCount < this.allChairsCount && this.freeChairsCount !== 0
    );
  }

  public isFull(): boolean {
    return this.freeChairsCount === 0;
  }
}

export class TableManager {
  // private tables: Table[] = [];
  // table chairs: table count
  // private tableConfig: {} = {
  //   [CONSTANTS.TableType.TableForTwo]: 1,
  //   [CONSTANTS.TableType.TableForThree]: 1,
  //   [CONSTANTS.TableType.TableForFour]: 1,
  //   [CONSTANTS.TableType.TableForFive]: 1,
  //   [CONSTANTS.TableType.TableForSix]: 1
  // };

  public initTables(): Map<string, Table> {
    const tables: Table[] = [];
    for (const chairsCount in CONSTANTS.TableConfig) {
      if (!CONSTANTS.TableConfig.hasOwnProperty(chairsCount)) {
        continue;
      }
      tables.push(
        ...this.createTables(+chairsCount, CONSTANTS.TableConfig[+chairsCount])
      );
    }
    const tablesMap = new Map();
    tables.map(table => tablesMap.set(table.getId(), table));
    return tablesMap;
  }

  // public getTableCount(): number {
  //   return this.tables.length;
  // }

  // public getTables(): Table[] {
  //   return this.tables;
  // }

  private createTables(tableSize: number, tableCount: number): Table[] {
    if (tableCount === 1) {
      return [new Table(tableSize)];
    }
    const result: Table[] = [];
    for (let i = 0; i < tableCount; i++) {
      result.push(new Table(tableSize));
    }
    return result;
  }
}
