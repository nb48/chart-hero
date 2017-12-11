import { NgModule } from '@angular/core';
import {
    MatButtonModule,
    MatDialogModule,
    MatListModule,
    MatTooltipModule,
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ActionsComponent } from './actions/actions.component';
import { KeybindingsComponent } from './keybindings/keybindings.component';
import { KeybindingsModalComponent } from './modals/keybindings/keybindings-modal.component';
import { ModalsComponent } from './modals/modals.component';

import { KeybindingsService } from './keybindings/keybindings.service';
import { StorageService } from './storage/storage.service';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatListModule,
        MatTooltipModule,
        MatDialogModule,
    ],
    exports: [
        ActionsComponent,
        KeybindingsComponent,
        ModalsComponent,
    ],
    declarations: [
        ActionsComponent,
        KeybindingsComponent,
        KeybindingsModalComponent,
        ModalsComponent,
    ],
    providers: [
        KeybindingsService,
        StorageService,
    ],
    entryComponents: [
        KeybindingsModalComponent,
    ],
})
export class AppGlobalModule {
}
