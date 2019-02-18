import { ClientsGroup } from '../shared-services/client-group.service';

export const enum TableType {
  TableForTwo = 2,
  TableForThree,
  TableForFour,
  TableForFive,
  TableForSix
}

export const enum TableStatus {
  Busy = 0,
  Empty,
  HaveFreeChairs
}

export const TableConfig: {} = {
  [TableType.TableForTwo]: 1,
  [TableType.TableForThree]: 1,
  [TableType.TableForFour]: 1,
  [TableType.TableForFive]: 1,
  [TableType.TableForSix]: 1
};

export interface TableConfig {
  left: number;
  top: number;
  fill: string;
  width: number;
  height: number;
}

export const TableConfig2: TableConfig = {
  left: 290,
  top: 460,
  fill: 'saddlebrown',
  width: 80,
  height: 80
};

export const TableConfig3: TableConfig = {
  left: 580,
  top: 460,
  fill: 'saddlebrown',
  width: 80,
  height: 80
};

export const TableConfig4: TableConfig = {
  left: 150,
  top: 100,
  fill: 'saddlebrown',
  width: 80,
  height: 160
};

export const TableConfig5: TableConfig = {
  left: 430,
  top: 100,
  fill: 'saddlebrown',
  width: 80,
  height: 160
};

export const TableConfig6: TableConfig = {
  left: 710,
  top: 100,
  fill: 'saddlebrown',
  width: 80,
  height: 160
};

export const EmptyChair = 'transparent';
export interface ChairsConfig {
  radius: number;
  fill: string;
  stroke: string;
  left: number;
  top: number;
}

export const ChairsConfig2: ChairsConfig[] = [
  {
    radius: 20,
    fill: EmptyChair,
    stroke: 'black',
    left: 240,
    top: 480
  },
  {
    radius: 20,
    fill: EmptyChair,
    stroke: 'black',
    left: 380,
    top: 480
  }
];

export const ChairsConfig3: ChairsConfig[] = [
  {
    radius: 20,
    fill: EmptyChair,
    stroke: 'black',
    left: 530,
    top: 480
  },
  {
    radius: 20,
    fill: EmptyChair,
    stroke: 'black',
    left: 670,
    top: 480
  },
  {
    radius: 20,
    fill: EmptyChair,
    stroke: 'black',
    left: 600,
    top: 550
  }
];

export const ChairsConfig4: ChairsConfig[] = [
  {
    radius: 20,
    fill: EmptyChair,
    stroke: 'black',
    left: 100,
    top: 120
  },
  {
    radius: 20,
    fill: EmptyChair,
    stroke: 'black',
    left: 100,
    top: 200
  },
  {
    radius: 20,
    fill: EmptyChair,
    stroke: 'black',
    left: 240,
    top: 120
  },
  {
    radius: 20,
    fill: EmptyChair,
    stroke: 'black',
    left: 240,
    top: 200
  }
];

export const ChairsConfig5: ChairsConfig[] = [
  {
    radius: 20,
    fill: EmptyChair,
    stroke: 'black',
    left: 380,
    top: 120
  },
  {
    radius: 20,
    fill: EmptyChair,
    stroke: 'black',
    left: 380,
    top: 200
  },
  {
    radius: 20,
    fill: EmptyChair,
    stroke: 'black',
    left: 520,
    top: 120
  },
  {
    radius: 20,
    fill: EmptyChair,
    stroke: 'black',
    left: 520,
    top: 200
  },
  {
    radius: 20,
    fill: EmptyChair,
    stroke: 'black',
    left: 450,
    top: 50
  }
];

export const ChairsConfig6: ChairsConfig[] = [
  {
    radius: 20,
    fill: EmptyChair,
    stroke: 'black',
    left: 660,
    top: 120
  },
  {
    radius: 20,
    fill: EmptyChair,
    stroke: 'black',
    left: 660,
    top: 200
  },
  {
    radius: 20,
    fill: EmptyChair,
    stroke: 'black',
    left: 800,
    top: 120
  },
  {
    radius: 20,
    fill: EmptyChair,
    stroke: 'black',
    left: 800,
    top: 200
  },
  {
    radius: 20,
    fill: EmptyChair,
    stroke: 'black',
    left: 730,
    top: 50
  },
  {
    radius: 20,
    fill: EmptyChair,
    stroke: 'black',
    left: 730,
    top: 270
  }
];

export interface TableColor {
  color: string;
  group: ClientsGroup;
}
export const TableColors2: TableColor[] = [
  { color: '#e6194b', group: null },
  { color: '#3cb44b', group: null }
];

export const TableColors3: TableColor[] = [
  { color: '#ffe119', group: null },
  { color: '#4363d8', group: null },
  { color: '#f58231', group: null }
];

export const TableColors4: TableColor[] = [
  { color: '#911eb4', group: null },
  { color: '#46f0f0', group: null },
  { color: '#f032e6', group: null },
  { color: '#bcf60c', group: null }
];

export const TableColors5: TableColor[] = [
  { color: '#fabebe', group: null },
  { color: '#008080', group: null },
  { color: '#e6beff', group: null },
  { color: '#9a6324', group: null },
  { color: '#fffac8', group: null }
];

export const TableColors6: TableColor[] = [
  { color: '#800000', group: null },
  { color: '#aaffc3', group: null },
  { color: '#808000', group: null },
  { color: '#ffd8b1', group: null },
  { color: '#000075', group: null },
  { color: '#808080', group: null }
];
