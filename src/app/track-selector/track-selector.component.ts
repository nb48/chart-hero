import { Component } from '@angular/core';

import { ChartViewControllerService } from '../chart-view/controller/chart-view-controller.service';
import { ChartViewTrack } from '../chart-view/chart-view-track';

const tracks = [{
    model: ChartViewTrack.GHLGuitarExpert,
    view: 'Guitar Hero Live - Expert',
}, {
    model: ChartViewTrack.GHLGuitarHard,
    view: 'Guitar Hero Live - Hard',
}, {
    model: ChartViewTrack.GHLGuitarMedium,
    view: 'Guitar Hero Live - Medium',
}, {
    model: ChartViewTrack.GHLGuitarEasy,
    view: 'Guitar Hero Live - Easy',
}];

@Component({
    selector: 'app-track-selector',
    templateUrl: './track-selector.component.html',
    styleUrls: ['./track-selector.component.css'],
})
export class TrackSelectorComponent {

    tracks = tracks;

    constructor(public viewController: ChartViewControllerService) {
        this.viewController.track = ChartViewTrack.GHLGuitarExpert;
    }
}
