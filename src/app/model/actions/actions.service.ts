import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { TimeService } from '../../time/time.service';
import { Track, getTrack, isGHLTrack } from '../../track/track';
import { TrackService } from '../../track/track.service';
import { IdGeneratorService } from '../id-generator/id-generator.service';
import { Model, ModelTrackEventType, ModelTrackNote, ModelTrackNoteType } from '../model';
import { ModelService } from '../model.service';

@Injectable()
export class ActionsService {

    private time: number;
    private track: Track;
    private model: Model;

    constructor(
        private timeService: TimeService,
        private trackService: TrackService,
        private idGenerator: IdGeneratorService,
        private modelService: ModelService,
    ) {
        Observable.combineLatest(
            this.timeService.times,
            this.trackService.tracks,
            this.modelService.models,
            (time, track, model) => {
                this.time = time;
                this.track = track;
                this.model = model;
            },
        ).subscribe(() => {
        });
    }

    addNote() {
        const ghl = isGHLTrack(this.track);
        const newNote: ModelTrackNote = {
            id: this.idGenerator.id(),
            event: ghl ? ModelTrackEventType.GHLNote : ModelTrackEventType.GuitarNote,
            time: this.time,
            type: [],
            length: 0,
        };
        const track = getTrack(this.model, this.track);        
        track.events.push(newNote);
        this.modelService.model = this.model;
    }
}
