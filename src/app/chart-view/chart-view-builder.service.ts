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

        const open = note.type.length === 0;
        if (open) {
            return {
                y: this.calculateYPos(note, time),
                open: true,
            };
        }
        return {
            x: this.calculateXPos(note),
            y: this.calculateYPos(note, time),
            open: false,
            color: this.buildColor(note),
        };
    }

    private calculateYPos(note: ChartStoreEventNote, time: number): number {
        const bottom = time + timeAfter;
        const top = time + timeBefore;
        return (1 - (note.time - bottom) / (top - bottom)) * 100;
    }

    private calculateXPos(note: ChartStoreEventNote): number {
        switch (note.type[0]) {
        case ChartStoreNoteType.GHLBlack1:
        case ChartStoreNoteType.GHLWhite1:
            return 25;
        case ChartStoreNoteType.GHLBlack2:
        case ChartStoreNoteType.GHLWhite2:
            return 50;
        case ChartStoreNoteType.GHLBlack3:
        case ChartStoreNoteType.GHLWhite3:
            return 75;
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
