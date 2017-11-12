import { TestBed } from '@angular/core/testing';

import { AppModelFileToMemoryModule } from './file-to-memory.module';
import { MemoryToFileService } from './memory-to-file.service';
import { TEST_FILE, TEST_MEMORY } from './test-file-to-memory';

describe('Service: MemoryToFileService', () => {

    let service: MemoryToFileService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                AppModelFileToMemoryModule,
            ],
        });
        service = TestBed.get(MemoryToFileService);
    });

    it('MemoryToFileService should transform memory to file correctly', () => {
        const file = service.export(TEST_MEMORY);
        expect(file).toEqual(TEST_FILE);
    });
});
