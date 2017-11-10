import { Component } from '@angular/core';

// import { ModelGuitarToGHLConverterService }
// from '../chart-store/ghl/chart-store-guitar-to-ghl-converter.service';
// import { ModelService } from '../chart-store/chart-store.service';
// import { Model } from '../chart-store/chart-store';

@Component({
    selector: 'app-converter',
    templateUrl: './converter.component.html',
    styleUrls: ['./converter.component.css'],
})
export class ConverterComponent {

    // private currentChart: Model;
    // private currentTrack: ChartViewTrack;
    private $shouldConvertExpertGuitarToExpertGHL: boolean;

    constructor(
        // private guitarToGHLConverter: ModelGuitarToGHLConverterService,
        // private chartStore: ModelService,
        // private trackController: ChartViewTrackControllerService,
    ) {
        // this.chartStore.chart.combineLatest(this.trackController.track, (chart, track) => {
        //     this.currentChart = chart;
        //     this.currentTrack = track;
        // }).subscribe(() => {
        //     this.decideConvertExpertGuitarToExpertGHL();  
        // });
    }

    get shouldConvertExpertGuitarToExpertGHL(): boolean {
        return this.$shouldConvertExpertGuitarToExpertGHL;
    }

    convertExpertGuitarToExpertGHLGuitar() {
        // this.guitarToGHLConverter.convertExpert();
    }

    private decideConvertExpertGuitarToExpertGHL(): void {
        // const ghlExpertIsEmpty = this.currentChart.ghlGuitar.expert.events.length === 0;
        // const trackIsGHLExpert = this.currentTrack === ChartViewTrack.GHLGuitarExpert;
        // this.$shouldConvertExpertGuitarToExpertGHL = ghlExpertIsEmpty && trackIsGHLExpert;
    }
}
