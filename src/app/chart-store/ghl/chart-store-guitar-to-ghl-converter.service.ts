import { EventEmitter, Injectable } from '@angular/core';

import { ChartStoreService } from '../chart-store.service';
import { ChartStore } from '../chart-store';

@Injectable()
export class ChartStoreGuitarToGHLConverterService {

    private currentChart: ChartStore;

    constructor(private chartStore: ChartStoreService) {
        this.chartStore.chart.subscribe((chart) => {
            this.currentChart = chart;
        });
    }

    convertExpert(): void {
    }
}
