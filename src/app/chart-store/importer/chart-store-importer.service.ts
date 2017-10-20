import { EventEmitter, Injectable } from '@angular/core';

import { ChartFile, ChartFileMetadata } from '../../chart-file/chart-file';
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
        const metadata = this.importMetadata(cf.metadata);
        const resolution = this.getResolution(metadata);
        const offset = this.getOffset(metadata);
        return {
            metadata,
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

    private getResolution(metadata: ChartStoreMetadata[]): number {
        return parseFloat(metadata.find(m => m.name === 'Resolution').value);         
    }
    
    private getOffset(metadata: ChartStoreMetadata[]): number {
        return parseFloat(metadata.find(m => m.name === 'Offset').value);     
    }

    private importMetadata(metadata: ChartFileMetadata[]): ChartStoreMetadata[] {
        if (!metadata) {
            return [this.defaultResolution(), this.defaultOffset()];
        }
        if (!metadata.find(m => m.name === 'Resolution')) {
            metadata.push(this.defaultResolution());
        }
        if (!metadata.find(m => m.name === 'Offset')) {
            metadata.push(this.defaultOffset());
        }
        return metadata as ChartStoreMetadata[];
    }

    private defaultResolution(): ChartStoreMetadata {
        return {
            name: 'Resolution',
            value: '192',
        };
    }

    private defaultOffset(): ChartStoreMetadata {
        return {
            name: 'Offset',
            value: '0',
        };
    }
}
