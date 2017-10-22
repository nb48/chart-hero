import { Component } from '@angular/core';

import { ChartViewService } from '../chart-view/chart-view.service';

@Component({
    selector: 'app-editor',
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.css'],
})
export class EditorComponent {

    constructor(public chartView: ChartViewService) {
    }
}
