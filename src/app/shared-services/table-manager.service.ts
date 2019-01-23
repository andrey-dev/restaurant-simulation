import * as CONSTANTS from '../constants/constants';
import { UUID } from 'angular2-uuid';

export class Table {
  private id: string;
  private allChairsCount: number;
  private freeChairsCount: number;
  private status: CONSTANTS.TableStatus = CONSTANTS.TableStatus.Empty;

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
}

export class TableManager {
  private tables: Table[] = [];
  // table chairs: table count
  private tableConfig: {} = {
    [CONSTANTS.TableType.TableForTwo]: 2,
    [CONSTANTS.TableType.TableForThree]: 1,
    [CONSTANTS.TableType.TableForFour]: 1,
    [CONSTANTS.TableType.TableForFive]: 1,
    [CONSTANTS.TableType.TableForSix]: 1
  };

  public initTables(): Map<string, Table> {
    for (const chairsCount in this.tableConfig) {
      if (!this.tableConfig.hasOwnProperty(chairsCount)) {
        continue;
      }
      this.tables.push(
        ...this.createTables(+chairsCount, this.tableConfig[+chairsCount])
      );
    }
    const tablesMap = new Map();
    this.tables.map(table => tablesMap.set(table.getId(), table));
    return tablesMap;
  }

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
