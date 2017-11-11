import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { AppFretboardModule } from './fretboard/fretboard.module';
import { AppFileModule } from './file/file.module';
import { AppModelModule } from './model/model.module';
import { AppNoteModule } from './note/note.module';
import { AppTimeModule } from './time/time.module';
import { AppTrackModule } from './track/track.module';

@NgModule({
    imports: [
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
    bootstrap: [AppComponent],
})
export class AppModule {
}
