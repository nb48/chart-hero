import { TestBed } from '@angular/core/testing';

import { Chart, TEST_CHART_FILE, TEST_CHART_OBJECT } from '../chart';
import { ChartStoreService } from '../chart-store/chart-store.service';
import { ChartExporterService } from './chart-exporter.service';
import { MidiTimeConverterService } from '../midi-time-converter/midi-time-converter.service';

describe('Service: ChartExporterService', () => {

    let exporter: ChartExporterService;
    let store: ChartStoreService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ChartExporterService,
                ChartStoreService,
                MidiTimeConverterService,
            ],
        });
        exporter = TestBed.get(ChartExporterService);
        store = TestBed.get(ChartStoreService);
    });

    it('ChartExporter should export chart correctly', () => {
        store.chart = TEST_CHART_OBJECT();
        expect(exporter.chart).toEqual(TEST_CHART_FILE);
    });
});
