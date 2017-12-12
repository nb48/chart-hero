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
    ModelTrackTSChange,
    ModelTrackEvent,
    ModelTrackEventType,
    ModelTrackNote,
    ModelTrackNoteType,
    ModelTrackPracticeSection,
    ModelTrackSoloToggle,
    ModelTrackStarPowerToggle,
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
    private selected: ModelTrackEvent;

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
        this.selectorService.selectedEvents.subscribe((e) => {
            this.selected = e;
        });
        this.selectorService.selectedNotes.subscribe((n) => {
            this.selected = n;
        });
    }

    addNote(): void {
        const track = getTrack(this.model, this.track);        
        const newNote = this.newNote(this.time);
        track.events.push(newNote);
        this.selectorService.selectNote(newNote.id);
        this.modelService.model = this.model;
    }

    addNoteAtTimes(times: number[]): void {
        const track = getTrack(this.model, this.track);
        const newNotes = times.map(time => this.newNote(time));
        newNotes.forEach(note => track.events.push(note));
        this.modelService.model = this.model;
    }

    addBPMChange(): void {
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
        this.selectorService.selectEvent(newBPMChange.id);
        this.modelService.model = this.model;
    }

    addTSChange(): void {
        const newTSChange: ModelTrackTSChange = {
            id: this.idGenerator.id(),
            event: ModelTrackEventType.TSChange,
            time: roundTime(this.time),
            ts: 4,
        };
        this.model.syncTrack.events.push(newTSChange);
        this.selectorService.selectEvent(newTSChange.id);
        this.modelService.model = this.model;
    }

    addPracticeSection(): void {
        const newPracticeSection: ModelTrackPracticeSection = {
            id: this.idGenerator.id(),
            event: ModelTrackEventType.PracticeSection,
            time: roundTime(this.time),
            name: 'New Section',
        };
        this.model.events.events.push(newPracticeSection);
        this.selectorService.selectEvent(newPracticeSection.id);
        this.modelService.model = this.model;
    }

    addSoloToggle(): void {
        const newSoloToggle: ModelTrackSoloToggle = {
            id: this.idGenerator.id(),
            event: ModelTrackEventType.SoloToggle,
            time: roundTime(this.time),
        };
        const track = getTrack(this.model, this.track);        
        track.events.push(newSoloToggle);
        this.selectorService.selectEvent(newSoloToggle.id);
        this.modelService.model = this.model;
    }

    addStarPowerToggle(): void {
        const newStarPowerToggle: ModelTrackStarPowerToggle = {
            id: this.idGenerator.id(),
            event: ModelTrackEventType.StarPowerToggle,
            time: roundTime(this.time),
        };
        const track = getTrack(this.model, this.track);        
        track.events.push(newStarPowerToggle);
        this.selectorService.selectEvent(newStarPowerToggle.id);
        this.modelService.model = this.model;
    }

    deleteEvent(): void {
        if (!this.selected) {
            return;
        }
        const idToDelete = this.selected.id;
        this.selectorService.selectNearest();
        const track = getTrack(this.model, this.track);
        const trackIndex = track.events.findIndex(n => n.id === idToDelete);
        if (trackIndex !== -1) {
            track.events.splice(trackIndex, 1);            
        }
        const syncTrack = this.model.syncTrack;
        const syncTrackIndex = syncTrack.events.findIndex(n => n.id === idToDelete);
        if (syncTrackIndex !== -1) {
            syncTrack.events.splice(syncTrackIndex, 1);
        }
        const events = this.model.events;
        const eventsIndex = events.events.findIndex(n => n.id === idToDelete);
        if (eventsIndex !== -1) {
            events.events.splice(eventsIndex, 1);
        }
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

    eventEventChanged(event: ModelTrackEvent): void {
        const modelEvent = this.model.events.events.find(e => e.id === event.id);
        Object.keys(event).forEach((key) => {
            modelEvent[key] = event[key];
        });
        modelEvent.time = roundTime(modelEvent.time);
        this.modelService.model = this.model;
    }

    private newNote(time: number): ModelTrackNote {
        const ghl = isGHLTrack(this.track);
        return {
            id: this.idGenerator.id(),
            event: ghl ? ModelTrackEventType.GHLNote : ModelTrackEventType.GuitarNote,
            time: roundTime(time),
            type: [],
            length: 0,
            forceHopo: false,
            tap: false,
        };
    }
}
