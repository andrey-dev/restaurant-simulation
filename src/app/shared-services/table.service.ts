enum TableStatus {
    FullFree,
    HaveFreeChairs,
    FullReserved
}

export class TableService {
    public allChairsCount: number;
    public freeChairsCount: number;
    public status: TableStatus;

    constructor(size: number) {
        this.allChairsCount = size;
        this.status = TableStatus.FullFree;
    }

    public setStatus(newStatus: TableStatus): void {
        this.status = newStatus;
    }

    public getStatus(): TableStatus {
        return this.status;
    }

    public setFreeChairs(count: number): void {
        this.freeChairsCount = count;
    }

    public getFreeChairs(): number {
        return this.freeChairsCount;
    }
}
