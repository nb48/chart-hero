import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';

import { ChartView } from '../../chart-view/chart-view';

@Component({
    selector: 'app-chart-view',
    templateUrl: './chart-view.component.html',
    styleUrls: ['./chart-view.component.css'],
})
export class ChartViewComponent {
    @Input() view: ChartView;
}
