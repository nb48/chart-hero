import { Injectable } from '@angular/core';

export interface Chart {
  notes: Map<number, ChartNote>;
}

export interface ChartNote {
  id: number;
  time: number;
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
      notes: new Map<number, ChartNote>()
    }
    times.forEach((time, index) => {
      this._chart.notes.set(index, {
        id: index,
        time: time,
        color: 'green'
      });
    });
  }

  lastNote(): ChartNote {
    return Array.from(this._chart.notes.values())
      .reduce((accumulator, currentValue) => accumulator.time > currentValue.time ? accumulator : currentValue);
  }
}
