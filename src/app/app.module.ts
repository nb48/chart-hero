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
import { NoteControlsComponent } from './note-controls/note-controls.component';
import { NoteControlsGuitarComponent } from './note-controls/guitar/note-controls-guitar.component';
import { NoteControlsGHLComponent } from './note-controls/ghl/note-controls-ghl.component';
import { TrackSelectComponent } from './track-select/track-select.component';

import { ChartViewBuilderService } from './chart-view/builder/chart-view-builder.service';
import { ChartViewTimeControllerService }
from './chart-view/time-controller/chart-view-time-controller.service';
import { ChartViewTrackControllerService }
from './chart-view/track-controller/chart-view-track-controller.service';
import { ChartViewNoteControllerService }
from './chart-view/note-controller/chart-view-note-controller.service';
import { ChartViewPreparerService } from './chart-view/preparer/chart-view-preparer.service';
import { ChartViewService } from './chart-view/chart-view.service';

import { AppFileModule } from './file/file.module';
import { AppModelModule } from './model/model.module';
import { AppTimeModule } from './time/time.module';

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
        AppFileModule,
        AppModelModule,
        AppTimeModule,
    ],
    declarations: [
        AppComponent,
        ChartViewComponent,
        ChartViewBeatComponent,
        ChartViewNoteComponent,
        ChartViewNoteGHLComponent,
        ChartViewNoteGuitarComponent,
        ChartViewNoteOpenComponent,
        ConverterComponent,
        EditorComponent,
        NoteControlsComponent,
        NoteControlsGuitarComponent,
        NoteControlsGHLComponent,
        TrackSelectComponent,
    ],
    providers: [
        ChartViewBuilderService,
        ChartViewNoteControllerService,
        ChartViewPreparerService,
        ChartViewTimeControllerService,
        ChartViewTrackControllerService,
        ChartViewService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
