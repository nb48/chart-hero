import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MdButtonModule, MdListModule } from '@angular/material';
import { By } from '@angular/platform-browser';

import { ChartExporterService } from '../chart/chart-exporter/chart-exporter.service';
import { ExporterComponent } from './exporter.component';

describe('Component: FileSelectComponent', () => {

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
                { provide: ChartExporterService, useClass: MockChartExporterService },
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

class MockChartExporterService {
}
