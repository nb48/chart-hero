import { NgModule } from '@angular/core';

import { KeybindingsComponent } from './keybindings/keybindings.component';

import { KeybindingsService } from './keybindings/keybindings.service';

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
export class AppGlobalModule {
}
