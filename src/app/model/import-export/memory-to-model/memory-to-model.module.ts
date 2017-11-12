import { NgModule } from '@angular/core';

import { MetadataService } from './common/metadata.service';
import { SyncTrackExporterService } from './common/sync-track-exporter.service';
import { SyncTrackImporterService } from './common/sync-track-importer.service';
import { UnsupportedTrackExporterService }
from './common/unsupported-track-exporter.service';
import { UnsupportedTrackImporterService }
from './common/unsupported-track-importer.service';
import { GenericTrackExporterService }
from './generic/generic-track-exporter.service';
import { GenericTrackImporterService }
from './generic/generic-track-importer.service';
import { GHLTrackExporterService } from './ghl/ghl-track-exporter.service';
import { GHLTrackImporterService } from './ghl/ghl-track-importer.service';
import { GuitarTrackExporterService } from './guitar/guitar-track-exporter.service';
import { GuitarTrackImporterService } from './guitar/guitar-track-importer.service';
import { MidiTimeService } from './util/midi-time.service';
import { MemoryToModelService } from './memory-to-model.service';
import { ModelToMemoryService } from './model-to-memory.service';

@NgModule({
    providers: [
        MetadataService,
        SyncTrackExporterService,
        SyncTrackImporterService,
        UnsupportedTrackImporterService,
        UnsupportedTrackExporterService,
        GenericTrackExporterService,
        GenericTrackImporterService,
        GHLTrackExporterService,
        GHLTrackImporterService,
        GuitarTrackExporterService,
        GuitarTrackImporterService,
        MidiTimeService,
        MemoryToModelService,
        ModelToMemoryService,
    ],
})
export class AppModelMemoryToModelModule {
}
