import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { PreparerService } from './renderer/preparer/preparer.service';
import { RendererService } from './renderer/renderer.service';

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
    ],
    providers: [
        RendererService,
        PreparerService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
