import { TestBed } from '@angular/core/testing';

import { Chart, TEST_CHART_FILE, TEST_CHART_OBJECT } from '../chart';
import { ChartStoreService } from '../chart-store/chart-store.service';
import { ChartImporterService } from './chart-importer.service';

describe('Service: ChartImporterService', () => {

    let importer: ChartImporterService;
    let store: ChartStoreService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ChartImporterService,
                ChartStoreService,
            ],
        });
        importer = TestBed.get(ChartImporterService);
        store = TestBed.get(ChartStoreService);
    });

    it('ChartImporter should import chart correctly', () => {
        importer.chart = TEST_CHART_FILE;
        expect(store.chart.metadata.size).toEqual(TEST_CHART_OBJECT.metadata.size);
        expect(store.chart.events).toEqual(TEST_CHART_OBJECT.events);
    });
});
