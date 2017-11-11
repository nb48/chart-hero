import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { SelectedNoteService } from '../../note/selected/selected.service';
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
        private selectedNoteService: SelectedNoteService,
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
        this.selectedNoteService.selectNote(newNote.id);
    }

    noteChanged(note: ModelTrackNote): void {
        const track = getTrack(this.model, this.track);
        const modelNote = track.events.find(n => n.id === note.id);
        Object.keys(note).forEach((key) => {
            modelNote[key] = note[key];
        });
        this.modelService.model = this.model;
    }

    deleteNote(id: number): void {
        const track = getTrack(this.model, this.track);
        const index = track.events.findIndex(n => n.id === id);
        track.events.splice(index, 1);
        this.modelService.model = this.model;
    }
}
