import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Beat } from '../beat/beat';
import { Event } from '../event/event';
import { Note } from '../note/note';
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

    trackEvent(index: number, item: Event) {
        return item.id;
    }
}
