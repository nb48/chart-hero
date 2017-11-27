import { EventEmitter, Injectable } from '@angular/core';

import { IdGeneratorService } from '../../../id-generator/id-generator.service';
import { ModelTrack, ModelTrackEvent, ModelTrackEventType } from '../../../model';
import { MemorySyncTrack } from '../../memory';
import { MidiTimeService } from '../util/midi-time.service';

export const defaultSyncTrack = (): MemorySyncTrack => ({
    midiTime: 0,
    type: 'B',
    value: 120000,
});

const supportedEvents = ['B', 'TS'];

@Injectable()
export class SyncTrackImporterService {

    constructor(
        private idGenerator: IdGeneratorService,
        private midiTimeService: MidiTimeService,
    ) {
    }

    import(st: MemorySyncTrack[], resolution: number, offset: number): ModelTrack {
        this.midiTimeService.clearCache();
        return {
            events: [...this.importSyncTrack(st, resolution, offset)],
            unsupported: [...this.importUnsupportedSyncTrack(st)],
        };
    }

    private importSyncTrack(st: MemorySyncTrack[], resolution: number, offset: number)
        : ModelTrackEvent[] {
        let syncTrack = st
            ? st.filter(e => supportedEvents.indexOf(e.type) !== -1)
            : [defaultSyncTrack()];
        if (syncTrack.length === 0) {
            syncTrack = [defaultSyncTrack()];
        }
        const bpmChanges = syncTrack.filter(e => e.type === 'B');
        return syncTrack.map((e) => {
            const time = this.midiTimeService.calculateTime(e.midiTime, resolution, bpmChanges);
            if (e.type === 'B') {
                return {
                    id: this.idGenerator.id(),
                    event: ModelTrackEventType.BPMChange as
                        ModelTrackEventType.BPMChange,
                    time: time + offset,
                    bpm: e.value / 1000,
                };
            }
            if (e.type === 'TS') {
                return {
                    id: this.idGenerator.id(),
                    event: ModelTrackEventType.TSChange as
                        ModelTrackEventType.TSChange,
                    time: time + offset,
                    ts: e.value,
                };
            }
        });
    }

    private importUnsupportedSyncTrack(st: MemorySyncTrack[]): MemorySyncTrack[] {
        return st ? st.filter(st => supportedEvents.indexOf(st.type) === -1) : [];
    }
}
