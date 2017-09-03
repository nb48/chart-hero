import { Component } from '@angular/core';

import { ChartStoreService, Chart } from '../chart-store/chart-store.service';
import { ConfigStoreService } from '../config-store/config-store.service';
import { ViewBeat } from '../view-chart/view-beat/view-beat.component';
import { ViewNote, buildNote } from '../view-chart/view-note/view-note.component';
import { beatTimeGenerator } from '../util/util';

@Component({
  selector: 'app-chart-editor',
  templateUrl: './chart-editor.component.html',
  styleUrls: ['./chart-editor.component.css']
})
export class ChartEditorComponent {

  beats: ViewBeat[];
  notes: ViewNote[];
  totalHeight: number;
  currentNote: number;

  constructor(private chartStore: ChartStoreService, private configStore: ConfigStoreService) {
    this.buildView();
  }

  private buildView(): void {
    let latest = this.chartStore.lastNote().time;
    let increment = 60 / this.configStore.bpm;

    const beatTimes = Array.from(beatTimeGenerator(this.configStore.offset, 0, latest + increment, increment));
    this.beats = beatTimes.map((time, index) => ({
        position: 100 / (beatTimes.length + 1) * (index + 1)
    }))

    this.totalHeight = this.beats.length * 20;
    this.notes = Array.from(this.chartStore.chart.notes.values())
      .map((chartNote) => buildNote(chartNote.color, (chartNote.time + increment) / (beatTimes[beatTimes.length - 1] + increment) * 100));
  }
}
