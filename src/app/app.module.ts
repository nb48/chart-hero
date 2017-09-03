import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MdButtonModule, MdListModule, MdSidenavModule } from '@angular/material';

import { AppComponent } from './app.component';
import { AudioStoreService } from './audio-store/audio-store.service';
import { ChartEditorComponent } from './chart-editor/chart-editor.component';
import { ChartPreviewComponent } from './chart-preview/chart-preview.component';
import { ChartStoreService } from './chart-store/chart-store.service';
import { ConfigStoreService } from './config-store/config-store.service';
import { HomeComponent } from './home/home.component';
import { MetadataComponent } from './metadata/metadata.component';
import { TapInputComponent } from './tap-input/tap-input.component';

@NgModule({
  declarations: [
    AppComponent,
    ChartEditorComponent,
    ChartPreviewComponent,
    HomeComponent,
    MetadataComponent,
    TapInputComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MdButtonModule,
    MdListModule,
    MdSidenavModule
  ],
  providers: [
    AudioStoreService,
    ChartStoreService,
    ConfigStoreService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
