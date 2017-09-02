import { Injectable } from '@angular/core';

export interface Chart {
  notes: ChartNote[];
}

export interface ChartNote {
  time: number;
  color: string;
}

@Injectable()
export class ChartStoreService {

  private _chart: Chart;

  constructor() {
  }

  newChart(times: number[]) {
    this._chart = {
      notes: times.map((time) => ({
        time: time,
        color: 'green'
      }))
    };
  }

  get chart(): Chart {
    return this._chart;
  }
}
