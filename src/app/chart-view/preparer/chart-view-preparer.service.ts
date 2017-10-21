import { ChartStoreTrack } from './../../chart-store/chart-store';
import { Injectable } from '@angular/core';

import {
    ChartStore,
    ChartStoreTrackEvent,
    ChartStoreTrackEventType,
    ChartStoreTrackBPMChange,
    ChartStoreTrackNote,
    ChartStoreTrackNoteType,
} from '../../chart-store/chart-store';
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

    buildView(cs: ChartStore, t: ChartViewTrack): ChartViewPrepared {
        const track: ChartStoreTrack = getTrack(cs, t);
        const duration = this.buildDuration(cs);
        return {
            duration,
            beats: this.buildBeats(cs.syncTrack, duration),
            notes: this.buildNotes(track),
        };
    }

    private buildDuration(cs: ChartStore): number {
        const events: ChartStoreTrackEvent[] = [];
        Object.keys(ChartViewTrack)
            .map(k => ChartViewTrack[k])
            .filter(v => typeof v === 'number')
            .forEach((track: ChartViewTrack) => {
                events.push(...getTrack(cs, track).events);                
            });
        const lastEvent = events.sort((a, b) => b.time - a.time)[0];
        return lastEvent ? lastEvent.time : durationWhenNoEvents;
    }

    private buildBeats(syncTrack: ChartStoreTrack, duration: number)
        : ChartViewPreparedBeat[] {
        const beatTimes: ChartViewPreparedBeat[] = [];
        let timeCounter = 0;
        let currentIncrement = 0;
        syncTrack.events
            .filter(e => e.event === ChartStoreTrackEventType.BPMChange)
            .map(e => e as ChartStoreTrackBPMChange)
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

    private buildNotes(track: ChartStoreTrack): ChartViewPreparedNote[] {
        return track.events
            .filter(e => e.event === ChartStoreTrackEventType.GuitarNote
                || e.event === ChartStoreTrackEventType.GHLNote)
            .map(e => e as ChartStoreTrackNote)
            .map(e => this.buildNote(e));
    }

    private buildNote(note: ChartStoreTrackNote): ChartViewPreparedNote {
        const time = note.time;
        const open = note.type.length === 0;
        const guitarLane1 = this.buildGuitarColor(note.type, ChartStoreTrackNoteType.GuitarGreen);
        const guitarLane2 = this.buildGuitarColor(note.type, ChartStoreTrackNoteType.GuitarRed);
        const guitarLane3 = this.buildGuitarColor(note.type, ChartStoreTrackNoteType.GuitarYellow);
        const guitarLane4 = this.buildGuitarColor(note.type, ChartStoreTrackNoteType.GuitarBlue);
        const guitarLane5 = this.buildGuitarColor(note.type, ChartStoreTrackNoteType.GuitarOrange);
        const ghlLane1 = this.buildGHLColor(
            note.type, ChartStoreTrackNoteType.GHLBlack1, ChartStoreTrackNoteType.GHLWhite1);
        const ghlLane2 = this.buildGHLColor(
            note.type, ChartStoreTrackNoteType.GHLBlack2, ChartStoreTrackNoteType.GHLWhite2);
        const ghlLane3 = this.buildGHLColor(
            note.type, ChartStoreTrackNoteType.GHLBlack3, ChartStoreTrackNoteType.GHLWhite3);
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
        types: ChartStoreTrackNoteType[],
        color: ChartStoreTrackNoteType,
    ): ChartViewPreparedNoteGuitarColor {
        if (types.indexOf(color) !== -1) {
            switch (color) {
            case ChartStoreTrackNoteType.GuitarGreen:
                return ChartViewPreparedNoteGuitarColor.Green;
            case ChartStoreTrackNoteType.GuitarRed:
                return ChartViewPreparedNoteGuitarColor.Red;
            case ChartStoreTrackNoteType.GuitarYellow:
                return ChartViewPreparedNoteGuitarColor.Yellow;
            case ChartStoreTrackNoteType.GuitarBlue:
                return ChartViewPreparedNoteGuitarColor.Blue;
            case ChartStoreTrackNoteType.GuitarOrange:
                return ChartViewPreparedNoteGuitarColor.Orange;
            }
        }
        return ChartViewPreparedNoteGuitarColor.None;
    }

    private buildGHLColor(
        types: ChartStoreTrackNoteType[],
        black: ChartStoreTrackNoteType,
        white: ChartStoreTrackNoteType,
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
