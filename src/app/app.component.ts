import { Component } from '@angular/core';
import { combineLatest } from 'rxjs';

import { BeatService } from './fretboard/beat/beat.service';
import { EventService } from './fretboard/event/event.service';
import { EventLinkService } from './fretboard/event-link/event-link.service';
import { Fretboard } from './fretboard/fretboard/fretboard';
import { NoteService } from './fretboard/note/note.service';
import { StorageService } from './global/storage/storage.service';

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
        private eventLinkService: EventLinkService,
        private storageService: StorageService,
    ) {
        this.beatService.zeroPositions.subscribe((zeroPosition) => {
            this.zeroPosition = zeroPosition;
        });
        combineLatest(
            this.beatService.beats,
            this.noteService.notes,
            this.eventService.events,
            this.eventLinkService.eventLinks,
            (beats, notes, events, eventLinks) => {
                return {
                    beats,
                    notes,
                    events,
                    eventLinks,
                    zeroPosition: this.zeroPosition,
                };
            },
        ).subscribe((fretboard) => {
            this.fretboard = fretboard;
        });
    }
}
