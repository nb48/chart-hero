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
        const dialogRef = this.dialog.open(KeybindingsModalComponent, {
            width: '250px',
        });
        dialogRef.afterClosed().subscribe(() => {
            console.log('Keybindings dialog closed');
        });
    }

    metadata(): void {
        console.log('Metadata unimplemented');
    }
}
