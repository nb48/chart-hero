import { Injectable } from '@angular/core';

import { Chart } from '../chart';
import { ChartStoreService } from '../chart-store/chart-store.service';

const loadChart = (chart: string): Chart => {
    return {
        metadata: new Map<string, string>(),
        events: [],
    };
};

@Injectable()
export class ChartImporterService {

    constructor(private store: ChartStoreService) {
    }

    set chart(chart: string) {
        this.store.chart = loadChart(chart);
    }
}
