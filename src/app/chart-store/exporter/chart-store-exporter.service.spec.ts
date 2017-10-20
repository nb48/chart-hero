import { TestBed } from '@angular/core/testing';

import { ChartStoreGenericExporterService } from '../generic/chart-store-generic-exporter.service';
import { ChartStoreGHLExporterService } from '../ghl/chart-store-ghl-exporter.service';
import { ChartStoreGuitarExporterService } from '../guitar/chart-store-guitar-exporter.service';
import { ChartStoreIdGeneratorService } from '../id-generator/chart-store-id-generator.service';
import { ChartStoreMetadataService } from '../metadata/chart-store-metadata.service';
import { ChartStoreMidiTimeService } from '../midi-time/chart-store-midi-time.service';
import { ChartStoreSyncTrackExporterService }
from '../sync-track/chart-store-sync-track-exporter.service';
import { ChartStoreTrackExporterService } from '../track/chart-store-track-exporter.service';
import { TEST_CHART_FILE, TEST_CHART_STORE } from '../test-chart-store';
import { ChartStoreExporterService } from './chart-store-exporter.service';

describe('Service: ChartStoreExporterService', () => {

    let service: ChartStoreExporterService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ChartStoreExporterService,
                ChartStoreGenericExporterService,
                ChartStoreGHLExporterService,
                ChartStoreGuitarExporterService,
                ChartStoreIdGeneratorService,
                ChartStoreMetadataService,
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
