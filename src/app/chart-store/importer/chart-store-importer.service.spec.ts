import { TestBed } from '@angular/core/testing';

import { ChartStoreGHLImporterService } from './../ghl/chart-store-ghl-importer.service';
import { ChartStoreImporterService } from './chart-store-importer.service';
import { ChartStoreMidiTimeService } from '../midi-time/chart-store-midi-time.service';
import { ChartStoreSyncTrackImporterService }
from './../sync-track/chart-store-sync-track-importer.service';
import { TEST_CHART_FILE, TEST_CHART_STORE } from '../test-chart-store';

describe('Service: ChartStoreImporterService', () => {

    let service: ChartStoreImporterService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ChartStoreGHLImporterService,
                ChartStoreImporterService,
                ChartStoreMidiTimeService,
                ChartStoreSyncTrackImporterService,
            ],
        });
        service = TestBed.get(ChartStoreImporterService);
    });

    it('ChartStoreImporterService should import chart correctly', () => {
        expect(service.import(TEST_CHART_FILE)).toEqual(TEST_CHART_STORE);
    });
});
