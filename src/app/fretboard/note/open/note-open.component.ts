import { Component, Input } from '@angular/core';

import { NoteOpen } from '../note';

@Component({
    selector: '[app-note-open]',
    templateUrl: './note-open.component.html',
})
export class NoteOpenComponent {
    @Input() note: NoteOpen;
    @Input() drawSustain: boolean;
}
