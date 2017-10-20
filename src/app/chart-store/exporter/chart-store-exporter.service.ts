import { EventEmitter, Injectable } from '@angular/core';

import { ChartFile } from '../../chart-file/chart-file';
import { ChartStoreGHLExporterService } from '../ghl/chart-store-ghl-exporter.service';
import { ChartStoreGuitarExporterService } from '../guitar/chart-store-guitar-exporter.service';
import { ChartStoreMetadataService } from '../metadata/chart-store-metadata.service';
import { ChartStoreSyncTrackExporterService }
from '../sync-track/chart-store-sync-track-exporter.service';
import { ChartStoreTrackExporterService } from '../track/chart-store-track-exporter.service';
import { ChartStore } from '../chart-store';

@Injectable()
export class ChartStoreExporterService {

    constructor(
        private ghlExporter: ChartStoreGHLExporterService,
        private guitarExporter: ChartStoreGuitarExporterService,
        private metadataService: ChartStoreMetadataService,
        private syncTrackExporter: ChartStoreSyncTrackExporterService,
        private trackExporter: ChartStoreTrackExporterService,
    ) {
    }

    export(cs: ChartStore): ChartFile {
        const resolution = this.metadataService.getResolution(cs.metadata);
        const offset = this.metadataService.getOffset(cs.metadata);
        return {
            metadata: this.metadataService.export(cs.metadata),
            syncTrack: this.syncTrackExporter.export(cs.syncTrack, resolution, offset),
            guitar: {
                expert: this.trackExporter.export(cs.guitar.expert),
                hard: this.trackExporter.export(cs.guitar.hard),
                medium: this.trackExporter.export(cs.guitar.medium),
                easy: this.trackExporter.export(cs.guitar.easy),
            },
            bass: {
                expert: this.trackExporter.export(cs.bass.expert),
                hard: this.trackExporter.export(cs.bass.hard),
                medium: this.trackExporter.export(cs.bass.medium),
                easy: this.trackExporter.export(cs.bass.easy),
            },
            drums: {
                expert: this.trackExporter.export(cs.drums.expert),
                hard: this.trackExporter.export(cs.drums.hard),
                medium: this.trackExporter.export(cs.drums.medium),
                easy: this.trackExporter.export(cs.drums.easy),
            },
            ghlGuitar: {
                expert: this.ghlExporter.export
                    (cs.ghlGuitar.expert, cs.syncTrack, resolution, offset),
                hard: this.ghlExporter.export
                    (cs.ghlGuitar.hard, cs.syncTrack, resolution, offset),
                medium: this.ghlExporter.export
                    (cs.ghlGuitar.medium, cs.syncTrack, resolution, offset),
                easy: this.ghlExporter.export
                    (cs.ghlGuitar.easy, cs.syncTrack, resolution, offset),
            },
            events: this.trackExporter.export(cs.events),
            vocals: this.trackExporter.export(cs.vocals),
            venue: this.trackExporter.export(cs.venue),
        };
    }
}
