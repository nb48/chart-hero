import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule, MatListModule } from '@angular/material';
import { By } from '@angular/platform-browser';

import { AppFileModule } from '../file.module';
import { FileStoreService } from '../store/file-store.service';
import { FileSelectComponent } from './file-select.component';

describe('Component: FileSelectComponent', () => {

    let fixture: ComponentFixture<FileSelectComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                AppFileModule,
            ],
            providers: [
                { provide: FileStoreService, useClass: MockFileStoreService },
            ],
        });
        fixture = TestBed.createComponent(FileSelectComponent);
        fixture.detectChanges();
    });

    it('FileSelect should display audio file name', () => {
        const label = fixture.debugElement.query(By.css('.audio-input label'));
        expect(label.nativeElement.textContent).toEqual('testAudioFile');
    });

    it('FileSelect should display clickable audio file input button', () => {
        const button = fixture.debugElement.query(By.css('.audio-input button'));
        button.nativeElement.click();
    });

    it('FileSelect should display chart file name', () => {
        const label = fixture.debugElement.query(By.css('.chart-input label'));
        expect(label.nativeElement.textContent).toEqual('testChartFile');
    });

    it('FileSelect should display clickable chart file input button', () => {
        const button = fixture.debugElement.query(By.css('.chart-input button'));
        button.nativeElement.click();
    });
});

class MockFileStoreService {

    audioFileName = 'testAudioFile';
    chartFileName = 'testChartFile';
}