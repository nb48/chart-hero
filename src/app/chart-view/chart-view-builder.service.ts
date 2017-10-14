import { Injectable } from '@angular/core';

import {
    ChartStore,
    ChartStoreEventNote,
    ChartStoreEventType,
    ChartStoreNoteType,
} from '../chart-store/chart-store';
import {
    ChartView,
    ChartViewBeat,
    ChartViewNote,
    ChartViewNoteColor,
} from './chart-view';

const timeBefore = 1.4;
const timeAfter = -0.2;

const zeroPosition = (): number => {
    return timeBefore / (timeBefore - timeAfter) * 100;
};

@Injectable()
export class ChartViewBuilderService {

    constructor() {
    }

    buildView(cs: ChartStore, time: number): ChartView {
        return {
            zeroPosition: zeroPosition(),
            beats: this.buildBeats(cs, time),
            notes: this.buildNotes(cs, time),
        };
    }

    private buildBeats(cs: ChartStore, time:number): ChartViewBeat[] {
        return [];
    }

    private buildNotes(cs: ChartStore, time: number): ChartViewNote[] {
        return cs.events
            .filter(e => e.time > (time + timeAfter) && e.time < (time + timeBefore))
            .filter(e => e.event === ChartStoreEventType.Note)
            .map(e => this.buildNote(e as ChartStoreEventNote, time));
    }

    private buildNote(note: ChartStoreEventNote, time: number): ChartViewNote {
        const bottom = time + timeAfter;
        const top = time + timeBefore;
        const position = (1 - (note.time - bottom) / (top - bottom)) * 100;
        const open = note.type.length === 0;
        if (open) {
            return {
                open,
                position,
            };
        }
        return {
            open,
            position,
            lane: this.buildLane(note),
            color: this.buildColor(note),
        };
    }

    private buildLane(note: ChartStoreEventNote): number {
        switch (note.type[0]) {
        case ChartStoreNoteType.GHLBlack1:
            return 1;
        case ChartStoreNoteType.GHLBlack2:
            return 2;
        case ChartStoreNoteType.GHLBlack3:
            return 3;
        case ChartStoreNoteType.GHLWhite1:
            return 1;
        case ChartStoreNoteType.GHLWhite2:
            return 2;
        case ChartStoreNoteType.GHLWhite3:
            return 3;
        }
    }

    private buildColor(note: ChartStoreEventNote): ChartViewNoteColor {
        switch (note.type[0]) {
        case ChartStoreNoteType.GHLBlack1:
            return ChartViewNoteColor.Black;
        case ChartStoreNoteType.GHLBlack2:
            return ChartViewNoteColor.Black;
        case ChartStoreNoteType.GHLBlack3:
            return ChartViewNoteColor.Black;
        case ChartStoreNoteType.GHLWhite1:
            return ChartViewNoteColor.White;
        case ChartStoreNoteType.GHLWhite2:
            return ChartViewNoteColor.White;
        case ChartStoreNoteType.GHLWhite3:
            return ChartViewNoteColor.White;
        }
    }
}
