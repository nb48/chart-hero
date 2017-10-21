import { EventEmitter, Injectable } from '@angular/core';

import { ChartFile, ChartFileMetadata } from '../../chart-file/chart-file';
import { ChartViewTrack } from '../../chart-view/chart-view-track';
import { ChartStoreGHLImporterService } from '../ghl/chart-store-ghl-importer.service';
import { ChartStoreGuitarImporterService } from '../guitar/chart-store-guitar-importer.service';
import { ChartStoreMetadataService } from '../metadata/chart-store-metadata.service';
import { ChartStoreSyncTrackImporterService }
from '../sync-track/chart-store-sync-track-importer.service';
import { ChartStoreTrackImporterService } from '../track/chart-store-track-importer.service';
import { ChartStore, ChartStoreMetadata, ChartStoreTrack } from '../chart-store';

@Injectable()
export class ChartStoreImporterService {

    constructor(
        private ghlImporter: ChartStoreGHLImporterService,
        private guitarImporter: ChartStoreGuitarImporterService,
        private metadataService: ChartStoreMetadataService,
        private syncTrackImporter: ChartStoreSyncTrackImporterService,
        private trackImporter: ChartStoreTrackImporterService,
    ) {
    }

    import(cf: ChartFile): ChartStore {
        const metadata = this.metadataService.import(cf.metadata);
        const resolution = this.metadataService.getResolution(metadata);
        const offset = this.metadataService.getOffset(metadata);
        return {
            metadata,
            syncTrack: this.syncTrackImporter.import(cf.syncTrack, resolution, offset),
            guitar: {
                expert: this.guitarImporter.import
                    (cf.guitar.expert, cf.syncTrack, resolution, offset),
                hard: this.guitarImporter.import
                    (cf.guitar.hard, cf.syncTrack, resolution, offset),
                medium: this.guitarImporter.import
                    (cf.guitar.medium, cf.syncTrack, resolution, offset),
                easy: this.guitarImporter.import
                    (cf.guitar.easy, cf.syncTrack, resolution, offset),
            },
            ghlGuitar: {
                expert: this.ghlImporter.import
                    (cf.ghlGuitar.expert, cf.syncTrack, resolution, offset),
                hard: this.ghlImporter.import
                    (cf.ghlGuitar.hard, cf.syncTrack, resolution, offset),
                medium: this.ghlImporter.import
                    (cf.ghlGuitar.medium, cf.syncTrack, resolution, offset),
                easy: this.ghlImporter.import
                    (cf.ghlGuitar.easy, cf.syncTrack, resolution, offset),
            },
            events: this.trackImporter.import(cf.events),
            vocals: this.trackImporter.import(cf.vocals),
            venue: this.trackImporter.import(cf.venue),
        };
    }

    defaultTrack(cs: ChartStore): ChartViewTrack {
        let longestTrack = ChartViewTrack.GuitarExpert;
        let longestCount = 0;
        const checkTrack = (track: ChartStoreTrack, view: ChartViewTrack): void => {
            if (track.events.length > longestCount) {
                longestTrack = view;
                longestCount = track.events.length;
            }
        };
        checkTrack(cs.guitar.expert, ChartViewTrack.GuitarExpert);
        checkTrack(cs.guitar.hard, ChartViewTrack.GuitarHard);
        checkTrack(cs.guitar.medium, ChartViewTrack.GuitarMedium);
        checkTrack(cs.guitar.easy, ChartViewTrack.GuitarEasy);
        checkTrack(cs.ghlGuitar.expert, ChartViewTrack.GHLGuitarExpert);
        checkTrack(cs.ghlGuitar.hard, ChartViewTrack.GHLGuitarHard);
        checkTrack(cs.ghlGuitar.medium, ChartViewTrack.GHLGuitarMedium);
        checkTrack(cs.ghlGuitar.easy, ChartViewTrack.GHLGuitarEasy);
        return longestTrack;
    }
}
