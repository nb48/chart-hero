import { TestBed } from '@angular/core/testing';

import { ChartStoreGenericImporterService } from '../generic/chart-store-generic-importer.service';
import { ChartStoreGHLImporterService } from '../ghl/chart-store-ghl-importer.service';
import { ChartStoreGuitarImporterService } from '../guitar/chart-store-guitar-importer.service';
import { ChartStoreIdGeneratorService } from '../id-generator/chart-store-id-generator.service';
import { ChartStoreMetadataService } from '../metadata/chart-store-metadata.service';
import { ChartStoreMidiTimeService } from '../midi-time/chart-store-midi-time.service';
import { ChartStoreSyncTrackImporterService }
from './../sync-track/chart-store-sync-track-importer.service';
import { ChartStoreTrackImporterService } from '../track/chart-store-track-importer.service';
import { TEST_CHART_FILE, TEST_CHART_STORE } from '../test-chart-store';
import { ChartStoreImporterService } from './chart-store-importer.service';

describe('Service: ChartStoreImporterService', () => {

    let service: ChartStoreImporterService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ChartStoreGenericImporterService,
                ChartStoreGHLImporterService,
                ChartStoreGuitarImporterService,
                ChartStoreIdGeneratorService,
                ChartStoreImporterService,
                ChartStoreMetadataService,
                ChartStoreMidiTimeService,
                ChartStoreSyncTrackImporterService,
                ChartStoreTrackImporterService,
            ],
        });
        service = TestBed.get(ChartStoreImporterService);
    });

    it('ChartStoreImporterService should import chart correctly', () => {
        expect(service.import(TEST_CHART_FILE)).toEqual(TEST_CHART_STORE);
    });
});
