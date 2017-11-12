import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { AppControllerModule } from './controller/controller.module';
import { AppFileModule } from './file/file.module';
import { AppFretboardModule } from './fretboard/fretboard.module';
import { AppGlobalModule } from './global/global.module';
import { AppModelModule } from './model/model.module';
import { AppTimeModule } from './time/time.module';
import { AppTrackModule } from './track/track.module';

@NgModule({
    imports: [
        AppControllerModule,
        AppFileModule,
        AppFretboardModule,
        AppGlobalModule,
        AppModelModule,
        AppTimeModule,
        AppTrackModule,
    ],
    declarations: [
        AppComponent,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
