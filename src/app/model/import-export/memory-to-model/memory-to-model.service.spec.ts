import { TestBed } from '@angular/core/testing';

import { AppModelMemoryToModelModule } from './memory-to-model.module';
import { MemoryToModelService } from './memory-to-model.service';
import { TEST_MEMORY, TEST_MODEL } from './test-memory-to-model';

describe('Service: MemoryToModelService', () => {

    let service: MemoryToModelService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                AppModelMemoryToModelModule,
            ],
        });
        service = TestBed.get(MemoryToModelService);
    });

    it('MemoryToModelService should transform memory into model correctly', () => {
        const model = service.import(TEST_MEMORY);
        expect(model).toEqual(TEST_MODEL);
    });
});
