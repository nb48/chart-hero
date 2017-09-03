import { Injectable } from '@angular/core';

import { ChartStoreService } from '../chart-store/chart-store.service';

const indentedString = (string) => `    ${string}\n`;

const songString = (key, value) => indentedString(`${key} = ${value}`);
const noteString = (time, number) => indentedString(`${time} = N ${number} 0`);

@Injectable()
export class ChartBuilderService {

  constructor(private chartStore: ChartStoreService) {
  }

  buildChartString(): string {
    const song = this.buildSong();
    const syncTrack = this.buildSyncTrack();
    const events = this.buildEvents();
    const expertSingle = this.buildExpertSingle();
    return `[Song]\n{\n${song}}\n[SyncTrack]\n{\n${syncTrack}}\n[Events]\n{\n${events}}\n[ExpertSingle]\n{\n${expertSingle}}`;
  }

  private buildSong(): string {
    return songString('Name', 'Chart Hero Name')
         + songString('Artist', 'Chart Hero Artist')
         + songString('Charter', 'Chart Hero Charter')
         + songString('Resolution', '192')
  }

  private buildSyncTrack(): string {
    return indentedString(`0 = TS 4`)
         + indentedString(`0 = B ${this.chartStore.bpm * 1000}`);
  }

  private buildEvents(): string {
    return '';
  }

  private buildExpertSingle(): string {
    const noteStrings = [].concat(...this.chartStore.sortedNotes()
      .map((note) => {
        const time = note.time * 1000 / (60000 / (this.chartStore.bpm * 192));
        const timeString = `${time}`.split('.')[0];
        if (note.color.length === 0) {
          return [noteString(timeString, 7)]
        }
        return note.color.map((color) => noteString(timeString, color));
      }));
    return noteStrings.join('');
  }
}
