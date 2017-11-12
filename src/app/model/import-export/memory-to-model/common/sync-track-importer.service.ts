import { EventEmitter, Injectable } from '@angular/core';

import { IdGeneratorService } from '../../../id-generator/id-generator.service';
import { ModelTrack, ModelTrackEventType, ModelTrackBPMChange } from '../../../model';
import { MemorySyncTrack } from '../../memory';
import { MidiTimeService } from '../util/midi-time.service';

export const defaultSyncTrack = (): MemorySyncTrack => ({
    midiTime: 0,
    type: 'B',
    value: 120000,
});

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
            events: [...this.importBPMChanges(st, resolution, offset)],
            unsupported: [...this.importUnsupportedSyncTrack(st)],
        };
    }

    private importBPMChanges(st: MemorySyncTrack[], resolution: number, offset: number)
        : ModelTrackBPMChange[] {
        let syncTrack = st ? st.filter(e => e.type === 'B') : [defaultSyncTrack()];
        if (syncTrack.length === 0) {
            syncTrack = [defaultSyncTrack()];
        }
        return syncTrack.map((e) => {
            const time = this.midiTimeService.calculateTime(e.midiTime, resolution, syncTrack);
            return {    
                id: this.idGenerator.id(),
                event: ModelTrackEventType.BPMChange as
                    ModelTrackEventType.BPMChange,
                time: time + offset,
                bpm: e.value / 1000,
            };
        });
    }

    private importUnsupportedSyncTrack(st: MemorySyncTrack[]): MemorySyncTrack[] {
        return st ? st.filter(st => st.type !== 'B') : [];
    }
}
