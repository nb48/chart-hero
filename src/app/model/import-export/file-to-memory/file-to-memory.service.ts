import { Injectable } from '@angular/core';

import { Memory, MemoryMetadata, MemorySyncTrack, MemoryTrack } from '../memory';

@Injectable()
export class FileToMemoryService {

    import(file: string): Memory {
        try {
            return this.importFile(file);            
        } catch (error) {
            console.warn('Invalid chart file. Loading empty chart instead');
            return this.importFile('');                        
        }
    }

    private importFile(file: string): Memory {
        return {
            metadata: this.importMetadata(file),
            syncTrack: this.importSyncTrack(file),
            guitar: {
                expert: this.importTrack(file, 'ExpertSingle'),
                hard: this.importTrack(file, 'HardSingle'),
                medium: this.importTrack(file, 'MediumSingle'),
                easy: this.importTrack(file, 'EasySingle'),
            },
            ghlGuitar: {
                expert: this.importTrack(file, 'ExpertGHLGuitar'),
                hard: this.importTrack(file, 'HardGHLGuitar'),
                medium: this.importTrack(file, 'MediumGHLGuitar'),
                easy: this.importTrack(file, 'EasyGHLGuitar'),
            },
            events: this.importTrack(file, 'Events'),
            vocals: this.importTrack(file, 'PART VOCALS'),
            venue: this.importTrack(file, 'VENUE'),
        };
    }

    private importMetadata(file: string): MemoryMetadata[] {
        const section = this.findSection(`[Song]`, file);
        if (!section) {
            return null;
        }
        return section.map(([name, value]) => {
            return {
                name,
                value,
            };
        });
    }

    private importSyncTrack(file: string): MemorySyncTrack[] {
        const section = this.findSection(`[SyncTrack]`, file);
        if (!section) {
            return null;
        }
        return section.map(([midiTime, content]) => {
            const i = content.indexOf(' ');
            const [type, text] = [content.slice(0, i), content.slice(i + 1)];
            if (type === 'B') {
                return {
                    type,
                    midiTime: parseInt(midiTime, 10),
                    value: parseInt(text, 10),
                };
            }
            if (type === 'TS') {
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

    private importTrack(file: string, track: string): MemoryTrack[] {
        const section = this.findSection(`[${track}]`, file);
        if (!section) {
            return null;
        }
        return section.map(([midiTime, content]) => {
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
        const sectionIndex = file.indexOf(header);
        if (sectionIndex === -1) {
            return null;
        }
        const fromHeader = file.substring(sectionIndex);
        const section = fromHeader.substring(fromHeader.indexOf('{') + 1, fromHeader.indexOf('}'));
        return section.split('\n')
            .filter(s => s.trim() !== '')
            .map(s => s.split('=').map(s => s.trim()));
    }
}
