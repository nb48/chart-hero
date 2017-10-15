import { Injectable } from '@angular/core';

import {
    ChartStoreView,
    ChartStoreViewNote,
    ChartStoreViewNoteGHLColor,
} from '../chart-store/chart-store-view';
import {
    ChartView,
    ChartViewBeat,
    ChartViewNote,
    ChartViewNoteGHL,
    ChartViewNoteGHLColor,
    ChartViewNoteOpen,
    ChartViewNoteType,
} from './chart-view';

const speed = 1;
const timeBefore = (1 / speed) * 1.2;
const timeAfter = (1 / speed) * -0.3;

const zeroPosition = (): number => {
    return timeBefore / (timeBefore - timeAfter) * 100;
};

@Injectable()
export class ChartViewBuilderService {

    constructor() {
    }

    buildView(csv: ChartStoreView, currentTime: number): ChartView {
        return {
            zeroPosition: zeroPosition(),
            beats: this.buildBeats(csv, currentTime),
            notes: this.buildNotes(csv, currentTime),
        };
    }

    private buildBeats(csv: ChartStoreView, currentTime:number): ChartViewBeat[] {
        return csv.beats
            .filter(b => this.timeInView(b.time, currentTime))
            .map(b => ({
                y: this.calculateYPos(b.time, currentTime),
            }));
    }

    private buildNotes(csv: ChartStoreView, currentTime: number): ChartViewNote[] {
        return [].concat.apply([], csv.notes
            .filter(n => this.timeInView(n.time, currentTime))
            .map((note): ChartViewNote[] => {
                const y = this.calculateYPos(note.time, currentTime);
                if (note.open) {
                    const type = ChartViewNoteType.Open;
                    return [{ type, y }] as ChartViewNoteOpen[];
                } else {
                    return this.splitNote(note, y);
                }
            }))
            .sort((a: ChartViewNote, b: ChartViewNote) => a.y - b.y);
    }

    private splitNote(note: ChartStoreViewNote, y: number): ChartViewNote[] {
        const type = ChartViewNoteType.GHL;
        const notes: ChartViewNoteGHL[] = [];
        if (note.ghlLane1 !== ChartStoreViewNoteGHLColor.None) {
            const x = 25;
            const color = this.buildGHLNoteColor(note.ghlLane1);
            notes.push({ type, x, y, color });
        }
        if (note.ghlLane2 !== ChartStoreViewNoteGHLColor.None) {
            const x = 50;
            const color = this.buildGHLNoteColor(note.ghlLane2);
            notes.push({ type, x, y, color });
        }
        if (note.ghlLane3 !== ChartStoreViewNoteGHLColor.None) {
            const x = 75;
            const color = this.buildGHLNoteColor(note.ghlLane3);
            notes.push({ type, x, y, color });
        }
        return notes;
    }

    private timeInView(eventTime: number, currentTime: number): boolean {
        return eventTime > (currentTime + timeAfter) && eventTime < (currentTime + timeBefore);  
    }

    private calculateYPos(eventTime: number, currentTime: number): number {
        const bottom = currentTime + timeAfter;
        const top = currentTime + timeBefore;
        return (1 - (eventTime - bottom) / (top - bottom)) * 100;
    }

    private buildGHLNoteColor(color: ChartStoreViewNoteGHLColor): ChartViewNoteGHLColor {
        switch (color) {
        case ChartStoreViewNoteGHLColor.Black:
            return ChartViewNoteGHLColor.Black;
        case ChartStoreViewNoteGHLColor.White:
            return ChartViewNoteGHLColor.White;
        case ChartStoreViewNoteGHLColor.Chord:
            return ChartViewNoteGHLColor.Chord;
        }
    }
}
