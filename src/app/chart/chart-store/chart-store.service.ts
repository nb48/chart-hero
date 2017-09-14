import { Injectable } from '@angular/core';

import { Chart } from '../chart';

@Injectable()
export class ChartStoreService {

    private $chart: Chart;

    set chart(chart: Chart) {
        this.$chart = chart;
    }

    get chart() {
        return this.$chart;
    }
}
