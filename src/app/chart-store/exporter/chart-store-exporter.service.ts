import { EventEmitter, Injectable } from '@angular/core';

import { ChartFile, ChartFileMetadata } from '../../chart-file/chart-file';
import { ChartStoreGHLExporterService } from '../ghl/chart-store-ghl-exporter.service';
import { ChartStoreSyncTrackExporterService }
from '../sync-track/chart-store-sync-track-exporter.service';
import { ChartStore } from '../chart-store';

@Injectable()
export class ChartStoreExporterService {

    constructor(
        private ghlExporter: ChartStoreGHLExporterService,
        private syncTrackExporter: ChartStoreSyncTrackExporterService,
    ) {
    }

    export(cs: ChartStore): ChartFile {
        const resolution = this.getResolution(cs);
        const offset = this.getOffset(cs);
        return {
            metadata: cs.metadata as ChartFileMetadata[],
            syncTrack: this.syncTrackExporter.export(cs.syncTrack, resolution, offset),
            guitar: {
                expert: null,
                hard: null,
                medium: null,
                easy: null,
            },
            bass: {
                expert: null,
                hard: null,
                medium: null,
                easy: null,
            },
            drums: {
                expert: null,
                hard: null,
                medium: null,
                easy: null,
            },
            ghlGuitar: {
                expert: this.ghlExporter.export
                    (cs.ghlGuitar.expert, cs.syncTrack, resolution, offset),
                hard: null,
                medium: null,
                easy: null,
            },
            events: null,
            vocals: null,
            venue: null,
        };
    }

    private getResolution(cs: ChartStore): number {
        const resolution = cs.metadata.find(m => m.name === 'Resolution');
        return resolution ? parseInt(resolution.value, 10) : 192;        
    }
    
    private getOffset(cs: ChartStore): number {
        const offset = cs.metadata.find(m => m.name === 'Offset');
        return offset ? parseFloat(offset.value) : 0;        
    }
}
