import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MdButtonModule, MdFormFieldModule, MdInputModule, MdListModule }
    from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AudioPlayerControlsComponent }
    from './audio-player-controls/audio-player-controls.component';
import { AudioPlayerService } from './audio-player/audio-player.service';
import { FileSelectComponent } from './file-select/file-select.component';
import { FileStoreService } from './file-store/file-store.service';
import { AppComponent } from './app.component';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        MdButtonModule,
        MdFormFieldModule,
        MdInputModule,
        MdListModule,
        ReactiveFormsModule,
    ],
    declarations: [
        AudioPlayerControlsComponent,
        FileSelectComponent,
        AppComponent,
    ],
    providers: [
        AudioPlayerService,
        FileStoreService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
