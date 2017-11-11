import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Observable } from 'rxjs';

import { ChartView, ChartViewBeat, ChartViewNote } from '../../chart-view/chart-view';

@Component({
    selector: 'app-fretboard',
    templateUrl: './fretboard.component.html',
    styleUrls: ['./fretboard.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FretboardComponent {
    @Input() view: ChartView;

    trackBeat(index: number, item: ChartViewBeat) {
        return item.id;
    }

    trackNote(index: number, item: ChartViewNote) {
        return item.id;
    }
}
