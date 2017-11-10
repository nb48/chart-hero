import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
    MatButtonModule,
    MatInputModule,
    MatListModule,
    MatRadioModule,
    MatTooltipModule,
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NoteControlsGHLComponent } from './note-controls/ghl/note-controls-ghl.component';
import { NoteControlsGuitarComponent } from './note-controls/guitar/note-controls-guitar.component';
import { NoteControlsComponent } from './note-controls/note-controls.component';

import { SelectedService } from './selected/selected.service';
import { TimeService } from './time/time.service';
import { TypeService } from './type/type.service';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        MatButtonModule,
        MatInputModule,
        MatListModule,
        MatRadioModule,
        MatTooltipModule,
    ],
    exports: [
        NoteControlsComponent,
    ],
    declarations: [
        NoteControlsGHLComponent,
        NoteControlsGuitarComponent,
        NoteControlsComponent,
    ],
    providers: [
        SelectedService,
        TimeService,
        TypeService,
    ],
})
export class AppNoteModule {
}
