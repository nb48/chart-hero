import { TestBed } from '@angular/core/testing';

import { ChartStoreGHLConverterService } from './chart-store-ghl-converter.service';
import { ChartStoreMidiTimeService } from './chart-store-midi-time.service';
import { TEST_GHL_FILE, TEST_GHL_STORE } from './test-chart-store-ghl';

describe('Service: ChartStoreGHLConverterService', () => {

    let service: ChartStoreGHLConverterService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ChartStoreGHLConverterService,
                ChartStoreMidiTimeService,
            ],
        });
        service = TestBed.get(ChartStoreGHLConverterService);
    });

    // it('ChartStoreGHLConverterService should import chart correctly', () => {
    //     expect(service.import(TEST_GHL_FILE)).toEqual(TEST_GHL_STORE);
    // });

    // it('ChartStoreGHLConverterService should export chart correctly', () => {
    //     expect(service.export(TEST_GHL_STORE)).toEqual(TEST_GHL_FILE);
    // });
});
