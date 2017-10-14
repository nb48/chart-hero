import { TestBed } from '@angular/core/testing';

import { ChartFileSyncTrack } from './../chart-file/chart-file';
import { ChartStoreMidiTimeService } from './chart-store-midi-time.service';
import { ChartStoreEventBPMChange, ChartStoreEventType } from './chart-store';

const syncTrack = (midiTime: number, value: number): ChartFileSyncTrack => ({
    midiTime,
    value: value * 1000,
    type: 'B',
});

const bpmChange = (time: number, bpm: number): ChartStoreEventBPMChange => ({
    time,
    bpm,
    event: ChartStoreEventType.BPMChange,
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
            bpmChanges: ChartStoreEventBPMChange[],
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

    describe('ChartStoreMidiTimeService should calculate BPM change events correctly', () => {

        const testCase = (
            id: number,
            syncTrack: ChartFileSyncTrack[],
            resolution: number,
            expectedBPMChanges: ChartStoreEventBPMChange[],
        ): void => {
            it(`Test case ${id}`, () => {
                const bpmChanges = service.calculateBPMChanges(syncTrack, resolution);
                expect(bpmChanges).toEqual(expectedBPMChanges);
            });
        };

        testCase(1, [], 100, []);
        testCase(2, [syncTrack(0, 60)], 100, [bpmChange(0, 60)]);
        testCase(3, [syncTrack(0, 60), syncTrack(100, 30)], 100,
                 [bpmChange(0, 60), bpmChange(1, 30)]);
        testCase(4, [syncTrack(0, 60), syncTrack(100, 30)], 200,
                 [bpmChange(0, 60), bpmChange(0.5, 30)]);
        testCase(5, [syncTrack(0, 120), syncTrack(100, 30)], 100,
                 [bpmChange(0, 120), bpmChange(0.5, 30)]);
        testCase(6, [syncTrack(0, 60), syncTrack(100, 30), syncTrack(200, 120)], 100,
                 [bpmChange(0, 60), bpmChange(1, 30), bpmChange(3, 120)]);
    });

    describe('ChartStoreMidiTimeService should calculate sync track correctly', () => {

        const testCase = (
            id: number,
            bpmChanges: ChartStoreEventBPMChange[],
            resolution: number,
            expectedSyncTrack: ChartFileSyncTrack[],
        ): void => {
            it(`Test case ${id}`, () => {
                const syncTrack = service.calculateSyncTrack(bpmChanges, resolution);
                expect(syncTrack).toEqual(expectedSyncTrack);
            });
        };

        testCase(1, [], 100, []);
        testCase(2, [bpmChange(0, 60)], 100, [syncTrack(0, 60)]);
        testCase(3, [bpmChange(0, 60), bpmChange(1, 30)], 100,
                 [syncTrack(0, 60), syncTrack(100, 30)]);
        testCase(4, [bpmChange(0, 60), bpmChange(0.5, 30)], 200,
                 [syncTrack(0, 60), syncTrack(100, 30)]);
        testCase(5, [bpmChange(0, 120), bpmChange(0.5, 30)], 100,
                 [syncTrack(0, 120), syncTrack(100, 30)]);
        testCase(6, [bpmChange(0, 60), bpmChange(1, 30), bpmChange(3, 120)], 100,
                 [syncTrack(0, 60), syncTrack(100, 30), syncTrack(200, 120)]);
    });
});
