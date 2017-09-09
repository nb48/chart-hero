import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FileSelectComponent } from './file-select/file-select.component';

@NgModule({
    imports: [
        BrowserModule,
    ],
    declarations: [
        AppComponent,
        FileSelectComponent,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
