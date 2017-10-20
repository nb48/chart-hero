import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatSelectModule,
    MatTooltipModule,
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AudioPlayerControlsComponent }
from './audio-player-controls/audio-player-controls.component';
import { ChartViewComponent } from './editor/chart-view/chart-view.component';
import { ChartViewBeatComponent } from './editor/chart-view/beat/chart-view-beat.component';
import { ChartViewNoteComponent } from './editor/chart-view/note/chart-view-note.component';
import { ChartViewNoteGHLComponent }
from './editor/chart-view/note/ghl/chart-view-note-ghl.component';
import { ChartViewNoteOpenComponent }
from './editor/chart-view/note/open/chart-view-note-open.component';
import { EditorComponent } from './editor/editor.component';
import { ExporterComponent } from './exporter/exporter.component';
import { FileSelectComponent } from './file-select/file-select.component';
import { ScrollbarComponent } from './editor/scrollbar/scrollbar.component';
import { TrackSelectorComponent } from './track-selector/track-selector.component';

import { AudioPlayerService } from './audio-player/audio-player.service';
import { ChartFileExporterService } from './chart-file/exporter/chart-file-exporter.service';
import { ChartFileImporterService } from './chart-file/importer/chart-file-importer.service';
import { ChartStoreExporterService } from './chart-store/exporter/chart-store-exporter.service';
import { ChartStoreGHLExporterService }
from './chart-store/ghl/chart-store-ghl-exporter.service';
import { ChartStoreGHLImporterService }
from './chart-store/ghl/chart-store-ghl-importer.service';
import { ChartStoreIdGeneratorService }
from './chart-store/id-generator/chart-store-id-generator.service';
import { ChartStoreImporterService } from './chart-store/importer/chart-store-importer.service';
import { ChartStoreMidiTimeService } from './chart-store/midi-time/chart-store-midi-time.service';
import { ChartStoreSyncTrackImporterService }
from './chart-store/sync-track/chart-store-sync-track-importer.service';
import { ChartStoreSyncTrackExporterService }
from './chart-store/sync-track/chart-store-sync-track-exporter.service';
import { ChartStoreTrackExporterService }
from './chart-store/track/chart-store-track-exporter.service';
import { ChartStoreTrackImporterService }
from './chart-store/track/chart-store-track-importer.service';
import { ChartStoreService } from './chart-store/chart-store.service';
import { ChartViewBuilderService } from './chart-view/builder/chart-view-builder.service';
import { ChartViewControllerService } from './chart-view/controller/chart-view-controller.service';
import { ChartViewPreparerService } from './chart-view/preparer/chart-view-preparer.service';
import { ChartViewService } from './chart-view/chart-view.service';
import { FileStoreService } from './file-store/file-store.service';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatListModule,
        MatSelectModule,
        MatTooltipModule,
        ReactiveFormsModule,
    ],
    declarations: [
        AppComponent,
        AudioPlayerControlsComponent,
        ChartViewComponent,
        ChartViewBeatComponent,
        ChartViewNoteComponent,
        ChartViewNoteGHLComponent,
        ChartViewNoteOpenComponent,
        EditorComponent,
        ExporterComponent,
        FileSelectComponent,
        ScrollbarComponent,
        TrackSelectorComponent,
    ],
    providers: [
        AudioPlayerService,
        ChartFileExporterService,
        ChartFileImporterService,
        ChartStoreExporterService,
        ChartStoreGHLExporterService,
        ChartStoreGHLImporterService,
        ChartStoreIdGeneratorService,
        ChartStoreImporterService,
        ChartStoreMidiTimeService,
        ChartStoreSyncTrackExporterService,
        ChartStoreSyncTrackImporterService,
        ChartStoreTrackExporterService,
        ChartStoreTrackImporterService,
        ChartStoreService,
        ChartViewBuilderService,
        ChartViewControllerService,
        ChartViewPreparerService,
        ChartViewService,
        FileStoreService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
