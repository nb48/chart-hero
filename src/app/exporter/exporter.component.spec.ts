import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MdButtonModule, MdListModule } from '@angular/material';
import { By } from '@angular/platform-browser';

import { ChartFileExporterService } from '../chart-file/chart-file-exporter.service';
import { ExporterComponent } from './exporter.component';

describe('Component: ExporterComponent', () => {

    let fixture: ComponentFixture<ExporterComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                MdButtonModule,
                MdListModule,
            ],
            declarations: [
                ExporterComponent,
            ],
            providers: [
                { provide: ChartFileExporterService, useClass: MockChartFileExporterService },
            ],
        });
        fixture = TestBed.createComponent(ExporterComponent);
        fixture.detectChanges();
    });

    it('Exporter should display download chart button', () => {
        const button = fixture.debugElement.query(By.css('.exporter button'));
        expect(button.nativeElement.textContent).toEqual('Download Chart');
    });
});

class MockChartFileExporterService {
}
