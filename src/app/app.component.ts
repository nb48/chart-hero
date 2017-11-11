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

    constructor(
        private beatService: BeatService,
        private noteService: NoteService,
        private eventService: EventService,
    ) {
        Observable.combineLatest(
            this.beatService.beats,
            this.beatService.zeroPositions,
            this.noteService.notes,
            this.eventService.events,
            (beats, zeroPosition, notes, events) => {
                this.fretboard = {
                    beats, zeroPosition, notes, events,
                };
            },
        ).subscribe(() => {
        });
    }
}
