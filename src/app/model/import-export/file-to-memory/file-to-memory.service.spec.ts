import { TestBed } from '@angular/core/testing';

import { AppModelFileToMemoryModule } from './file-to-memory.module';
import { FileToMemoryService } from './file-to-memory.service';
import { TEST_FILE, TEST_MEMORY } from './test-file-to-memory';

describe('Service: FileToMemoryService', () => {

    let service: FileToMemoryService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                AppModelFileToMemoryModule,
            ],
        });
        service = TestBed.get(FileToMemoryService);
    });

    it('FileToMemoryService should transform file to memory correctly', () => {
        const memory = service.import(TEST_FILE);
        expect(memory).toEqual(TEST_MEMORY);
    });
});
