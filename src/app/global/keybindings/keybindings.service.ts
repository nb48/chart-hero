import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { SelectorService } from '../../controller/selector/selector.service';

export enum Action {
    SelectNext,
    SelectPrevious,
}

export type Key = string;

export interface Keybinding {
    action: Action;
    key: Key;
    label: string;
}

const defaultKeybindings = [{
    action: Action.SelectNext,
    key: 'ArrowUp',
    label: 'Select next note',
}, {
    action: Action.SelectPrevious,
    key: 'ArrowDown',
    label: 'Select previous note',
}];

@Injectable()
export class KeybindingsService {

    private keybindingsSubject: BehaviorSubject<Keybinding[]>;
    private binds: Map<Key, () => void>;
    private modalActive: boolean;

    constructor(private selectorService: SelectorService) {
        this.keybindingsSubject = new BehaviorSubject<Keybinding[]>(undefined);
        this.updateBinds(defaultKeybindings);
    }

    get keybindings(): Observable<Keybinding[]> {
        return this.keybindingsSubject.asObservable();
    }

    activateModal(): void {
        this.modalActive = true;
    }

    deactivateModal(): void {
        this.modalActive = false;
    }

    keyDown(event: KeyboardEvent) {
        if (this.modalActive) {
            return;
        }
        if (this.binds.has(event.key)) {
            this.binds.get(event.key)();
        }
    }

    updateBind(action: Action, key: Key): void {
        const currentKeybindings = this.keybindingsSubject.value;
        const actionToBindIndex = currentKeybindings.findIndex(k => k.action === action);
        const actionToClearIndex = currentKeybindings.findIndex(k => k.key === key);
        if (actionToClearIndex !== -1) {
            currentKeybindings[actionToClearIndex].key = null;
        }
        if (actionToBindIndex !== -1) {
            currentKeybindings[actionToBindIndex].key = key;
        }
        this.updateBinds(currentKeybindings);
    }

    private updateBinds(keybindings: Keybinding[]): void {
        this.keybindingsSubject.next(keybindings);
        this.binds = new Map<Key, () => void>();
        keybindings.forEach((keybinding) => {
            if (keybinding.key !== null) {
                this.binds.set(keybinding.key, this.getAction(keybinding.action));                
            }
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
