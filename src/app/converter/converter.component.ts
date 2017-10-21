import { Component } from '@angular/core';

import { ChartStoreGuitarToGHLConverterService }
from '../chart-store/ghl/chart-store-guitar-to-ghl-converter.service';
import { ChartStoreService } from '../chart-store/chart-store.service';
import { ChartStore } from '../chart-store/chart-store';
import { ChartViewControllerService } from '../chart-view/controller/chart-view-controller.service';
import { ChartViewTrack } from '../chart-view/chart-view-track';

@Component({
    selector: 'app-converter',
    templateUrl: './converter.component.html',
    styleUrls: ['./converter.component.css'],
})
export class ConverterComponent {

    private currentChart: ChartStore;
    private currentTrack: ChartViewTrack;
    private $shouldConvertExpertGuitarToExpertGHL: boolean;

    constructor(
        private guitarToGHLConverter: ChartStoreGuitarToGHLConverterService,
        private chartStore: ChartStoreService,
        private viewController: ChartViewControllerService,
    ) {
        this.chartStore.chart.combineLatest(this.viewController.track, (chart, track) => {
            this.currentChart = chart;
            this.currentTrack = track;
        }).subscribe(() => {
            this.decideConvertExpertGuitarToExpertGHL();  
        });
    }

    get shouldConvertExpertGuitarToExpertGHL(): boolean {
        return this.$shouldConvertExpertGuitarToExpertGHL;
    }

    convertExpertGuitarToExpertGHLGuitar() {
        this.guitarToGHLConverter.convertExpert();
    }

    private decideConvertExpertGuitarToExpertGHL(): void {
        const ghlExpertIsEmpty = this.currentChart.ghlGuitar.expert.events.length === 0;
        const trackIsGHLExpert = this.currentTrack === ChartViewTrack.GHLGuitarExpert;
        this.$shouldConvertExpertGuitarToExpertGHL = ghlExpertIsEmpty && trackIsGHLExpert;
    }
}
