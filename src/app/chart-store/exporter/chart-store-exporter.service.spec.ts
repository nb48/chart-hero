import { TestBed } from '@angular/core/testing';

import { ChartStoreExporterService } from './chart-store-exporter.service';
import { ChartStoreGHLExporterService } from '../ghl/chart-store-ghl-exporter.service';
import { ChartStoreMidiTimeService } from '../midi-time/chart-store-midi-time.service';
import { ChartStoreSyncTrackExporterService }
from '../sync-track/chart-store-sync-track-exporter.service';
import { ChartStoreTrackExporterService } from '../track/chart-store-track-exporter.service';
import { TEST_CHART_FILE, TEST_CHART_STORE } from '../test-chart-store';

describe('Service: ChartStoreExporterService', () => {

    let service: ChartStoreExporterService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ChartStoreExporterService,
                ChartStoreGHLExporterService,
                ChartStoreMidiTimeService,
                ChartStoreSyncTrackExporterService,
                ChartStoreTrackExporterService,
            ],
        });
        service = TestBed.get(ChartStoreExporterService);
    });

    it('ChartStoreExporterService should export chart correctly', () => {
        expect(service.export(TEST_CHART_STORE)).toEqual(TEST_CHART_FILE);
    });
});
