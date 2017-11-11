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

import { EventControlsComponent } from './event-controls/event-controls.component';
import { NoteControlsGHLComponent } from './note-controls/ghl/note-controls-ghl.component';
import { NoteControlsGuitarComponent } from './note-controls/guitar/note-controls-guitar.component';
import { NoteControlsComponent } from './note-controls/note-controls.component';
import { ParentControlsComponent } from './parent-controls/parent-controls.component';

import { SelectorService } from './selector/selector.service';
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
        SelectorService,
        TimeService,
        TypeService,
    ],
})
export class AppControllerModule {
}
