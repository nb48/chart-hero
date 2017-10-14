import { Component, Input } from '@angular/core';

import { ChartViewBeat } from '../../../chart-view/chart-view';

@Component({
    selector: '[app-editor-chart-view-beat]',
    templateUrl: './editor-chart-view-beat.component.html',
    styleUrls: ['./editor-chart-view-beat.component.css'],
})
export class EditorChartViewBeatComponent {
    @Input() beat: ChartViewBeat;
}
