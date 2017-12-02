import { EventEmitter, Injectable } from '@angular/core';

import {
    ModelTrack,
    ModelTrackEventType,
    ModelTrackBPMChange,
    ModelTrackNote,
    ModelTrackNoteType,
    ModelTrackPracticeSection,
    ModelTrackSoloToggle,
    ModelTrackStarPowerToggle,
} from '../../../model';
import { MemoryTrack } from '../../memory';
import { MidiTimeService } from '../util/midi-time.service';

export type NoteExporter = (note: ModelTrackNoteType) => number;

@Injectable()
export class GenericTrackExporterService {

    constructor(private midiTimeService: MidiTimeService) {
    }

    export(
        track: ModelTrack,
        syncTrack: ModelTrack,
        resolution: number,
        offset: number,
        noteExporter: NoteExporter,
    ): MemoryTrack[] {
        if (track.events.length === 0 && track.unsupported.length === 0) {
            return null;
        }
        this.midiTimeService.clearCache();
        const bpmChanges = this.buildBPMChanges(syncTrack, offset);
        return [
            ...this.exportNotes(track, bpmChanges, resolution, offset, noteExporter),
            ...this.exportPracticeSections(track, bpmChanges, resolution, offset),
            ...this.exportSoloToggles(track, bpmChanges, resolution, offset),
            ...this.exportStarPowerToggles(track, bpmChanges, resolution, offset),
            ...track.unsupported,
        ].sort((a, b) => a.midiTime - b.midiTime);
    }

    private buildBPMChanges(st: ModelTrack, offset: number): ModelTrackBPMChange[] {
        return st.events
            .filter(e => e.event === ModelTrackEventType.BPMChange)
            .map(e => e as ModelTrackBPMChange)
            .map(e => ({
                id: e.id,
                event: e.event,
                time: e.time - offset,
                bpm: e.bpm,
            } as ModelTrackBPMChange));
    }

    private exportNotes(
        track: ModelTrack,
        bpmChanges: ModelTrackBPMChange[],
        resolution: number,
        offset: number,
        noteExporter: NoteExporter,
    ): MemoryTrack[] {
        return [].concat.apply([], track.events
            .filter(e => e.event === ModelTrackEventType.GuitarNote
                || e.event === ModelTrackEventType.GHLNote)
            .map(e => e as ModelTrackNote)
            .map((n): MemoryTrack[] => {
                const time = n.time - offset;
                const midiTime = this.midiTimeService.calculateMidiTime
                    (time, resolution, bpmChanges);
                const length = n.length !== 0
                    ? this.midiTimeService.calculateMidiTime
                        (time + n.length, resolution, bpmChanges) - midiTime
                    : 0;
                const forceHopo = n.forceHopo
                    ? [{
                        length,
                        midiTime,
                        type: 'N',
                        note: 5,
                    }]
                    : [];
                const tapNote = n.tap
                    ? [{
                        length,
                        midiTime,
                        type: 'N',
                        note: 6,
                    }]
                    : [];
                if (n.type.length === 0) {
                    return [{
                        length,
                        midiTime,
                        type: 'N',
                        note: 7,
                    }].concat(forceHopo).concat(tapNote);
                }
                return n.type.map((type) => {
                    return {
                        length,
                        midiTime,
                        type: 'N',
                        note: noteExporter(type),
                    };
                }).concat(forceHopo).concat(tapNote);
            }));
    }

    private exportPracticeSections(
        track: ModelTrack,
        bpmChanges: ModelTrackBPMChange[],
        resolution: number,
        offset: number,
    ): MemoryTrack[] {
        return track.events
            .filter(e => e.event === ModelTrackEventType.PracticeSection)
            .map(e => e as ModelTrackPracticeSection)
            .map((p): MemoryTrack => {
                const time = p.time - offset;
                const midiTime = this.midiTimeService.calculateMidiTime
                    (time, resolution, bpmChanges);
                return {
                    midiTime,
                    type: 'E',
                    text:`"section ${p.name}"`,
                };
            });
    }

    private exportSoloToggles(
        track: ModelTrack,
        bpmChanges: ModelTrackBPMChange[],
        resolution: number,
        offset: number,
    ): MemoryTrack[] {
        const soloEvents: MemoryTrack[] = [];
        let toggled = false;
        track.events
            .filter(e => e.event === ModelTrackEventType.SoloToggle)
            .map(e => e as ModelTrackSoloToggle)
            .forEach((t): void => {
                const time = t.time - offset;
                const midiTime = this.midiTimeService.calculateMidiTime
                    (time, resolution, bpmChanges);
                soloEvents.push({
                    midiTime,
                    type: 'E',
                    text: toggled ? 'soloend' : 'solo',
                });
                toggled = !toggled;
            });
        return soloEvents;
    }

    private exportStarPowerToggles(
        track: ModelTrack,
        bpmChanges: ModelTrackBPMChange[],
        resolution: number,
        offset: number,
    ): MemoryTrack[] {
        const starPowerEvents: MemoryTrack[] = [];
        let toggled = false;
        track.events
            .filter(e => e.event === ModelTrackEventType.StarPowerToggle)
            .map(e => e as ModelTrackStarPowerToggle)
            .forEach((t): void => {
                const time = t.time - offset;
                const midiTime = this.midiTimeService.calculateMidiTime
                    (time, resolution, bpmChanges);
                if (!toggled) {
                    starPowerEvents.push({
                        midiTime,
                        type: 'S',
                        note: 2,
                        length: 0,
                    });
                    toggled = true;
                } else {
                    const previousEvent = starPowerEvents[starPowerEvents.length - 1];
                    previousEvent.length = midiTime - previousEvent.midiTime;
                    toggled = false;
                }
            });
        if (toggled) {
            const previousEvent = starPowerEvents[starPowerEvents.length - 1];
            previousEvent.length = 100000;
        }
        return starPowerEvents;
    }
}
