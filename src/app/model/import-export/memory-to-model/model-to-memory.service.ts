import { EventEmitter, Injectable } from '@angular/core';

import { Model } from '../../model';
import { Memory } from '../memory';
import { MetadataService } from './common/metadata.service';
import { SyncTrackExporterService } from './common/sync-track-exporter.service';
import { UnsupportedTrackExporterService } from './common/unsupported-track-exporter.service';
import { GHLTrackExporterService } from './ghl/ghl-track-exporter.service';
import { GuitarTrackExporterService } from './guitar/guitar-track-exporter.service';

@Injectable()
export class ModelToMemoryService {

    constructor(
        private ghlExporter: GHLTrackExporterService,
        private guitarExporter: GuitarTrackExporterService,
        private metadataService: MetadataService,
        private syncTrackExporter: SyncTrackExporterService,
        private trackExporter: UnsupportedTrackExporterService,
    ) {
    }

    export(cs: Model): Memory {
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
