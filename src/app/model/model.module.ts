import { NgModule } from '@angular/core';

import { AppModelImportExportModule } from './import-export/model-import-export.module';
import { ModelService } from './model.service';

@NgModule({
    imports: [
        AppModelImportExportModule,
    ],
    providers: [
        ModelService,
    ],
})
export class AppModelModule {
}
