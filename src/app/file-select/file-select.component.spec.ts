import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MdButtonModule, MdListModule } from '@angular/material';
import { By } from '@angular/platform-browser';

import { FileSelectComponent } from './file-select.component';
import { FileStoreService } from '../file-store/file-store.service';

describe('Component: FileSelectComponent', () => {

    let fixture: ComponentFixture<FileSelectComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                MdButtonModule,
                MdListModule,
            ],
            declarations: [
                FileSelectComponent,
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

    it('FileSelect should display clickable file input button', () => {
        const button = fixture.debugElement.query(By.css('.audio-input button'));
        button.nativeElement.click();
    });
});

class MockFileStoreService {

    audioFileName = 'testAudioFile';
}
