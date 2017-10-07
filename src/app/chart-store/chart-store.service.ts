import { EventEmitter, Injectable } from '@angular/core';

import {
    ChartFile,
    ChartFileMetadata,
    ChartFileSyncTrack,
    ChartFileEvent,
    ChartFileTrack,
    defaultChartFile,
} from '../chart-file/chart-file';
import { ChartFileExporterService } from '../chart-file/chart-file-exporter.service';
import { ChartFileImporterService } from '../chart-file/chart-file-importer.service';

@Injectable()
export class ChartStoreService2 {

    private chartEmitter: EventEmitter<ChartFile>;

    constructor(
        private chartFileImporter: ChartFileImporterService,
        private chartFileExporter: ChartFileExporterService,
    ) {
        this.chartEmitter = new EventEmitter<ChartFile>();
        chartFileExporter.chartFile = this.chartEmitter;
        chartFileImporter.chartFile.subscribe((chartFile: ChartFile) => {
            this.chartEmitter.emit(chartFile);
        });
        this.chartEmitter.emit(defaultChartFile());
    }
}
