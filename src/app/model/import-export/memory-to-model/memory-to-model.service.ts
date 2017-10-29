import { EventEmitter, Injectable } from '@angular/core';

import { ChartViewTrack } from '../../../chart-view/chart-view-track';

import { Model, ModelMetadata, ModelTrack } from '../../model';
import { Memory, MemoryMetadata } from '../memory';
import { MetadataService } from './common/metadata.service';
import { SyncTrackImporterService } from './common/sync-track-importer.service';
import { UnsupportedTrackImporterService } from './common/unsupported-track-importer.service';
import { GHLTrackImporterService } from './ghl/ghl-track-importer.service';
import { GuitarTrackImporterService } from './guitar/guitar-track-importer.service';

@Injectable()
export class MemoryToModelService {

    constructor(
        private ghlImporter: GHLTrackImporterService,
        private guitarImporter: GuitarTrackImporterService,
        private metadataService: MetadataService,
        private syncTrackImporter: SyncTrackImporterService,
        private unsupportedTrackImporter: UnsupportedTrackImporterService,
    ) {
    }

    import(cf: Memory): Model {
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
            events: this.unsupportedTrackImporter.import(cf.events),
            vocals: this.unsupportedTrackImporter.import(cf.vocals),
            venue: this.unsupportedTrackImporter.import(cf.venue),
        };
    }

    defaultTrack(cs: Model): ChartViewTrack {
        let longestTrack = ChartViewTrack.GuitarExpert;
        let longestCount = 0;
        const checkTrack = (track: ModelTrack, view: ChartViewTrack): void => {
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
