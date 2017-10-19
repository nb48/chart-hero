import { EventEmitter, Injectable } from '@angular/core';

import { ChartFile } from '../../chart-file/chart-file';
import { ChartStoreGHLImporterService } from '../ghl/chart-store-ghl-importer.service';
import { ChartStoreSyncTrackImporterService }
from '../sync-track/chart-store-sync-track-importer.service';
import { ChartStoreTrackImporterService } from '../track/chart-store-track-importer.service';
import { ChartStore, ChartStoreMetadata, ChartStoreTrack } from '../chart-store';

@Injectable()
export class ChartStoreImporterService {

    constructor(
        private ghlImporter: ChartStoreGHLImporterService,
        private syncTrackImporter: ChartStoreSyncTrackImporterService,
        private trackImporter: ChartStoreTrackImporterService,
    ) {
    }

    import(cf: ChartFile): ChartStore {
        const resolution = this.getResolution(cf);
        const offset = this.getOffset(cf);
        return {
            metadata: cf.metadata as ChartStoreMetadata[],
            syncTrack: this.syncTrackImporter.import(cf.syncTrack, resolution, offset),
            guitar: {
                expert: this.trackImporter.import(cf.guitar.expert),
                hard: this.trackImporter.import(cf.guitar.hard),
                medium: this.trackImporter.import(cf.guitar.medium),
                easy: this.trackImporter.import(cf.guitar.easy),
            },
            bass: {
                expert: this.trackImporter.import(cf.bass.expert),
                hard: this.trackImporter.import(cf.bass.hard),
                medium: this.trackImporter.import(cf.bass.medium),
                easy: this.trackImporter.import(cf.bass.easy),
            },
            drums: {
                expert: this.trackImporter.import(cf.drums.expert),
                hard: this.trackImporter.import(cf.drums.hard),
                medium: this.trackImporter.import(cf.drums.medium),
                easy: this.trackImporter.import(cf.drums.easy),
            },
            ghlGuitar: {
                expert: this.ghlImporter.import
                    (cf.ghlGuitar.expert, cf.syncTrack, resolution, offset),
                hard: this.trackImporter.import(cf.ghlGuitar.hard),
                medium: this.trackImporter.import(cf.ghlGuitar.medium),
                easy: this.trackImporter.import(cf.ghlGuitar.easy),
            },
            events: this.trackImporter.import(cf.events),
            vocals: this.trackImporter.import(cf.vocals),
            venue: this.trackImporter.import(cf.venue),
        };
    }

    private getResolution(cf: ChartFile): number {
        const resolution = cf.metadata.find(m => m.name === 'Resolution');
        return resolution ? parseInt(resolution.value, 10) : 192;        
    }
    
    private getOffset(cf: ChartFile): number {
        const offset = cf.metadata.find(m => m.name === 'Offset');
        return offset ? parseFloat(offset.value) : 0;        
    }
}
