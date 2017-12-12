import { Component, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Subscription } from 'rxjs';

import { KeybindingsService, Action, Key, Keybinding } from '../../keybindings/keybindings.service';

@Component({
    selector: 'app-keybindings-modal',
    templateUrl: './keybindings-modal.component.html',
    styleUrls: ['./keybindings-modal.component.css'],
})
export class KeybindingsModalComponent implements OnDestroy {

    keybindings: Keybinding[];
    subscription: Subscription;
    currentAction: Action;

    constructor(
        private dialogRef: MatDialogRef<KeybindingsModalComponent>,
        private keybindingsService: KeybindingsService,
    ) {
        this.subscription = this.keybindingsService.keybindings.subscribe((keybindings) => {
            this.keybindings = keybindings;
        });
        this.keybindingsService.activateModal();
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
        this.keybindingsService.deactivateModal();
    }

    get message(): string {
        if (this.currentAction === undefined) {
            return 'Click on a keybind to change it';
        }
        return 'Enter the new keybind';
    }

    keyPress(e: KeyboardEvent): void {
        e.stopPropagation();
        if (this.currentAction === undefined) {
            return;
        }
        if (e.key !== 'Escape') {
            this.keybindingsService.updateBind(this.currentAction, e.key);            
        }
        this.currentAction = undefined;
    }

    changeBind(action: Action): void {
        if (this.currentAction !== undefined) {
            this.currentAction = undefined;
            return;
        }
        this.currentAction = action;
    }

    reset(): void {
        this.keybindingsService.reset();
    }

    close(): void {
        this.dialogRef.close();
    }

    captureScroll(e: Event): void {
        e.stopPropagation();
    }
}
