import { NgModule } from '@angular/core';
import { MatListModule, MatSliderModule, MatTooltipModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BeatComponent } from './beat/beat.component';
import { EventComponent } from './event/event.component';
import { EventLinkComponent } from './event-link/event-link.component';
import { FretboardComponent } from './fretboard/fretboard.component';
import { NoteGHLComponent } from './note/ghl/note-ghl.component';
import { NoteGuitarComponent } from './note/guitar/note-guitar.component';
import { NoteOpenComponent } from './note/open/note-open.component';
import { NoteComponent } from './note/note.component';
import { SpeedControlsComponent } from './speed/speed-controls.component';

import { BeatService } from './beat/beat.service';
import { EventService } from './event/event.service';
import { EventLinkService } from './event-link/event-link.service';
import { NoteService } from './note/note.service';
import { PreparerService } from './preparer/preparer.service';
import { SpeedService } from './speed/speed.service';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatListModule,
        MatSliderModule,
        MatTooltipModule,
    ],
    exports: [
        FretboardComponent,
        SpeedControlsComponent,
    ],
    declarations: [
        BeatComponent,
        EventComponent,
        EventLinkComponent,
        FretboardComponent,
        NoteGHLComponent,
        NoteGuitarComponent,
        NoteOpenComponent,
        NoteComponent,
        SpeedControlsComponent,
    ],
    providers: [
        BeatService,
        EventService,
        EventLinkService,
        NoteService,
        PreparerService,
        SpeedService,
    ],
})
export class AppFretboardModule {
}
