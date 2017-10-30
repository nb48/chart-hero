import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatTooltipModule,
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AudioPlayerService } from './audio-player/audio-player.service';
import { AudioPlayerControlsComponent }
from './audio-player-controls/audio-player-controls.component';
import { DurationService } from './duration/duration.service';
import { ScrollbarBuilder } from './scrollbar/builder/scrollbar-builder.service';
import { ScrollbarComponent } from './scrollbar/scrollbar.component';
import { TimeService } from './time.service';

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
        ReactiveFormsModule,
    ],
    exports: [
        AudioPlayerControlsComponent,
        ScrollbarComponent,
    ],
    declarations: [
        AudioPlayerControlsComponent,
        ScrollbarComponent,
    ],
    providers: [
        AudioPlayerService,
        DurationService,
        ScrollbarBuilder,
        TimeService,
    ],
})
export class AppTimeModule {
}
