import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatFormFieldModule, MatInputModule, MatListModule, MatTooltipModule }
from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AudioPlayerControlsComponent }
from './audio-player-controls/audio-player-controls.component';
import { ChartViewComponent } from './editor/chart-view/chart-view.component';
import { ChartViewBeatComponent }
from './editor/chart-view/chart-view-beat/chart-view-beat.component';
import { ChartViewNoteComponent }
from './editor/chart-view/chart-view-note/chart-view-note.component';
import { ChartViewNoteGHLComponent }
from './editor/chart-view/chart-view-note/chart-view-note-ghl/chart-view-note-ghl.component';
import { ChartViewNoteOpenComponent }
from './editor/chart-view/chart-view-note/chart-view-note-open/chart-view-note-open.component';
import { EditorComponent } from './editor/editor.component';
import { ExporterComponent } from './exporter/exporter.component';
import { FileSelectComponent } from './file-select/file-select.component';
import { ScrollbarComponent } from './editor/scrollbar/scrollbar.component';

import { AudioPlayerService } from './audio-player/audio-player.service';
import { ChartFileExporterService } from './chart-file/exporter/chart-file-exporter.service';
import { ChartFileImporterService } from './chart-file/importer/chart-file-importer.service';
import { ChartStoreGHLExporterService } from './chart-store/chart-store-ghl-exporter.service';
import { ChartStoreGHLImporterService } from './chart-store/chart-store-ghl-importer.service';
import { ChartStoreMidiTimeService } from './chart-store/chart-store-midi-time.service';
import { ChartStoreService } from './chart-store/chart-store.service';
import { ChartStoreViewBuilderService } from './chart-store/chart-store-view-builder.service';
import { ChartViewBuilderService } from './chart-view/chart-view-builder.service';
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
    ],
    providers: [
        AudioPlayerService,
        ChartFileExporterService,
        ChartFileImporterService,
        ChartStoreGHLExporterService,
        ChartStoreGHLImporterService,
        ChartStoreMidiTimeService,
        ChartStoreService,
        ChartStoreViewBuilderService,
        ChartViewBuilderService,
        ChartViewService,
        FileStoreService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
