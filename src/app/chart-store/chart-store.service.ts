import { EventEmitter, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { ChartFile, defaultChartFile } from '../chart-file/chart-file';
import { ChartFileExporterService } from '../chart-file/chart-file-exporter.service';
import { ChartFileImporterService } from '../chart-file/chart-file-importer.service';
import { ChartStoreGHLExporterService } from './chart-store-ghl-exporter.service';
import { ChartStoreGHLImporterService } from './chart-store-ghl-importer.service';
import { ChartStore } from './chart-store';

@Injectable()
export class ChartStoreService {

    private chartFileEmitter: EventEmitter<ChartFile>;
    private chartStoreSubject: Subject<ChartStore>;
    private currentChart: ChartStore;

    constructor(
        private fileImporter: ChartFileImporterService,
        private fileExporter: ChartFileExporterService,
        private ghlImporter: ChartStoreGHLImporterService,
        private ghlExporter: ChartStoreGHLExporterService,
    ) {
        this.chartFileEmitter = new EventEmitter<ChartFile>();
        this.chartStoreSubject = new Subject<ChartStore>();
        fileExporter.chartFile = this.chartFileEmitter;
        this.import(defaultChartFile());
        fileImporter.chartFile.subscribe((chartFile: ChartFile) => {
            this.import(chartFile);
        });
    }

    get chart(): Observable<ChartStore> {
        return this.chartStoreSubject.asObservable();
    }

    private import(chartFile: ChartFile) {
        this.currentChart = this.ghlImporter.import(chartFile);
        this.chartStoreSubject.next(this.currentChart);
        this.chartFileEmitter.emit(this.ghlExporter.export(this.currentChart));
    }
}
