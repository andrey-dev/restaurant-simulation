import { Component, OnInit } from '@angular/core';
import { RestManager } from '../shared-services/rest-manager.service';
import { ClientsGroup } from '../shared-services/client-group.service';

@Component({
  selector: 'app-groups-queue',
  templateUrl: './groups-queue.component.html',
  styleUrls: ['./groups-queue.component.scss']
})
export class GroupsQueueComponent implements OnInit {
  private groups: Map<string, ClientsGroup> = new Map();
  readonly clientImgHeight = '86';
  readonly clientImgWidth = '65';
  constructor(private restManager: RestManager) {}

  ngOnInit() {
    this.restManager.groupArrived.subscribe((group: ClientsGroup) => {
      this.onArrive(group);
    });
    this.restManager.groupLeavedQueue.subscribe((group: ClientsGroup) => {
      this.onLeave(group);
    });
  }

  private onArrive(group: ClientsGroup): void {
    this.addGroup(group);
  }

  private onLeave(group: ClientsGroup): void {
    this.groups.delete(group.getId());
    const elem = document.getElementById(group.getId());
    elem.parentNode.removeChild(elem);
  }

  private createClientImg(): any {
    const img = document.createElement('img');
    img.src = './assets/img/client.png';
    img.id = 'picture';
    img.setAttribute('height', this.clientImgHeight);
    img.setAttribute('width', this.clientImgWidth);
    return img;
  }

  public addGroup(group: ClientsGroup): void {
    this.groups.set(group.getId(), group);
    const groupsDiv = document.getElementById('groups');
    const div = document.createElement('div');
    div.id = group.getId();
    for (let i = 0; i < group.getGroupSize(); i++) {
      div.appendChild(this.createClientImg());
    }

    groupsDiv.appendChild(div);
  }
}
