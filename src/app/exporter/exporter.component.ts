import { Component } from '@angular/core';

import { ChartExporterService } from './../chart/chart-exporter/chart-exporter.service';

@Component({
    selector: 'app-exporter',
    templateUrl: './exporter.component.html',
    styleUrls: ['./exporter.component.css'],
})
export class ExporterComponent {

    constructor(public exporter: ChartExporterService) {
    }

    exportChart() {
        console.log('Export!');
    }
}
