import { Injectable } from '@angular/core';

import { Chart } from '../chart';
import { ChartStoreService } from '../chart-store/chart-store.service';

const exportChart = (chart: Chart): string => {
    return '1234';
};

@Injectable()
export class ChartExporterService {

    constructor(private store: ChartStoreService) {
    }

    get chart(): string {
        return exportChart(this.store.chart);
    }
}
