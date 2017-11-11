import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { BeatService } from './fretboard/beat/beat.service';
import { Fretboard } from './fretboard/fretboard/fretboard';
import { NoteService } from './fretboard/note/note.service';
import { ModelImporterService } from './model/import-export/model-importer.service';
import { Track } from './track/track';
import { TrackService } from './track/track.service';

@Component({
    selector: 'app',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css'],
})
export class AppComponent {

    fretboard: Fretboard;

    constructor(
        private beatService: BeatService,
        private noteService: NoteService,
        private modelImporter: ModelImporterService,
        private trackService: TrackService,
    ) {
        Observable.combineLatest(
            this.beatService.beats,
            this.beatService.zeroPositions,
            this.noteService.notes,
            (beats, zeroPosition, notes) => {
                this.fretboard = {
                    beats, zeroPosition, notes,
                };
            },
        ).subscribe(() => {
        });
        this.modelImporter.import('');
        this.trackService.newTrack(Track.GHLGuitarExpert);
    }
}
