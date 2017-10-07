import { EventEmitter } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { ChartFile } from './chart-file';
import { ChartFileExporterService } from './chart-file-exporter.service';
import { TEST_FILE, TEST_CHART } from './test-chart-file';

describe('Service: ChartFileExporterService', () => {

    let service: ChartFileExporterService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ChartFileExporterService],
        });
        service = TestBed.get(ChartFileExporterService);
    });

    it('ChartFileExporter should export chart correctly', () => {
        const emitter = new EventEmitter<ChartFile>();
        service.chartFile = emitter;
        emitter.emit(TEST_CHART);
        expect(service.export()).toEqual(TEST_FILE);
    });
});
