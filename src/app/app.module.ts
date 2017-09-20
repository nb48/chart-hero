import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdButtonModule, MdFormFieldModule, MdInputModule, MdListModule }
from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AudioPlayerControlsComponent }
from './audio-player-controls/audio-player-controls.component';
import { AudioPlayerService } from './audio-player/audio-player.service';
import { ChartDisplayComponent } from './chart-display/chart-display.component';
import { ChartDisplayBeatComponent } from
    './chart-display/chart-display-beat/chart-display-beat.component';
import { ChartDisplayNoteComponent } from
    './chart-display/chart-display-note/chart-display-note.component';
import { ChartExporterService } from './chart/chart-exporter/chart-exporter.service';
import { ChartImporterService } from './chart/chart-importer/chart-importer.service';
import { ChartStoreService } from './chart/chart-store/chart-store.service';
import { ExporterComponent } from './exporter/exporter.component';
import { FileSelectComponent } from './file-select/file-select.component';
import { FileStoreService } from './file-store/file-store.service';
import { MidiTimeConverterService } from './chart/midi-time-converter/midi-time-converter.service';
import { AppComponent } from './app.component';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        MdButtonModule,
        MdFormFieldModule,
        MdInputModule,
        MdListModule,
        ReactiveFormsModule,
    ],
    declarations: [
        AudioPlayerControlsComponent,
        ChartDisplayComponent,
        ChartDisplayBeatComponent,
        ChartDisplayNoteComponent,
        ExporterComponent,
        FileSelectComponent,
        AppComponent,
    ],
    providers: [
        AudioPlayerService,
        ChartExporterService,
        ChartImporterService,
        ChartStoreService,
        FileStoreService,
        MidiTimeConverterService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
