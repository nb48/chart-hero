import { EventEmitter, Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

import {
    ChartFile,
    ChartFileMetadata,
    ChartFileSyncTrack,
    ChartFileEvent,
    ChartFileTrack,
} from '../chart-file';

@Injectable()
export class ChartFileImporterService {

    private chartFileSubject: ReplaySubject<ChartFile>;

    constructor() {
        this.chartFileSubject = new ReplaySubject<ChartFile>();
    }

    get chartFile(): Observable<ChartFile> {
        return this.chartFileSubject.asObservable();
    }

    import(file: string): void {
        this.chartFileSubject.next(this.importFile(file));
    }

    private importFile(file: string): ChartFile {
        return {
            metadata: this.importMetadata(file),
            syncTrack: this.importSyncTrack(file),
            events: this.importEvents(file),
            track: this.importTrack(file),
        };
    }

    private importMetadata(file: string): ChartFileMetadata[] {
        return this.findSection('[Song]', file).map(([name, value]) => {
            return {
                name,
                value,
            };
        });
    }

    private importSyncTrack(file: string): ChartFileSyncTrack[] {
        return this.findSection('[SyncTrack]', file).map(([midiTime, content]) => {
            const i = content.indexOf(' ');
            const [type, text] = [content.slice(0, i), content.slice(i + 1)];
            if (type === 'B') {
                return {
                    type,
                    midiTime: parseInt(midiTime, 10),
                    value: parseInt(text, 10),
                };
            }
            return {
                text,
                type,
                midiTime: parseInt(midiTime, 10),
            };
        });
    }

    private importEvents(file: string): ChartFileEvent[] {
        return this.findSection('[Events]', file).map(([midiTime, content]) => {
            const [type, text] = content.split(' ');
            return {
                type,
                text,
                midiTime: parseInt(midiTime, 10),
            };
        });
    }

    private importTrack(file: string): ChartFileTrack[] {
        return this.findSection('[ExpertGHLGuitar]', file).map(([midiTime, content]) => {
            const i = content.indexOf(' ');
            const [type, text] = [content.slice(0, i), content.slice(i + 1)];
            if (type === 'N') {
                const [value, length] = text.split(' ');
                return {
                    type,
                    midiTime: parseInt(midiTime, 10),
                    note: parseInt(value, 10),
                    length: parseInt(length, 10),
                };
            }
            return {
                text,
                type,
                midiTime: parseInt(midiTime, 10),
            };
        });
    }

    private findSection(header: string, file: string): string[][] {
        const fromHeader = file.substring(file.indexOf(header));
        const section = fromHeader.substring(fromHeader.indexOf('{') + 1, fromHeader.indexOf('}'));
        return section.split('\n')
            .filter(s => s.trim() !== '')
            .map(s => s.split('=').map(s => s.trim()));
    }
}
