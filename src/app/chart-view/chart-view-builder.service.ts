import { ChartStoreEventBPMChange } from './../chart-store/chart-store';
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

const timeBefore = 1.05;
const timeAfter = -0.5;

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

    private buildBeats(cs: ChartStore, currentTime:number): ChartViewBeat[] {
        const beatTimes: number[] = [];
        let timeCounter = 0;
        let currentIncrement = 1;
        cs.events
            .filter(e => e.event === ChartStoreEventType.BPMChange)
            .map(e => e as ChartStoreEventBPMChange)
            .sort((a, b) => a.time - b.time)
            .forEach((e) => {
                while (timeCounter < e.time) {
                    beatTimes.push(timeCounter);
                    timeCounter += currentIncrement;
                }
                currentIncrement = 60 / e.bpm;
            });
        while (timeCounter < currentTime + timeBefore) {
            beatTimes.push(timeCounter);
            timeCounter += currentIncrement;
        }
        return beatTimes
            .filter(t => t > (currentTime + timeAfter) && t < (currentTime + timeBefore))
            .map(t => ({
                y: this.calculateYPos(t, currentTime),
            }));
    }

    private buildNotes(cs: ChartStore, time: number): ChartViewNote[] {
        return cs.events
            .filter(e => e.event === ChartStoreEventType.Note)
            .filter(e => e.time > (time + timeAfter) && e.time < (time + timeBefore))
            .map(e => this.buildNote(e as ChartStoreEventNote, time));
    }

    private buildNote(note: ChartStoreEventNote, time: number): ChartViewNote {

        const open = note.type.length === 0;
        if (open) {
            return {
                y: this.calculateYPos(note.time, time),
                open: true,
            };
        }
        return {
            x: this.calculateXPos(note),
            y: this.calculateYPos(note.time, time),
            open: false,
            color: this.buildColor(note),
        };
    }

    private calculateYPos(eventTime: number, currentTime: number): number {
        const bottom = currentTime + timeAfter;
        const top = currentTime + timeBefore;
        return (1 - (eventTime - bottom) / (top - bottom)) * 100;
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
