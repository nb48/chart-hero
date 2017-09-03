import { Component } from '@angular/core';

import { ChartStoreService, Chart } from '../chart-store/chart-store.service';
import { ConfigStoreService } from '../config-store/config-store.service';
import { ViewBeat } from '../view-chart/view-beat/view-beat.component';
import { ViewNote, buildNote } from '../view-chart/view-note/view-note.component';

@Component({
  selector: 'app-chart-editor',
  templateUrl: './chart-editor.component.html',
  styleUrls: ['./chart-editor.component.css']
})
export class ChartEditorComponent {

  chart: Chart;
  beats: ViewBeat[];
  notes: ViewNote[];
  totalHeight: number;
  totalTime: number;

  constructor(private chartStore: ChartStoreService, private configStore: ConfigStoreService) {
    this.chart = this.chartStore.chart;
    this.beats = this.buildBeats();
    this.totalHeight = this.beats.length * 20;
    this.notes = this.buildNotes();
  }

  private buildBeats(): ViewBeat[] {
    let beats = [];
    let latest = this.chart.notes[this.chart.notes.length - 1].time;
    let increment = 60 / this.configStore.bpm;
    let time = this.configStore.offset;
    while (time - increment < latest) {
      beats.push({
        time: time,
        position: 0
      });
      time += increment;
    }
    beats.forEach((beat, index) => {
      beat.position = (100 / (beats.length + 1)) * (index + 1);
    });
    this.totalTime = beats[beats.length - 1].time + increment + increment;
    return beats;
  }

  private buildNotes(): ViewNote[] {
    let notes = [];
    return this.chart.notes.map((note) => {
      let y = (note.time + (60 / this.configStore.bpm)) / this.totalTime * 100;
      return buildNote(note.color, y);
    });
  }
}
