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
        const filename = 'notes.chart';
        const chart = new File([chartString], filename, { type: 'text/plain' });
        const url = window.URL.createObjectURL(chart);
        const link = document.createElement('a');
        link.setAttribute('style', 'display: none');
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        window.URL.revokeObjectURL(url);
    }
}
