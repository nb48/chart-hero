import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { EditorComponent } from './editor.component';

import { ChartViewBuilderService } from './chart-view/builder/chart-view-builder.service';
import { ChartViewPreparerService } from './chart-view/preparer/chart-view-preparer.service';
import { ChartViewService } from './chart-view/chart-view.service';

import { AppFretboardModule } from './fretboard/fretboard.module';
import { AppFileModule } from './file/file.module';
import { AppModelModule } from './model/model.module';
import { AppNoteModule } from './note/note.module';
import { AppTimeModule } from './time/time.module';
import { AppTrackModule } from './track/track.module';

@NgModule({
    imports: [
        BrowserModule,
        AppFretboardModule,
        AppFileModule,
        AppModelModule,
        AppNoteModule,
        AppTimeModule,
        AppTrackModule,
    ],
    declarations: [
        AppComponent,
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
