import { Injectable } from '@angular/core';

import { SelectorService } from '../../controller/selector/selector.service';

@Injectable()
export class KeybindingsService {

    private binds: Map<string, () => void>;

    constructor(private selectorService: SelectorService) {
        this.binds = new Map<string, () => void>();
        this.binds.set('ArrowUp', () => this.selectorService.selectNext());
        this.binds.set('ArrowDown', () => this.selectorService.selectPrevious());
    }

    keyDown(event: KeyboardEvent) {
        if (this.binds.has(event.key)) {
            this.binds.get(event.key)();
        }
    }
}
