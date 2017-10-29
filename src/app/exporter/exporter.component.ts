import { Component } from '@angular/core';

import { ModelExporterService } from '../model/import-export/model-exporter.service';

@Component({
    selector: 'app-exporter',
    templateUrl: './exporter.component.html',
    styleUrls: ['./exporter.component.css'],
})
export class ExporterComponent {

    constructor(public modelExporter: ModelExporterService) {
    }

    exportChart() {
        const chartString = this.modelExporter.export();
        const datetime = new Date()
            .toISOString()
            .replace(/:/g, '-')
            .split('.')[0];
        const filename = `notes-${datetime}.chart`;
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
