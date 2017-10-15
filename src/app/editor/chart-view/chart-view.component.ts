import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Observable } from 'rxjs';

import { ChartView, ChartViewBeat, ChartViewNote } from '../../chart-view/chart-view';

@Component({
    selector: 'app-chart-view',
    templateUrl: './chart-view.component.html',
    styleUrls: ['./chart-view.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartViewComponent {
    @Input() view: ChartView;

    trackBeat(index: number, item: ChartViewBeat) {
        return item.id;
    }

    trackNote(index: number, item: ChartViewNote) {
        return item.id;
    }
}
