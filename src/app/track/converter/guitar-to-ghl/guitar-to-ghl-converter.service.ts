// import { EventEmitter, Injectable } from '@angular/core';

// import { ChartStoreIdGeneratorService } from '../id-generator/chart-store-id-generator.service';
// import { ChartStoreService } from '../chart-store.service';
// import {
//     ChartStore,
//     ChartStoreTrackEventType,
//     ChartStoreTrackNote,
//     ChartStoreTrackNoteType,
// } from '../chart-store';

// @Injectable()
// export class ChartStoreGuitarToGHLConverterService {

//     private currentChart: ChartStore;

//     constructor(
//         // private chartStore: ChartStoreService,
//         // private idGenerator: ChartStoreIdGeneratorService,
//     ) {
//         // this.chartStore.chart.subscribe((chart) => {
//         //     this.currentChart = chart;
//         // });
//     }

//     convertExpert(): void {
//         this.currentChart.ghlGuitar.expert = {
//             events: this.currentChart.guitar.expert.events
//                 .map(event => event as ChartStoreTrackNote)
//                 .map(event => ({
//                     id: 0,
//                     // id: this.idGenerator.id(),
//                     event: ChartStoreTrackEventType.GHLNote as ChartStoreTrackEventType.GHLNote,
//                     time: event.time,
//                     type: this.convertGuitarNotesToGHLNotes(event.type),
//                     length: event.length,
//                 })),
//             unsupported: this.currentChart.guitar.expert.unsupported.map((cft) => {
//                 return JSON.parse(JSON.stringify(cft));
//             }),
//         };
//         // this.chartStore.newChart(this.currentChart);
//     }

//     private convertGuitarNotesToGHLNotes(notes: ChartStoreTrackNoteType[])
//         : ChartStoreTrackNoteType[] {
//         return notes.map((note) => {
//             switch (note) {
//             case ChartStoreTrackNoteType.GuitarGreen:
//                 return ChartStoreTrackNoteType.GHLBlack1;
//             case ChartStoreTrackNoteType.GuitarRed:
//                 return ChartStoreTrackNoteType.GHLBlack2;
//             case ChartStoreTrackNoteType.GuitarYellow:
//                 return ChartStoreTrackNoteType.GHLBlack3;
//             case ChartStoreTrackNoteType.GuitarBlue:
//                 return ChartStoreTrackNoteType.GHLWhite1;
//             case ChartStoreTrackNoteType.GuitarOrange:
//                 return ChartStoreTrackNoteType.GHLWhite2;
//             }
//         });
//     }
// }
