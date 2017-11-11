import { Component, Input } from '@angular/core';

import { ChartViewBeat } from '../../chart-view/chart-view';

@Component({
    selector: '[app-beat]',
    templateUrl: './beat.component.html',
})
export class BeatComponent {
    @Input() beat: ChartViewBeat;
}
