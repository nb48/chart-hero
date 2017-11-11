import { Component, Input } from '@angular/core';

import { Note, NoteType } from './note';
import { SelectorService } from '../../controller/selector/selector.service';

@Component({
    selector: '[app-note]',
    templateUrl: './note.component.html',
    styleUrls: ['./note.component.css'],
})
export class NoteComponent {
    @Input() note: Note;

    constructor(private selectorService: SelectorService) {
    }

    select(): void {
        this.selectorService.selectNote(this.note.id);
    }

    get open(): boolean {
        return this.note.type === NoteType.Open;
    }

    get guitar(): boolean {
        return this.note.type === NoteType.Guitar;
    }

    get ghl(): boolean {
        return this.note.type === NoteType.GHL;
    }

    get tooltip(): string {
        return `${this.note.id}, ${Math.floor(this.note.time * 1000) / 1000}`;
    }
}
