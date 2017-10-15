import { EventEmitter, Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

import { ChartFile } from '../chart-file/chart-file';
import { ChartFileExporterService } from '../chart-file/chart-file-exporter.service';
import { ChartFileImporterService } from '../chart-file/chart-file-importer.service';
import { ChartStoreGHLExporterService } from './chart-store-ghl-exporter.service';
import { ChartStoreGHLImporterService } from './chart-store-ghl-importer.service';
import { ChartStoreViewBuilderService } from './chart-store-view-builder.service';
import { ChartStore } from './chart-store';
import { ChartStoreView } from './chart-store-view';

@Injectable()
export class ChartStoreService {

    private chartFileEmitter: EventEmitter<ChartFile>;
    private chartStoreViewSubject: ReplaySubject<ChartStoreView>;
    private currentChart: ChartStore;

    constructor(
        private fileImporter: ChartFileImporterService,
        private fileExporter: ChartFileExporterService,
        private ghlImporter: ChartStoreGHLImporterService,
        private ghlExporter: ChartStoreGHLExporterService,
        private viewBuilder: ChartStoreViewBuilderService,
    ) {
        this.chartFileEmitter = new EventEmitter<ChartFile>();
        this.chartStoreViewSubject = new ReplaySubject<ChartStoreView>();
        fileExporter.chartFile = this.chartFileEmitter;
        fileImporter.chartFile.subscribe((chartFile: ChartFile) => {
            this.import(chartFile);
        });
    }

    get chart(): Observable<ChartStoreView> {
        return this.chartStoreViewSubject.asObservable();
    }

    private import(chartFile: ChartFile) {
        this.currentChart = this.ghlImporter.import(chartFile);
        this.chartStoreViewSubject.next(this.viewBuilder.buildView(this.currentChart));
        this.chartFileEmitter.emit(this.ghlExporter.export(this.currentChart));
    }
}
