import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatTooltipModule, MatSelectModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ConverterComponent } from './converter/converter.component';
import { TrackSelectorComponent } from './selector/selector.component';

import { TrackService } from './track.service';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        MatButtonModule,
        MatTooltipModule,
        MatSelectModule,
    ],
    exports: [
        ConverterComponent,
        TrackSelectorComponent,
    ],
    declarations: [
        ConverterComponent,
        TrackSelectorComponent,
    ],
    providers: [
        TrackService,
    ],
})
export class AppTrackModule {
}
