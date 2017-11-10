import { NgModule } from '@angular/core';
import {
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
import { EditorComponent } from './editor/editor.component';

import { ChartViewBuilderService } from './chart-view/builder/chart-view-builder.service';
import { ChartViewPreparerService } from './chart-view/preparer/chart-view-preparer.service';
import { ChartViewService } from './chart-view/chart-view.service';

import { AppFileModule } from './file/file.module';
import { AppModelModule } from './model/model.module';
import { AppNoteModule } from './note/note.module';
import { AppTimeModule } from './time/time.module';
import { AppTrackModule } from './track/track.module';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatTooltipModule,
        AppFileModule,
        AppModelModule,
        AppNoteModule,
        AppTimeModule,
        AppTrackModule,
    ],
    declarations: [
        AppComponent,
        ChartViewComponent,
        ChartViewBeatComponent,
        ChartViewNoteComponent,
        ChartViewNoteGHLComponent,
        ChartViewNoteGuitarComponent,
        ChartViewNoteOpenComponent,
        EditorComponent,
    ],
    providers: [
        ChartViewBuilderService,
        ChartViewPreparerService,
        ChartViewService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
