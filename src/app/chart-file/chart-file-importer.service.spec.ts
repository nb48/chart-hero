import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { ChartFile } from './chart-file';
import { ChartFileImporterService } from './chart-file-importer.service';
import { TEST_FILE, TEST_CHART } from './test-chart-file';

describe('Service: ChartFileImporterService', () => {

    let service: ChartFileImporterService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ChartFileImporterService],
        });
        service = TestBed.get(ChartFileImporterService);
    });

    it('ChartFileImporter should import chart correctly', fakeAsync(() => {
        let chartFile: ChartFile;
        service.chartFile.subscribe((newChartFile: ChartFile) => {
            chartFile = newChartFile;
        });
        service.import(TEST_FILE);
        tick();
        expect(chartFile).toEqual(TEST_CHART);
    }));
});
