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
        const chart = new File([this.exporter.chart], 'notes.chart', { type: 'text/chart' });
        const url = window.URL.createObjectURL(chart);
        window.open(url);
    }
}
