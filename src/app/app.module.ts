import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdButtonModule, MdRadioModule, MdListModule, MdSidenavModule } from '@angular/material';

import { AppComponent } from './app.component';
import { AudioStoreService } from './audio-store/audio-store.service';
import { AudioUploadComponent } from './audio-upload/audio-upload.component';
import { ChartEditorComponent } from './chart-editor/chart-editor.component';
import { ChartLoaderService } from './chart-loader/chart-loader.service';
import { ChartPreviewComponent } from './chart-preview/chart-preview.component';
import { ChartStoreService } from './chart-store/chart-store.service';
import { ChartUploadComponent } from './chart-upload/chart-upload.component';
import { MetadataComponent } from './metadata/metadata.component';
import { TapInputComponent } from './tap-input/tap-input.component';
import { ViewBeatComponent } from './view-chart/view-beat/view-beat.component';
import { ViewNoteComponent } from './view-chart/view-note/view-note.component';

@NgModule({
  declarations: [
    AppComponent,
    ChartEditorComponent,
    ChartPreviewComponent,
    ChartUploadComponent,
    AudioUploadComponent,
    MetadataComponent,
    TapInputComponent,
    ViewBeatComponent,
    ViewNoteComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MdButtonModule,
    MdRadioModule,
    MdListModule,
    MdSidenavModule,
    ReactiveFormsModule
  ],
  providers: [
    AudioStoreService,
    ChartLoaderService,
    ChartStoreService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
