import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdButtonModule, MdFormFieldModule, MdInputModule, MdListModule }
from '@angular/material';
import { BrowserModule, By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AudioPlayerControlsComponent }
from './audio-player-controls/audio-player-controls.component';
import { AudioPlayerService } from './audio-player/audio-player.service';
import { ChartDisplayComponent } from './chart-display/chart-display.component';
import { ChartExporterService } from './chart/chart-exporter/chart-exporter.service';
import { ChartImporterService } from './chart/chart-importer/chart-importer.service';
import { ChartStoreService } from './chart/chart-store/chart-store.service';
import { MidiTimeConverterService } from './chart/midi-time-converter/midi-time-converter.service';
import { ExporterComponent } from './exporter/exporter.component';
import { FileSelectComponent } from './file-select/file-select.component';
import { FileStoreService } from './file-store/file-store.service';
import { AppComponent } from './app.component';

describe('Component: AppComponent', () => {

    let fixture: ComponentFixture<AppComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
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
                ChartDisplayComponent,
                ExporterComponent,
                FileSelectComponent,
                AppComponent,
            ],
            providers: [
                AudioPlayerService,
                ChartExporterService,
                ChartImporterService,
                ChartStoreService,
                FileStoreService,
                MidiTimeConverterService,
            ],
        });
        fixture = TestBed.createComponent(AppComponent);
    });

    it('App should have file select', () => {
        expect(fixture.debugElement.query(By.css('app-file-select'))).toBeTruthy();
    });

    it('App should have audio player controls', () => {
        expect(fixture.debugElement.query(By.css('app-audio-player-controls'))).toBeTruthy();
    });

    it('App should have exporter', () => {
        expect(fixture.debugElement.query(By.css('app-exporter'))).toBeTruthy();
    });
});
