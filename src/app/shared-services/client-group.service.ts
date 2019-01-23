import * as CONSTANTS from '../constants/constants';
import { getRandomValue } from '../utils/utils';
import { EventEmitter } from '@angular/core';
import { UUID } from 'angular2-uuid';

export class ClientsGroup {
  // In milliseconds
  private readonly minWaitingTime = 2000;
  private readonly maxWaitingTime = 8000;
  private readonly minTimeInRestaurant = 4000;
  private readonly maxTimeInRestaurant = 15000;

  private id: string;
  private groupSize: number;
  private stayTime: number;
  private waitingTime: number;

  constructor(size: number) {
    this.groupSize = size;
    this.stayTime = getRandomValue(
      this.minTimeInRestaurant,
      this.maxTimeInRestaurant
    );
    this.waitingTime = getRandomValue(this.minWaitingTime, this.maxWaitingTime);
    this.id = UUID.UUID();
  }

  public getGroupSize(): number {
    return this.groupSize;
  }

  public getId(): string {
    return this.id;
  }

  public getStayTime(): number {
    return this.stayTime;
  }

  public getWaitingTime(): number {
    return this.waitingTime;
  }
}

/*
 * Generates clients groups with random size by random interval
 */
export class ClientGroupManager {
  public groupArrived = new EventEmitter<ClientsGroup>();

  // In milliseconds
  private readonly minTimeGroupAppearence: number = 3000;
  private readonly maxTimeGroupAppearence: number = 7000;
  private readonly minGroupSize = 1;
  private readonly maxGroupSize = 6;
  private intervalID: any;

  public startGroupManager() {
    this.intervalID = setInterval(() => {
      this.createGroup();
    }, this.getInterval());
  }

  public stopGroupManager() {
    if (this.intervalID) {
      clearInterval(this.intervalID);
    }
  }

  private createGroup(): void {
    const group = new ClientsGroup(this.getGroupSize());
    this.groupArrived.emit(group);
  }

  private getInterval(): number {
    return getRandomValue(
      this.minTimeGroupAppearence,
      this.maxTimeGroupAppearence
    );
  }

  private getGroupSize(): number {
    return getRandomValue(this.minGroupSize, this.maxGroupSize);
  }
}
