import { NgModule } from '@angular/core';

import { TapDisplayComponent } from './display/tap-display.component';
import { TapInputComponent } from './input/tap-input.component';

import { TapInputService } from './tap-input.service';

@NgModule({
    imports: [
    ],
    exports: [
        TapDisplayComponent,
        TapInputComponent,
    ],
    declarations: [
        TapDisplayComponent,
        TapInputComponent,
    ],
    providers: [
        TapInputService,
    ],
})
export class AppTapInputModule {
}
