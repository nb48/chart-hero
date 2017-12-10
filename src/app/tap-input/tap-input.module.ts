import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatTooltipModule,
} from '@angular/material';

import { TapDisplayComponent } from './display/tap-display.component';
import { TapInputComponent } from './input/tap-input.component';

import { TapInputService } from './tap-input.service';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatListModule,
        MatTooltipModule,
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
