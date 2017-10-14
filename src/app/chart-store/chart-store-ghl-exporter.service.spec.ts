import { TestBed } from '@angular/core/testing';

import { ChartStoreGHLExporterService } from './chart-store-ghl-exporter.service';
import { ChartStoreMidiTimeService } from './chart-store-midi-time.service';
import { TEST_GHL_FILE, TEST_GHL_STORE } from './test-chart-store-ghl';

describe('Service: ChartStoreGHLExporterService', () => {

    let service: ChartStoreGHLExporterService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ChartStoreGHLExporterService,
                ChartStoreMidiTimeService,
            ],
        });
        service = TestBed.get(ChartStoreGHLExporterService);
    });

    it('ChartStoreGHLExporterService should export chart correctly', () => {
        expect(service.export(TEST_GHL_STORE)).toEqual(TEST_GHL_FILE);
    });
});
