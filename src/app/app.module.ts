import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdButtonModule, MdFormFieldModule, MdInputModule, MdListModule }
from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AudioPlayerControlsComponent }
from './audio-player-controls/audio-player-controls.component';
import { AudioPlayerService } from './audio-player/audio-player.service';
import { ChartBuilderService } from './chart/chart-builder/chart-builder.service';
import { ChartLoaderService } from './chart/chart-loader/chart-loader.service';
import { ChartStoreService } from './chart/chart-store/chart-store.service';
import { FileSelectComponent } from './file-select/file-select.component';
import { FileStoreService } from './file-store/file-store.service';
import { AppComponent } from './app.component';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        MdButtonModule,
        MdFormFieldModule,
        MdInputModule,
        MdListModule,
        ReactiveFormsModule,
    ],
    declarations: [
        AudioPlayerControlsComponent,
        FileSelectComponent,
        AppComponent,
    ],
    providers: [
        AudioPlayerService,
        ChartBuilderService,
        ChartLoaderService,
        ChartStoreService,
        FileStoreService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
