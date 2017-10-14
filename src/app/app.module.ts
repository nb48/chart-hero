import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdButtonModule, MdFormFieldModule, MdInputModule, MdListModule }
from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AudioPlayerControlsComponent }
from './audio-player-controls/audio-player-controls.component';
import { ExporterComponent } from './exporter/exporter.component';
import { FileSelectComponent } from './file-select/file-select.component';
import { AppComponent } from './app.component';

import { AudioPlayerService } from './audio-player/audio-player.service';
import { ChartFileExporterService } from './chart-file/chart-file-exporter.service';
import { ChartFileImporterService } from './chart-file/chart-file-importer.service';
import { ChartStoreGHLExporterService } from './chart-store/chart-store-ghl-exporter.service';
import { ChartStoreGHLImporterService } from './chart-store/chart-store-ghl-importer.service';
import { ChartStoreMidiTimeService } from './chart-store/chart-store-midi-time.service';
import { ChartStoreService } from './chart-store/chart-store.service';
import { FileStoreService } from './file-store/file-store.service';

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
        ExporterComponent,
        FileSelectComponent,
        AppComponent,
    ],
    providers: [
        AudioPlayerService,
        ChartFileExporterService,
        ChartFileImporterService,
        ChartStoreGHLExporterService,
        ChartStoreGHLImporterService,
        ChartStoreMidiTimeService,
        ChartStoreService,
        FileStoreService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
