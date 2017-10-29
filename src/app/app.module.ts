import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatRadioModule,
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
import { ChartViewNoteGuitarComponent }
from './editor/chart-view/note/guitar/chart-view-note-guitar.component';
import { ChartViewNoteOpenComponent }
from './editor/chart-view/note/open/chart-view-note-open.component';
import { ConverterComponent } from './converter/converter.component';
import { EditorComponent } from './editor/editor.component';
import { ExporterComponent } from './exporter/exporter.component';
import { FileSelectComponent } from './file-select/file-select.component';
import { NoteControlsComponent } from './note-controls/note-controls.component';
import { NoteControlsGuitarComponent } from './note-controls/guitar/note-controls-guitar.component';
import { NoteControlsGHLComponent } from './note-controls/ghl/note-controls-ghl.component';
import { ScrollbarComponent } from './editor/scrollbar/scrollbar.component';
import { TrackSelectComponent } from './track-select/track-select.component';

import { AudioPlayerService } from './audio-player/audio-player.service';
import { ChartViewBuilderService } from './chart-view/builder/chart-view-builder.service';
import { ChartViewTimeControllerService }
from './chart-view/time-controller/chart-view-time-controller.service';
import { ChartViewTrackControllerService }
from './chart-view/track-controller/chart-view-track-controller.service';
import { ChartViewNoteControllerService }
from './chart-view/note-controller/chart-view-note-controller.service';
import { ChartViewPreparerService } from './chart-view/preparer/chart-view-preparer.service';
import { ChartViewService } from './chart-view/chart-view.service';
import { FileStoreService } from './file-store/file-store.service';
import { TimeService } from './time/time.service';

import { AppModelModule } from './model/model.module';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatListModule,
        MatRadioModule,
        MatSelectModule,
        MatTooltipModule,
        ReactiveFormsModule,
        AppModelModule,
    ],
    declarations: [
        AppComponent,
        AudioPlayerControlsComponent,
        ChartViewComponent,
        ChartViewBeatComponent,
        ChartViewNoteComponent,
        ChartViewNoteGHLComponent,
        ChartViewNoteGuitarComponent,
        ChartViewNoteOpenComponent,
        ConverterComponent,
        EditorComponent,
        ExporterComponent,
        FileSelectComponent,
        NoteControlsComponent,
        NoteControlsGuitarComponent,
        NoteControlsGHLComponent,
        ScrollbarComponent,
        TrackSelectComponent,
    ],
    providers: [
        AudioPlayerService,
        ChartViewBuilderService,
        ChartViewNoteControllerService,
        ChartViewPreparerService,
        ChartViewTimeControllerService,
        ChartViewTrackControllerService,
        ChartViewService,
        FileStoreService,
        TimeService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
