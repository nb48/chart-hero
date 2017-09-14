import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdButtonModule, MdFormFieldModule, MdInputModule, MdListModule }
from '@angular/material';
import { BrowserModule, By } from '@angular/platform-browser';
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
        });
        fixture = TestBed.createComponent(AppComponent);
    });

    it('App should have file select', () => {
        expect(fixture.debugElement.query(By.css('app-file-select'))).toBeTruthy();
    });

    it('App should have audio player controls', () => {
        expect(fixture.debugElement.query(By.css('app-audio-player-controls'))).toBeTruthy();
    });
});
