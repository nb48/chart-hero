import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatListModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatTooltipModule,
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { EventControlsComponent } from './event-controls/event-controls.component';
import { NoteControlsGHLComponent } from './note-controls/ghl/note-controls-ghl.component';
import { NoteControlsGuitarComponent } from './note-controls/guitar/note-controls-guitar.component';
import { NoteControlsComponent } from './note-controls/note-controls.component';
import { ParentControlsComponent } from './parent-controls/parent-controls.component';

import { BPMService } from './bpm/bpm.service';
import { LyricService } from './lyric/lyric.service';
import { PracticeSectionService } from './practice-section/practice-section.service';
import { SelectorService } from './selector/selector.service';
import { StepService } from './step/step.service';
import { TimeSignatureService } from './time-signature/time-signature.service';
import { TypeService } from './type/type.service';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatListModule,
        MatRadioModule,
        MatSlideToggleModule,
        MatTooltipModule,
        ReactiveFormsModule,
    ],
    exports: [
        ParentControlsComponent,
    ],
    declarations: [
        EventControlsComponent,
        NoteControlsGHLComponent,
        NoteControlsGuitarComponent,
        NoteControlsComponent,
        ParentControlsComponent,
    ],
    providers: [
        BPMService,
        LyricService,
        PracticeSectionService,
        SelectorService,
        StepService,
        TimeSignatureService,
        TypeService,
    ],
})
export class AppControllerModule {
}
