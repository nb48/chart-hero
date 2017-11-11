import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Observable } from 'rxjs';

import { Beat } from '../beat/beat';
import { BeatService } from '../beat/beat.service';
import { Note } from '../note/note';
import { NoteService } from '../note/note.service';
import { Fretboard } from './fretboard';

@Component({
    selector: 'app-fretboard',
    templateUrl: './fretboard.component.html',
    styleUrls: ['./fretboard.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FretboardComponent {
    @Input() fretboard: Fretboard;

    trackBeat(index: number, item: Beat) {
        return item.id;
    }

    trackNote(index: number, item: Note) {
        return item.id;
    }
}
