import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { ChartStoreService } from '../chart-store/chart-store.service';
import { ChartStore } from '../chart-store/chart-store';
import { ChartViewBuilderService } from './chart-view-builder.service';
import { ChartView, defaultChartView } from './chart-view';

@Injectable()
export class ChartViewService {

    private chartViewSubject: BehaviorSubject<ChartView>;

    constructor(
        private chartStore: ChartStoreService,
        private builder: ChartViewBuilderService,
    ) {
        this.chartViewSubject = new BehaviorSubject<ChartView>(defaultChartView());
        this.chartStore.chart.subscribe((chart) => {
            this.chartViewSubject.next(this.builder.buildView(chart));
        });
    }

    get view(): Observable<ChartView> {
        return this.chartViewSubject.asObservable();
    }
}
