import { Component, Input } from '@angular/core';

import { SelectorService } from '../../controller/selector/selector.service';
import { showTime } from '../../time/audio-player-controls/audio-player-controls.component';
import { Note, NoteType } from './note';

@Component({
    selector: '[app-note]',
    templateUrl: './note.component.html',
    styleUrls: ['./note.component.css'],
})
export class NoteComponent {
    @Input() note: Note;
    @Input() drawSustain: boolean;

    constructor(private selectorService: SelectorService) {
    }

    select(event: any): void {
        this.selectorService.selectNote(this.note.id);
        event.stopPropagation();
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
        return `${this.note.id}, ${showTime(this.note.time)}`;
    }
}
