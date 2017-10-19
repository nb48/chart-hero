import { EventEmitter, Injectable } from '@angular/core';

import { ChartFile } from '../../chart-file/chart-file';
import { ChartStoreGHLImporterService } from '../ghl/chart-store-ghl-importer.service';
import { ChartStoreSyncTrackImporterService }
from '../sync-track/chart-store-sync-track-importer.service';
import { ChartStore, ChartStoreMetadata, ChartStoreTrack } from '../chart-store';

const emptyTrack = (): ChartStoreTrack => {
    return {
        events: [],
        unsupported: [],
    };
};

@Injectable()
export class ChartStoreImporterService {

    constructor(
        private ghlImporter: ChartStoreGHLImporterService,
        private syncTrackImporter: ChartStoreSyncTrackImporterService,
    ) {
    }

    import(cf: ChartFile): ChartStore {
        const resolution = this.getResolution(cf);
        const offset = this.getOffset(cf);
        return {
            metadata: cf.metadata as ChartStoreMetadata[],
            syncTrack: this.syncTrackImporter.import(cf.syncTrack, resolution, offset),
            guitar: {
                expert: emptyTrack(),
                hard: emptyTrack(),
                medium: emptyTrack(),
                easy: emptyTrack(),
            },
            bass: {
                expert: emptyTrack(),
                hard: emptyTrack(),
                medium: emptyTrack(),
                easy: emptyTrack(),
            },
            drums: {
                expert: emptyTrack(),
                hard: emptyTrack(),
                medium: emptyTrack(),
                easy: emptyTrack(),
            },
            ghlGuitar: {
                expert: this.ghlImporter.import
                    (cf.ghlGuitar.expert, cf.syncTrack, resolution, offset),
                hard: emptyTrack(),
                medium: emptyTrack(),
                easy: emptyTrack(),
            },
            events: emptyTrack(),
            vocals: emptyTrack(),
            venue: emptyTrack(),
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
