import { Injectable } from '@angular/core';

import { SelectedNoteService } from '../note/selected/selected.service';

@Injectable()
export class KeybindingsService {

    private binds: Map<string, () => void>;

    constructor(private selectedNoteService: SelectedNoteService) {
        this.binds = new Map<string, () => void>();
        this.binds.set('ArrowUp', () => this.selectedNoteService.selectNextNote());
        this.binds.set('ArrowDown', () => this.selectedNoteService.selectPreviousNote());
    }

    keyDown(event: KeyboardEvent) {
        if (this.binds.has(event.key)) {
            this.binds.get(event.key)();
        }
    }
}
