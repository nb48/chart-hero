import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { ChartViewService } from '../chart-view/chart-view.service';
import { ChartView } from '../chart-view/chart-view';

@Component({
    selector: 'app-editor',
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.css'],
})
export class EditorComponent {

    view: Observable<ChartView>;

    constructor(private chartView: ChartViewService) {
        this.view = this.chartView.view;
    }
}
