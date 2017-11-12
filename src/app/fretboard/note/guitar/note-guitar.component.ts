import { Component, Input } from '@angular/core';

import { NoteGuitar, NoteGuitarColor } from '../note';

@Component({
    selector: '[app-note-guitar]',
    templateUrl: './note-guitar.component.html',
})
export class NoteGuitarComponent {
    @Input() note: NoteGuitar;

    get color(): string {
        switch (this.note.color) {
        case NoteGuitarColor.Green:
            return 'green';
        case NoteGuitarColor.Red:
            return 'red';
        case NoteGuitarColor.Yellow:
            return 'yellow';
        case NoteGuitarColor.Blue:
            return 'blue';
        case NoteGuitarColor.Orange:
            return 'orange';
        }
    }
}
