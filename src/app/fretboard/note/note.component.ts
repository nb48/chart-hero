import { Component, Input } from '@angular/core';

import { ChartViewNote, ChartViewNoteType } from '../../chart-view/chart-view';
import { SelectedNoteService } from '../../note/selected/selected.service';

@Component({
    selector: '[app-note]',
    templateUrl: './note.component.html',
    styleUrls: ['./note.component.css'],
})
export class NoteComponent {
    @Input() note: ChartViewNote;

    constructor(private selectedNoteService: SelectedNoteService) {
    }

    select(): void {
        this.selectedNoteService.selectNote(this.note.id);
    }

    get open(): boolean {
        return this.note.type === ChartViewNoteType.Open;
    }

    get guitar(): boolean {
        return this.note.type === ChartViewNoteType.Guitar;
    }

    get ghl(): boolean {
        return this.note.type === ChartViewNoteType.GHL;
    }

    get tooltip(): string {
        return `${this.note.id}, ${Math.floor(this.note.time * 1000) / 1000}`;
    }
}
