import { Component, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Subscription } from 'rxjs';

import { KeybindingsService, Keybinding } from '../../keybindings/keybindings.service';

@Component({
    selector: 'app-keybindings-modal',
    templateUrl: './keybindings-modal.component.html',
    styleUrls: ['./keybindings-modal.component.css'],
})
export class KeybindingsModalComponent implements OnDestroy {

    keybindings: Keybinding[];
    subscription: Subscription;

    constructor(
        private dialogRef: MatDialogRef<KeybindingsModalComponent>,
        private keybindingsService: KeybindingsService,
    ) {
        this.subscription = this.keybindingsService.keybindings.subscribe((keybindings) => {
            this.keybindings = keybindings;
        });
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    close(): void {
        this.dialogRef.close();
    }
}
