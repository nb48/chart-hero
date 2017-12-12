import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { KeybindingsActionsService } from './keybindings-actions.service';

export enum Action {
    SelectNext,
    SelectPrevious,
    AudioPlayOrPause,
    AudioStop,
    AudioRepeat,
    AddNote,
    AddBPMChange,
    AddTSChange,
    AddPracticeSection,
    AddSoloToggle,
    AddStarPowerToggle,
    ControlToggleNote1,
    ControlToggleNote2,
    ControlToggleNote3,
    ControlToggleNote4,
    ControlToggleNote5,
    ControlToggleNote6,
    ControlSnapForwards,
    ControlMoveForwards,
    ControlMoveBackwards,
    ControlSnapBackwards,
    ControlIncreaseLength,
    ControlDecreaseLength,
    ControlToggleHOPO,
    ControlToggleTap,
    ControlDelete,
    TapInputSelectAll,
    TapInputDeselectAll,
    TapInputCreateNotes,
    TapInputDeleteTimes,
}

export type Key = string;

export interface Keybinding {
    action: Action;
    key: Key;
    label: string;
}

const defaultKeybindings = () => [{
    action: Action.SelectNext,
    key: 'ArrowUp',
    label: 'Select next note',
}, {
    action: Action.SelectPrevious,
    key: 'ArrowDown',
    label: 'Select previous note',
}, {
    action: Action.AudioPlayOrPause,
    key: 'z',
    label: 'Play (and pause) audio',
}, {
    action: Action.AudioStop,
    key: 'x',
    label: 'Stop audio',
}, {
    action: Action.AudioRepeat,
    key: 'c',
    label: 'Repeat audio',
}, {
    action: Action.AddNote,
    key: 'a',
    label: 'Add note',
}, {
    action: Action.AddBPMChange,
    key: 's',
    label: 'Add BPM change',
}, {
    action: Action.AddTSChange,
    key: 'd',
    label: 'Add time signature change',
}, {
    action: Action.AddPracticeSection,
    key: 'f',
    label: 'Add practice section',
}, {
    action: Action.AddSoloToggle,
    key: 'g',
    label: 'Add solo toggle',
}, {
    action: Action.AddStarPowerToggle,
    key: 'h',
    label: 'Add star power toggle',
}, {
    action: Action.ControlToggleNote1,
    key: '1',
    label: 'Toggle Green / Black1',
}, {
    action: Action.ControlToggleNote2,
    key: '2',
    label: 'Toggle Red / Black2',
}, {
    action: Action.ControlToggleNote3,
    key: '3',
    label: 'Toggle Yellow / Black3',
}, {
    action: Action.ControlToggleNote4,
    key: '4',
    label: 'Toggle Blue / White1',
}, {
    action: Action.ControlToggleNote5,
    key: '5',
    label: 'Toggle Orange / White2',
}, {
    action: Action.ControlToggleNote6,
    key: '6',
    label: 'Toggle White3',
}, {
    action: Action.ControlSnapForwards,
    key: 'q',
    label: 'Snap note forwards',
}, {
    action: Action.ControlMoveForwards,
    key: 'w',
    label: 'Move note forwards',
}, {
    action: Action.ControlMoveBackwards,
    key: 'e',
    label: 'Move note backwards',
}, {
    action: Action.ControlSnapBackwards,
    key: 'r',
    label: 'Snap note backwards',
}, {
    action: Action.ControlIncreaseLength,
    key: 't',
    label: 'Increase note length',
}, {
    action: Action.ControlDecreaseLength,
    key: 'y',
    label: 'Decrease note length',
}, {
    action: Action.ControlToggleHOPO,
    key: '7',
    label: 'Toggle HOPO',
}, {
    action: Action.ControlToggleTap,
    key: 'u',
    label: 'Toggle Tap',
}, {
    action: Action.ControlDelete,
    key: 'Delete',
    label: 'Delete note / event',
}, {
    action: Action.TapInputSelectAll,
    key: 'v',
    label: 'Select all tap input times',
}, {
    action: Action.TapInputDeselectAll,
    key: 'b',
    label: 'Deselect all tap input times',
}, {
    action: Action.TapInputCreateNotes,
    key: 'n',
    label: 'Create notes from tap input times',
}, {
    action: Action.TapInputDeleteTimes,
    key: 'm',
    label: 'Delete all tap input times',
}];

@Injectable()
export class KeybindingsService {

    private keybindingsSubject: BehaviorSubject<Keybinding[]>;
    private binds: Map<Key, () => void>;
    private modalActive: boolean;

    constructor(private actionsService: KeybindingsActionsService) {
        this.keybindingsSubject = new BehaviorSubject<Keybinding[]>(undefined);
        this.reset();
    }

    get keybindings(): Observable<Keybinding[]> {
        return this.keybindingsSubject.asObservable();
    }

    reset(): void {
        this.updateBinds(defaultKeybindings());
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
                this.binds.set(keybinding.key, this.actionsService.getAction(keybinding.action));
            }
        });
    }
}
