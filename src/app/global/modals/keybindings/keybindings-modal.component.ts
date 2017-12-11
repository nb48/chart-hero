import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
    selector: 'app-keybindings-modal',
    templateUrl: './keybindings-modal.component.html',
    styleUrls: ['./keybindings-modal.component.css'],
})
export class KeybindingsModalComponent {

    constructor(private dialogRef: MatDialogRef<KeybindingsModalComponent>) {
    }

    close(): void {
        this.dialogRef.close();
    }
}
