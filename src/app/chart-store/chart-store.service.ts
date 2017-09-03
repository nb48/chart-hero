import { Injectable } from '@angular/core';

export interface Chart {
  notes: ChartNote[];
}

export interface ChartNote {
  time: number;
  color: string;
}

export interface Note {
  x: number;
  y: number;
  color: string;
}

@Injectable()
export class ChartStoreService {

  private _chart: Chart;

  constructor() {
  }

  get chart(): Chart {
    return this._chart;
  }

  newChart(times: number[]) {
    this._chart = {
      notes: times.map((time) => ({
        time: time,
        color: 'green'
      }))
    };
  }


  buildNote(color: string, y: number): Note {
    let x = undefined;
    switch (color) {
      case 'green':
        x = 10;
        break;
      case 'red':
        x = 30;
        break;
      case 'yellow':
        x = 50;
        break;
      case 'blue':
        x = 70;
        break;
      case 'orange':
        x = 90;
        break;
    }
    return {
      x: x,
      y: y,
      color: color
    }
  }
}
