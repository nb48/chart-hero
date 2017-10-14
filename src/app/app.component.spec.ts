import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdButtonModule, MdFormFieldModule, MdInputModule, MdListModule }
    from '@angular/material';
import { BrowserModule, By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppModule } from './app.module';

describe('Component: AppComponent', () => {

    let fixture: ComponentFixture<AppComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                AppModule,
                BrowserModule,
                BrowserAnimationsModule,
                FormsModule,
                MdButtonModule,
                MdFormFieldModule,
                MdInputModule,
                MdListModule,
                ReactiveFormsModule,
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
