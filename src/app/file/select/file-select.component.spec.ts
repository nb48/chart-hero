import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

import { IdGeneratorService } from '../../model/id-generator/id-generator.service';
import { ModelImporterService } from '../../model/import-export/model-importer.service';
import { AppFileModule } from '../file.module';
import { FileService } from '../file.service';
import { FileSelectComponent } from './file-select.component';

describe('Component: FileSelectComponent', () => {

    let fixture: ComponentFixture<FileSelectComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                AppFileModule,
            ],
            providers: [
                { provide: FileService, useClass: MockFileService },
                { provide: IdGeneratorService, useClass: MockIdGeneratorService },
                { provide: ModelImporterService, useClass: MockModelImporterService },
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

class MockIdGeneratorService {

    reset = (): void => undefined;
}

class MockModelImporterService {
    
    import = (): void => undefined;
}

class MockFileService {

    audioFileNames = of('testAudioFile');
    chartFileNames = of('testChartFile');
}

