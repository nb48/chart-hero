import { NgModule } from '@angular/core';

import { ActionsService } from './actions/actions.service';
import { IdGeneratorService } from './id-generator/id-generator.service';
import { AppModelImportExportModule } from './import-export/model-import-export.module';
import { ModelService } from './model.service';

@NgModule({
    imports: [
        AppModelImportExportModule,
    ],
    providers: [
        ActionsService,
        IdGeneratorService,
        ModelService,
    ],
})
export class AppModelModule {
}
