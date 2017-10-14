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
import { ChartStoreGHLExporterService } from './chart-store-ghl-exporter.service';
import { ChartStoreGHLImporterService } from './chart-store-ghl-importer.service';
import { ChartStore } from './chart-store';

@Injectable()
export class ChartStoreService {

    private chartEmitter: EventEmitter<ChartFile>;
    private currentChart: ChartStore;

    constructor(
        private fileImporter: ChartFileImporterService,
        private fileExporter: ChartFileExporterService,
        private ghlImporter: ChartStoreGHLImporterService,
        private ghlExporter: ChartStoreGHLExporterService,
    ) {
        this.chartEmitter = new EventEmitter<ChartFile>();
        fileExporter.chartFile = this.chartEmitter;
        this.import(defaultChartFile());
        this.export();
        fileImporter.chartFile.subscribe((chartFile: ChartFile) => {
            this.import(chartFile);
            this.export();
        });
    }

    private import(chartFile: ChartFile) {
        this.currentChart = this.ghlImporter.import(chartFile);
    }

    private export() {
        this.chartEmitter.emit(this.ghlExporter.export(this.currentChart));
    }
}
