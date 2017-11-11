import { NgModule } from '@angular/core';

import { KeybindingsComponent } from './keybindings.component';

import { KeybindingsService } from './keybindings.service';

@NgModule({
    exports: [
        KeybindingsComponent,
    ],
    declarations: [
        KeybindingsComponent,
    ],
    providers: [
        KeybindingsService,
    ],
})
export class AppKeybindingsModule {
}
