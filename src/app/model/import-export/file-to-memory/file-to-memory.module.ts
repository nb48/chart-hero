import { NgModule } from '@angular/core';

import { FileToMemoryService } from './file-to-memory.service';
import { MemoryToFileService } from './memory-to-file.service';

@NgModule({
    providers: [
        FileToMemoryService,
        MemoryToFileService,
    ],
})
export class AppModelFileToMemoryModule {
}
