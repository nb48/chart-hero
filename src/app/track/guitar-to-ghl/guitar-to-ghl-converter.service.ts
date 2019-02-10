import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, combineLatest } from 'rxjs';

import { IdGeneratorService } from '../../model/id-generator/id-generator.service';
import { Model, ModelTrackEventType, ModelTrackNote, ModelTrackNoteType } from '../../model/model';
import { ModelService } from '../../model/model.service';
import { Track } from '../track';
import { TrackService } from '../track.service';

@Injectable()
export class GuitarToGHLConverterService {

    private shouldConvertsSubject: ReplaySubject<boolean>;
    private model: Model;
    private track: Track;

    constructor(
        private modelService: ModelService,
        private trackService: TrackService,
        private idGenerator: IdGeneratorService,
    ) {
        this.shouldConvertsSubject = new ReplaySubject<boolean>();
        combineLatest(
            this.modelService.models,
            this.trackService.tracks,
            (model, track) => {
                this.model = model;
                this.track = track;
            },
        ).subscribe(() => {
            this.decideToConvert();
        });
    }

    get shouldConverts(): Observable<boolean> {
        return this.shouldConvertsSubject.asObservable();
    }

    convertExpert(): void {
        this.model.ghlGuitar.expert = {
            events: this.model.guitar.expert.events
                .map(event => event as ModelTrackNote)
                .map(event => ({
                    id: this.idGenerator.id(),
                    event: ModelTrackEventType.GHLNote as ModelTrackEventType.GHLNote,
                    time: event.time,
                    type: this.convertGuitarNotesToGHLNotes(event.type),
                    length: event.length,
                    forceHopo: event.forceHopo,
                    tap: event.tap,
                })),
            unsupported: this.model.guitar.expert.unsupported.map((unsupported) => {
                return JSON.parse(JSON.stringify(unsupported));
            }),
        };
        this.modelService.model = this.model;
    }

    private decideToConvert() {
        const trackIsGHLExpert = this.track === Track.GHLGuitarExpert;
        const guitarExpertIsEmpty = this.model.guitar.expert.events.length === 0;
        const ghlExpertIsEmpty = this.model.ghlGuitar.expert.events.length === 0;
        const shouldConvert = trackIsGHLExpert && !guitarExpertIsEmpty && ghlExpertIsEmpty;
        this.shouldConvertsSubject.next(shouldConvert);
    }

    private convertGuitarNotesToGHLNotes(notes: ModelTrackNoteType[])
        : ModelTrackNoteType[] {
        return notes.map((note) => {
            switch (note) {
            case ModelTrackNoteType.GuitarGreen:
                return ModelTrackNoteType.GHLBlack1;
            case ModelTrackNoteType.GuitarRed:
                return ModelTrackNoteType.GHLBlack2;
            case ModelTrackNoteType.GuitarYellow:
                return ModelTrackNoteType.GHLBlack3;
            case ModelTrackNoteType.GuitarBlue:
                return ModelTrackNoteType.GHLWhite1;
            case ModelTrackNoteType.GuitarOrange:
                return ModelTrackNoteType.GHLWhite2;
            }
        });
    }
}
