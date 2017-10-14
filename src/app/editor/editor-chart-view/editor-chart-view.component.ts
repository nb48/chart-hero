import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';

import { ChartView } from '../../chart-view/chart-view';

@Component({
    selector: 'app-editor-chart-view',
    templateUrl: './editor-chart-view.component.html',
    styleUrls: ['./editor-chart-view.component.css'],
})
export class EditorChartViewComponent {
    @Input() view: ChartView;
}
