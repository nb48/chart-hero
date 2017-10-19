import { TestBed } from '@angular/core/testing';

import { ChartStoreGHLImporterService } from './chart-store-ghl-importer.service';
import { ChartStoreMidiTimeService } from '../midi-time/chart-store-midi-time.service';
import { TEST_GHL_FILE, TEST_GHL_STORE } from '../test-chart-store-ghl';

describe('Service: ChartStoreGHLImporterService', () => {

    let service: ChartStoreGHLImporterService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ChartStoreGHLImporterService,
                ChartStoreMidiTimeService,
            ],
        });
        service = TestBed.get(ChartStoreGHLImporterService);
    });

    it('ChartStoreGHLImporterService should import chart correctly', () => {
        expect(service.import(TEST_GHL_FILE)).toEqual(TEST_GHL_STORE);
    });
});
