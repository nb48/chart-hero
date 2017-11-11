import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';

import { Beat } from '../beat/beat';
import { BeatService } from '../beat/beat.service';
import { Note } from '../note/note';
import { NoteService } from '../note/note.service';

@Component({
    selector: 'app-fretboard',
    templateUrl: './fretboard.component.html',
    styleUrls: ['./fretboard.component.css'],
})
export class FretboardComponent {

    beats: Beat[] = [];
    zeroPosition: number = 0;
    notes: Note[] = [];

    constructor(
        private beatService: BeatService,
        private noteService: NoteService,
    ) {
        this.beatService.beats.subscribe((beats) => {
            this.beats = beats;
        });
        this.beatService.zeroPositions.subscribe((zeroPosition) => {
            this.zeroPosition = zeroPosition;
        });
        this.noteService.notes.subscribe((notes) => {
            this.notes = notes;
        });
    }

    trackBeat(index: number, item: Beat) {
        return item.id;
    }

    trackNote(index: number, item: Note) {
        return item.id;
    }
}
