import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { BeatService } from './fretboard/beat/beat.service';
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
    ) {
        Observable.combineLatest(
            this.beatService.beats,
            this.beatService.zeroPositions,
            this.noteService.notes,
            (beats, zeroPosition, notes) => {
                this.fretboard = {
                    beats, zeroPosition, notes,
                };
            },
        ).subscribe(() => {
        });
    }
}
