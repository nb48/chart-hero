import { NgModule } from '@angular/core';
import { MatButtonModule, MatListModule, MatTooltipModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ActionsComponent } from './actions/actions.component';
import { KeybindingsComponent } from './keybindings/keybindings.component';

import { KeybindingsService } from './keybindings/keybindings.service';
import { StorageService } from './storage/storage.service';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatListModule,
        MatTooltipModule,
    ],
    exports: [
        ActionsComponent,
        KeybindingsComponent,
    ],
    declarations: [
        ActionsComponent,
        KeybindingsComponent,
    ],
    providers: [
        KeybindingsService,
        StorageService,
    ],
})
export class AppGlobalModule {
}
