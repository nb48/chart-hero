import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { SelectorService } from '../../controller/selector/selector.service';

enum Action {
    SelectNext,
    SelectPrevious,
}

type Key = string;

export interface Keybinding {
    action: Action;
    key: Key;
}

const defaultKeybindings: Keybinding[] = [{
    action: Action.SelectNext,
    key: 'ArrowUp',
}, {
    action: Action.SelectPrevious,
    key: 'ArrowDown',
}];

@Injectable()
export class KeybindingsService {

    private keybindingsSubject: BehaviorSubject<Keybinding[]>;
    private binds: Map<Key, () => void>;

    constructor(private selectorService: SelectorService) {
        this.keybindingsSubject = new BehaviorSubject<Keybinding[]>(undefined);
        this.updateBinds(defaultKeybindings);
    }

    get keybindings(): Observable<Keybinding[]> {
        return this.keybindingsSubject.asObservable();
    }

    keyDown(event: KeyboardEvent) {
        if (this.binds.has(event.key)) {
            this.binds.get(event.key)();
        }
    }

    updateBinds(keybindings: Keybinding[]): void {
        this.keybindingsSubject.next(keybindings);
        this.binds = new Map<Key, () => void>();
        keybindings.forEach((keybinding) => {
            this.binds.set(keybinding.key, this.getAction(keybinding.action));
        });
    }

    private getAction(action: Action): () => void {
        switch (action) {
        case Action.SelectNext:
            return () => this.selectorService.selectNext();
        case Action.SelectPrevious:
            return () => this.selectorService.selectPrevious();
        }
    }
}
