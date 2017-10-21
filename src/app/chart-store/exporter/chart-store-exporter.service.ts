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
                expert: this.guitarExporter.export
                    (cs.guitar.expert, cs.syncTrack, resolution, offset),
                hard: this.guitarExporter.export
                    (cs.guitar.hard, cs.syncTrack, resolution, offset),
                medium: this.guitarExporter.export
                    (cs.guitar.medium, cs.syncTrack, resolution, offset),
                easy: this.guitarExporter.export
                    (cs.guitar.easy, cs.syncTrack, resolution, offset),
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
