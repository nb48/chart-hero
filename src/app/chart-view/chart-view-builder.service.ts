import { Injectable } from '@angular/core';

import { ChartStore } from '../chart-store/chart-store';
import { ChartView } from './chart-view';

const timeBefore = 1.4;
const timeAfter = -0.2;

const zeroPosition = (): number => {
    return timeBefore / (timeBefore - timeAfter) * 100;
};

@Injectable()
export class ChartViewBuilderService {

    constructor() {
    }

    buildView(cs: ChartStore, time: number): ChartView {
        return {
            zeroPosition: zeroPosition(),
        };
    }
}
