import { Beat } from '../beat/beat';
import { Note } from '../note/note';

export interface Fretboard {
    beats: Beat[];
    zeroPosition: number;
    notes: Note[];
}
