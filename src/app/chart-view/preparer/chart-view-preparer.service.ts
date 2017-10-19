import { Injectable } from '@angular/core';

import {
    ChartStore,
    ChartStoreEventBPMChange,
    ChartStoreEventNote,
    ChartStoreEventType,
    ChartStoreNoteType,
} from '../../chart-store/chart-store';
import {
    ChartViewPrepared,
    ChartViewPreparedBeat,
    ChartViewPreparedNote,
    ChartViewPreparedNoteGHLColor,
} from '../chart-view-prepared';

@Injectable()
export class ChartViewPreparerService {

    constructor() {
    }

    buildView(cs: ChartStore): ChartViewPrepared {
        return {
            duration: this.buildDuration(cs),
            beats: this.buildBeats(cs),
            notes: this.buildNotes(cs),
        };
    }

    private buildDuration(cs: ChartStore): number {
        const lastEvent = cs.events
            .sort((a, b) => b.time - a.time)[0];
        return lastEvent ? lastEvent.time : 1;
    }

    private buildBeats(cs: ChartStore): ChartViewPreparedBeat[] {
        const beatTimes: ChartViewPreparedBeat[] = [];
        let timeCounter = 0;
        let currentIncrement = 0;
        cs.events
            .filter(e => e.event === ChartStoreEventType.BPMChange)
            .map(e => e as ChartStoreEventBPMChange)
            .sort((a, b) => a.time - b.time)
            .forEach((e) => {
                while (timeCounter < e.time) {
                    beatTimes.push({ id: beatTimes.length + 1, time: timeCounter });
                    timeCounter += currentIncrement;
                }
                currentIncrement = 60 / e.bpm;
            });
        const lastNote = cs.events
            .filter(e => e.event === ChartStoreEventType.Note)
            .sort((a, b) => b.time - a.time)[0];
        const lastTime = lastNote ? lastNote.time + currentIncrement : 0;
        while (timeCounter < lastTime) {
            beatTimes.push({ id: beatTimes.length + 1, time: timeCounter });
            timeCounter += currentIncrement;
        }
        return beatTimes;
    }

    private buildNotes(cs: ChartStore): ChartViewPreparedNote[] {
        return cs.events
            .filter(e => e.event === ChartStoreEventType.Note)
            .map(e => e as ChartStoreEventNote)
            .map(e => this.buildNote(e));
    }

    private buildNote(note: ChartStoreEventNote): ChartViewPreparedNote {
        const time = note.time;
        const open = note.type.length === 0;
        const ghlLane1 = this.buildGHLColor(
            note.type, ChartStoreNoteType.GHLBlack1, ChartStoreNoteType.GHLWhite1);
        const ghlLane2 = this.buildGHLColor(
            note.type, ChartStoreNoteType.GHLBlack2, ChartStoreNoteType.GHLWhite2);
        const ghlLane3 = this.buildGHLColor(
            note.type, ChartStoreNoteType.GHLBlack3, ChartStoreNoteType.GHLWhite3);
        return { time, open, ghlLane1, ghlLane2, ghlLane3, id: note.id };
    }

    private buildGHLColor(
        types: ChartStoreNoteType[],
        black: ChartStoreNoteType,
        white: ChartStoreNoteType,
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
