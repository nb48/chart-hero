import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatSliderModule,
    MatTooltipModule,
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AudioPlayerControlsComponent }
from './audio-player-controls/audio-player-controls.component';
import { ScrollbarComponent } from './scrollbar/scrollbar.component';
import { VolumeControlsComponent } from './volume/volume-controls.component';

import { AudioPlayerService } from './audio-player/audio-player.service';
import { DurationService } from './duration/duration.service';
import { IncrementService } from './increment/increment.service';
import { VolumeService } from './volume/volume.service';
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
        MatSliderModule,
        MatTooltipModule,
        ReactiveFormsModule,
    ],
    exports: [
        AudioPlayerControlsComponent,
        ScrollbarComponent,
        VolumeControlsComponent,
    ],
    declarations: [
        AudioPlayerControlsComponent,
        ScrollbarComponent,
        VolumeControlsComponent,
    ],
    providers: [
        AudioPlayerService,
        DurationService,
        IncrementService,
        TimeService,
        VolumeService,
    ],
})
export class AppTimeModule {
}
