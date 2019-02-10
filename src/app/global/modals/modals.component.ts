import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';

import { KeybindingsModalComponent } from './keybindings/keybindings-modal.component';

@Component({
    selector: 'app-modals',
    templateUrl: './modals.component.html',
    styleUrls: ['./modals.component.css'],
})
export class ModalsComponent {

    constructor(private dialog: MatDialog) {
    }

    keybindings(): void {
        this.dialog.open(KeybindingsModalComponent);
    }

    metadata(): void {
    }
}
