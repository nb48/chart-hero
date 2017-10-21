import { TestBed } from '@angular/core/testing';

import { ChartFileSyncTrack } from '../../chart-file/chart-file';
import { ChartStoreMidiTimeService } from './chart-store-midi-time.service';
import { ChartStoreTrackBPMChange, ChartStoreTrackEventType } from '../chart-store';

const syncTrack = (midiTime: number, value: number): ChartFileSyncTrack => ({
    midiTime,
    value: value * 1000,
    type: 'B',
});

const bpmChange = (time: number, bpm: number): ChartStoreTrackBPMChange => ({
    time,
    bpm,
    event: ChartStoreTrackEventType.BPMChange,
    id: 1,
});

describe('Service: ChartStoreMidiTimeService', () => {

    let service: ChartStoreMidiTimeService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ChartStoreMidiTimeService,
            ],
        });
        service = TestBed.get(ChartStoreMidiTimeService);
    });

    describe('ChartStoreMidiTimeService should calculate time correctly', () => {

        const testCase = (
            id: number,
            midiTime: number,
            resolution: number,
            syncTrack: ChartFileSyncTrack[],
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

    describe('ChartStoreMidiTimeService should calculate midi time correctly', () => {

        const testCase = (
            id: number,
            time: number,
            resolution: number,
            bpmChanges: ChartStoreTrackBPMChange[],
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