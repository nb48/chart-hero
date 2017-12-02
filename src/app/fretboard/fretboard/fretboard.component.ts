import { SelectorService } from './../../controller/selector/selector.service';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Beat } from '../beat/beat';
import { Event } from '../event/event';
import { EventLink } from '../event-link/event-link';
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

    constructor(private selectorService: SelectorService) {
    }

    clearSelection(): void {
        this.selectorService.clearSelection();
    }

    trackBeat(index: number, item: Beat) {
        return item.id;
    }

    trackNoteSustain(index: number, item: Note) {
        return -item.id;
    }

    trackNote(index: number, item: Note) {
        return item.id;
    }

    trackEvent(index: number, item: Event) {
        return item.id;
    }

    trackEventLink(index: number, item: EventLink) {
        return item.id;
    }
}
