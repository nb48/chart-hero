import { Beat } from '../beat/beat';
import { Note } from '../note/note';
import { Event } from '../event/event';
import { EventLink } from '../event-link/event-link';

export interface Fretboard {
    beats: Beat[];
    zeroPosition: number;
    notes: Note[];
    events: Event[];
    eventLinks: EventLink[];
}
