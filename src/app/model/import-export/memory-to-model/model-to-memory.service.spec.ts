import { TestBed } from '@angular/core/testing';

import { AppModelMemoryToModelModule } from './memory-to-model.module';
import { ModelToMemoryService } from './model-to-memory.service';
import { TEST_MEMORY, TEST_MODEL } from './test-memory-to-model';

describe('Service: ModelToMemoryService', () => {

    let service: ModelToMemoryService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                AppModelMemoryToModelModule,
            ],
        });
        service = TestBed.get(ModelToMemoryService);
    });

    it('ModelToMemoryService should transform model into memory correctly', () => {
        const memory = service.export(TEST_MODEL);
        expect(memory).toEqual(TEST_MEMORY);
    });
});
