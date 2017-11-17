import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { BeatService } from './fretboard/beat/beat.service';
import { EventService } from './fretboard/event/event.service';
import { Fretboard } from './fretboard/fretboard/fretboard';
import { NoteService } from './fretboard/note/note.service';

@Component({
    selector: 'app',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css'],
})
export class AppComponent {

    fretboard: Fretboard;
    zeroPosition: number;

    constructor(
        private beatService: BeatService,
        private noteService: NoteService,
        private eventService: EventService,
    ) {
        this.beatService.zeroPositions.subscribe((zeroPosition) => {
            this.zeroPosition = zeroPosition;
        });
        Observable.zip(
            this.beatService.beats,
            this.noteService.notes,
            this.eventService.events,
            (beats, notes, events) => {
                return {
                    beats,
                    notes,
                    events,
                    zeroPosition: this.zeroPosition,
                };
            },
        ).subscribe((fretboard) => {
            this.fretboard = fretboard;
        });
    }
}
