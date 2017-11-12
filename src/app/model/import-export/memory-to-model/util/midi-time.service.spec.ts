import { TestBed } from '@angular/core/testing';

import { ModelTrackBPMChange, ModelTrackEventType } from '../../../model';
import { MemorySyncTrack } from '../../memory';
import { MidiTimeService } from './midi-time.service';

const syncTrack = (midiTime: number, value: number): MemorySyncTrack => ({
    midiTime,
    value: value * 1000,
    type: 'B',
});

const bpmChange = (time: number, bpm: number): ModelTrackBPMChange => ({
    time,
    bpm,
    event: ModelTrackEventType.BPMChange,
    id: 1,
});

describe('Service: MidiTimeService', () => {

    let service: MidiTimeService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                MidiTimeService,
            ],
        });
        service = TestBed.get(MidiTimeService);
    });

    describe('MidiTimeService should calculate time correctly', () => {

        const testCase = (
            id: number,
            midiTime: number,
            resolution: number,
            syncTrack: MemorySyncTrack[],
            expectedTime: number,
        ): void => {
            it(`Test case ${id}`, () => {
                const time = service.calculateTime(midiTime, resolution, syncTrack);
                expect(time).toEqual(expectedTime);
            });
        };

        testCase(1, 0, 100, [], 0);
        testCase(2, 0, 100, [syncTrack(0, 60)], 0);
        testCase(3, 100, 100, [syncTrack(0, 60)], 1);
        testCase(4, 100, 100, [syncTrack(0, 120)], 0.5);
        testCase(5, 100, 200, [syncTrack(0, 60)], 0.5);
        testCase(6, 200, 100, [syncTrack(0, 60), syncTrack(100, 30)], 3);
        testCase(7, 300, 100, [syncTrack(0, 60), syncTrack(100, 30), syncTrack(200, 60)], 4);
        testCase(8, 100, 100, [syncTrack(0, 60), syncTrack(100, 30)], 1);
        testCase(9, 50, 100, [syncTrack(0, 60), syncTrack(100, 30)], 0.5);
        testCase(10, 150, 100, [syncTrack(0, 60), syncTrack(100, 30), syncTrack(200, 60)], 2);
    });

    describe('MidiTimeService should calculate midi time correctly', () => {

        const testCase = (
            id: number,
            time: number,
            resolution: number,
            bpmChanges: ModelTrackBPMChange[],
            expectedMidiTime: number,
        ): void => {
            it(`Test case ${id}`, () => {
                const midiTime = service.calculateMidiTime(time, resolution, bpmChanges);
                expect(midiTime).toEqual(expectedMidiTime);
            });
        };

        testCase(1, 0, 100, [], 0);
        testCase(2, 0, 100, [bpmChange(0, 60)], 0);
        testCase(3, 1, 100, [bpmChange(0, 60)], 100);
        testCase(4, 0.5, 100, [bpmChange(0, 120)], 100);
        testCase(5, 0.5, 200, [bpmChange(0, 60)], 100);
        testCase(6, 3, 100, [bpmChange(0, 60), bpmChange(1, 30)], 200);
        testCase(7, 4, 100, [bpmChange(0, 60), bpmChange(1, 30), bpmChange(3, 60)], 300);
        testCase(8, 1, 100, [bpmChange(0, 60), bpmChange(1, 30)], 100);
        testCase(9, 0.5, 100, [bpmChange(0, 60), bpmChange(1, 30)], 50);
        testCase(10, 2, 100, [bpmChange(0, 60), bpmChange(1, 30), bpmChange(3, 60)], 150);
    });
});
