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
import { ChartStoreGHLConverterService } from './chart-store-ghl-converter.service';
import { ChartStore } from './chart-store';

@Injectable()
export class ChartStoreService {

    private chartEmitter: EventEmitter<ChartFile>;
    private currentChart: ChartStore;

    constructor(
        private fileImporter: ChartFileImporterService,
        private fileExporter: ChartFileExporterService,
        private ghlConverter: ChartStoreGHLConverterService,
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
        this.currentChart = this.ghlConverter.import(chartFile);
    }

    private export() {
        this.chartEmitter.emit(this.ghlConverter.export(this.currentChart));
    }
}
