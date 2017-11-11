import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { AppFileModule } from './file/file.module';
import { AppFretboardModule } from './fretboard/fretboard.module';
import { AppKeybindingsModule } from './keybindings/keybindings.module';
import { AppModelModule } from './model/model.module';
import { AppNoteModule } from './note/note.module';
import { AppTimeModule } from './time/time.module';
import { AppTrackModule } from './track/track.module';

@NgModule({
    imports: [
        AppFileModule,
        AppFretboardModule,
        AppKeybindingsModule,
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
