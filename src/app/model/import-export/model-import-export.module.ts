import { NgModule } from '@angular/core';

import { AppModelFileToMemoryModule } from './file-to-memory/file-to-memory.module';
import { AppModelMemoryToModelModule } from './memory-to-model/memory-to-model.module';
import { ModelExporterService } from './model-exporter.service';
import { ModelImporterService } from './model-importer.service';

@NgModule({
    imports: [
        AppModelFileToMemoryModule,
        AppModelMemoryToModelModule,
    ],
    providers: [
        ModelExporterService,
        ModelImporterService,
    ],
})
export class AppModelImportExportModule {
}
