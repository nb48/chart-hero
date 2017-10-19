import { Component } from '@angular/core';

import { ChartFileExporterService } from '../chart-file/exporter/chart-file-exporter.service';

@Component({
    selector: 'app-exporter',
    templateUrl: './exporter.component.html',
    styleUrls: ['./exporter.component.css'],
})
export class ExporterComponent {

    constructor(public chartFileExporter: ChartFileExporterService) {
    }

    exportChart() {
        const chartString = this.chartFileExporter.export();
        const chart = new File([chartString], 'notes.chart', { type: 'text/chart' });
        const url = window.URL.createObjectURL(chart);
        window.open(url);
    }
}
