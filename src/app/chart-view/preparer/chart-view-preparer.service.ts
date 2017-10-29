import { Injectable } from '@angular/core';

import {
    Model,
    ModelTrack,
    ModelTrackEvent,
    ModelTrackEventType,
    ModelTrackBPMChange,
    ModelTrackNote,
    ModelTrackNoteType,
} from '../../model/model';
import {
    ChartViewPrepared,
    ChartViewPreparedBeat,
    ChartViewPreparedNote,
    ChartViewPreparedNoteGuitarColor,
    ChartViewPreparedNoteGHLColor,
} from '../chart-view-prepared';
import { ChartViewTrack, getTrack } from '../chart-view-track';

const durationWhenNoEvents = 1;

@Injectable()
export class ChartViewPreparerService {

    buildView(model: Model, track: ChartViewTrack): ChartViewPrepared {
        return {
            beats: this.buildBeats(model),
            notes: this.buildNotes(model, track),
        };
    }



    private buildBeats(model: Model)
        : ChartViewPreparedBeat[] {
        const duration = this.calculateDuration(model);
        const beatTimes: ChartViewPreparedBeat[] = [];
        let timeCounter = 0;
        let currentIncrement = 0;
        model.syncTrack.events
            .filter(e => e.event === ModelTrackEventType.BPMChange)
            .map(e => e as ModelTrackBPMChange)
            .sort((a, b) => a.time - b.time)
            .forEach((e) => {
                while (timeCounter < e.time) {
                    beatTimes.push({ id: beatTimes.length + 1, time: timeCounter });
                    timeCounter += currentIncrement;
                }
                currentIncrement = 60 / e.bpm;
            });
        while (timeCounter <= duration) {
            beatTimes.push({ id: beatTimes.length + 1, time: timeCounter });
            timeCounter += currentIncrement;
        }
        return beatTimes;
    }

    private calculateDuration(cs: Model): number {
        const events: ModelTrackEvent[] = [];
        Object.keys(ChartViewTrack)
            .map(k => ChartViewTrack[k])
            .filter(v => typeof v === 'number')
            .forEach((track: ChartViewTrack) => {
                events.push(...getTrack(cs, track).events);                
            });
        const lastEvent = events.sort((a, b) => b.time - a.time)[0];
        return lastEvent ? lastEvent.time : durationWhenNoEvents;
    }

    private buildNotes(model: Model, track: ChartViewTrack): ChartViewPreparedNote[] {
        const t: ModelTrack = getTrack(model, track);
        return t.events
            .filter(e => e.event === ModelTrackEventType.GuitarNote
                || e.event === ModelTrackEventType.GHLNote)
            .map(e => e as ModelTrackNote)
            .map(e => this.buildNote(e));
    }

    private buildNote(note: ModelTrackNote): ChartViewPreparedNote {
        const time = note.time;
        const open = note.type.length === 0;
        const guitarLane1 = this.buildGuitarColor(note.type, ModelTrackNoteType.GuitarGreen);
        const guitarLane2 = this.buildGuitarColor(note.type, ModelTrackNoteType.GuitarRed);
        const guitarLane3 = this.buildGuitarColor(note.type, ModelTrackNoteType.GuitarYellow);
        const guitarLane4 = this.buildGuitarColor(note.type, ModelTrackNoteType.GuitarBlue);
        const guitarLane5 = this.buildGuitarColor(note.type, ModelTrackNoteType.GuitarOrange);
        const ghlLane1 = this.buildGHLColor(
            note.type, ModelTrackNoteType.GHLBlack1, ModelTrackNoteType.GHLWhite1);
        const ghlLane2 = this.buildGHLColor(
            note.type, ModelTrackNoteType.GHLBlack2, ModelTrackNoteType.GHLWhite2);
        const ghlLane3 = this.buildGHLColor(
            note.type, ModelTrackNoteType.GHLBlack3, ModelTrackNoteType.GHLWhite3);
        return {
            time,
            open,
            guitarLane1,
            guitarLane2,
            guitarLane3,
            guitarLane4,
            guitarLane5,
            ghlLane1,
            ghlLane2,
            ghlLane3,
            id: note.id,
        };
    }

    private buildGuitarColor(
        types: ModelTrackNoteType[],
        color: ModelTrackNoteType,
    ): ChartViewPreparedNoteGuitarColor {
        if (types.indexOf(color) !== -1) {
            switch (color) {
            case ModelTrackNoteType.GuitarGreen:
                return ChartViewPreparedNoteGuitarColor.Green;
            case ModelTrackNoteType.GuitarRed:
                return ChartViewPreparedNoteGuitarColor.Red;
            case ModelTrackNoteType.GuitarYellow:
                return ChartViewPreparedNoteGuitarColor.Yellow;
            case ModelTrackNoteType.GuitarBlue:
                return ChartViewPreparedNoteGuitarColor.Blue;
            case ModelTrackNoteType.GuitarOrange:
                return ChartViewPreparedNoteGuitarColor.Orange;
            }
        }
        return ChartViewPreparedNoteGuitarColor.None;
    }

    private buildGHLColor(
        types: ModelTrackNoteType[],
        black: ModelTrackNoteType,
        white: ModelTrackNoteType,
    ): ChartViewPreparedNoteGHLColor {
        if (types.indexOf(black) !== -1 && types.indexOf(white) !== -1) {
            return ChartViewPreparedNoteGHLColor.Chord;
        }
        if (types.indexOf(black) !== -1) {
            return ChartViewPreparedNoteGHLColor.Black;
        }
        if (types.indexOf(white) !== -1) {
            return ChartViewPreparedNoteGHLColor.White;
        }
        return ChartViewPreparedNoteGHLColor.None;
    }
}
