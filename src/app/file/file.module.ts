import { NgModule } from '@angular/core';
import { MatButtonModule, MatListModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FileDownloadComponent } from './download/file-download.component';
import { FileSelectComponent } from './select/file-select.component';
import { FileService } from './file.service';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatListModule,
    ],
    exports: [
        FileDownloadComponent,
        FileSelectComponent,
    ],
    declarations: [
        FileDownloadComponent,
        FileSelectComponent,
    ],
    providers: [
        FileService,
    ],
})
export class AppFileModule {
}
