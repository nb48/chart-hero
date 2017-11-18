import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { SelectorService } from '../../controller/selector/selector.service';
import { TimeService } from '../../time/time.service';
import { Track, getTrack, isGHLTrack } from '../../track/track';
import { TrackService } from '../../track/track.service';
import { IdGeneratorService } from '../id-generator/id-generator.service';
import {
    Model,
    ModelTrackBPMChange,
    ModelTrackEvent,
    ModelTrackEventType,
    ModelTrackNote,
    ModelTrackNoteType,
} from '../model';
import { ModelService } from '../model.service';

export const roundTime = (time: number): number => {
    return Math.round(time * 1000) / 1000;
};

@Injectable()
export class ActionsService {

    private time: number;
    private track: Track;
    private model: Model;

    constructor(
        private selectorService: SelectorService,
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
            time: roundTime(this.time),
            type: [],
            length: 0,
            forceHopo: false,
        };
        const track = getTrack(this.model, this.track);        
        track.events.push(newNote);
        this.modelService.model = this.model;
        this.selectorService.selectNote(newNote.id);
    }

    addBPMChange() {
        if (this.time === 0) {
            return;
        }
        const newBPMChange: ModelTrackBPMChange = {
            id: this.idGenerator.id(),
            event: ModelTrackEventType.BPMChange,
            time: roundTime(this.time),
            bpm: 120,
        };
        this.model.syncTrack.events.push(newBPMChange);
        this.modelService.model = this.model;
    }

    deleteTrackEvent(id: number): void {
        const track = getTrack(this.model, this.track);
        const index = track.events.findIndex(n => n.id === id);
        track.events.splice(index, 1);
        this.modelService.model = this.model;
    }

    deleteSyncTrackEvent(id: number) {
        const index = this.model.syncTrack.events.findIndex(n => n.id === id);
        this.model.syncTrack.events.splice(index, 1);
        this.modelService.model = this.model;
    }

    trackEventChanged(note: ModelTrackEvent): void {
        const track = getTrack(this.model, this.track);
        const modelNote = track.events.find(n => n.id === note.id);
        Object.keys(note).forEach((key) => {
            modelNote[key] = note[key];
        });
        modelNote.time = roundTime(modelNote.time);
        this.modelService.model = this.model;
    }

    syncTrackEventChanged(event: ModelTrackEvent): void {
        const modelEvent = this.model.syncTrack.events.find(e => e.id === event.id);
        Object.keys(event).forEach((key) => {
            modelEvent[key] = event[key];
        });
        modelEvent.time = roundTime(modelEvent.time);
        this.modelService.model = this.model;
    }
}
