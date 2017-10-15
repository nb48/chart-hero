import { Component, Input } from '@angular/core';

import { ChartViewBeat } from '../../../chart-view/chart-view';

@Component({
    selector: '[app-chart-view-beat]',
    templateUrl: './chart-view-beat.component.html',
})
export class ChartViewBeatComponent {
    @Input() beat: ChartViewBeat;
}
