import { EventEmitter, Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

import { ChartFileExporterService } from '../chart-file/exporter/chart-file-exporter.service';
import { ChartFileImporterService } from '../chart-file/importer/chart-file-importer.service';
import { ChartFile } from '../chart-file/chart-file';
import { ChartStoreExporterService } from './exporter/chart-store-exporter.service';
import { ChartStoreImporterService } from './importer/chart-store-importer.service';
import { ChartStore } from './chart-store';

@Injectable()
export class ChartStoreService {

    private chartFileEmitter: EventEmitter<ChartFile>;
    private chartStoreSubject: ReplaySubject<ChartStore>;
    private currentChart: ChartStore;

    constructor(
        private fileImporter: ChartFileImporterService,
        private fileExporter: ChartFileExporterService,
        private importer: ChartStoreImporterService,
        private exporter: ChartStoreExporterService,
    ) {
        this.chartFileEmitter = new EventEmitter<ChartFile>();
        this.chartStoreSubject = new ReplaySubject<ChartStore>();
        fileExporter.chartFile = this.chartFileEmitter;
        fileImporter.chartFile.subscribe((chartFile: ChartFile) => {
            this.import(chartFile);
        });
    }

    get chart(): Observable<ChartStore> {
        return this.chartStoreSubject.asObservable();
    }

    private import(chartFile: ChartFile) {
        this.currentChart = this.importer.import(chartFile);
        this.chartStoreSubject.next(this.currentChart);
        this.chartFileEmitter.emit(this.exporter.export(this.currentChart));
    }
}
