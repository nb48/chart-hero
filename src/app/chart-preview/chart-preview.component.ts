import { Component, OnInit } from '@angular/core';

import { AudioStoreService } from '../audio-store/audio-store.service';
import { ChartStoreService, Chart, Note } from '../chart-store/chart-store.service';
import { ConfigStoreService } from '../config-store/config-store.service';

interface Beat {
  time: number;
  position: number;
}

interface ViewWindow {
  earliest: number;
  latest: number;
  zeroPosition: number;
}

const earliest: number = 1.4;
const latest: number = -0.2;

@Component({
  selector: 'app-chart-preview',
  templateUrl: './chart-preview.component.html',
  styleUrls: ['./chart-preview.component.css']
})
export class ChartPreviewComponent implements OnInit {

  earliest: number = 1.4;;
  latest: number = -0.2;
  zeroPosition: number = earliest / (earliest - latest) * 100;

  chart: Chart;

  beats: Beat[];

  notes: Note[];

  constructor(private audioStore: AudioStoreService, private chartStore: ChartStoreService, private configStore: ConfigStoreService) {
  }

  ngOnInit() {
    this.chart = this.chartStore.chart;
    this.beats = this.buildBeats(0);
    this.notes = this.buildNotes(0);
    this.audioStore.frameEvent.subscribe((currentTime: number) => {
      this.beats = this.buildBeats(currentTime);
      this.notes = this.buildNotes(currentTime);
    });
  }

  play(): void {
    this.audioStore.play();
  }

  stop(): void {
    this.audioStore.stop(0);
    this.beats = this.buildBeats(0);
    this.notes = this.buildNotes(0);
  }

  private buildBeats(currentTime: number): Beat[] {
    let beats = [];
    let time = this.latest + this.configStore.offset;
    const earliest = currentTime + this.earliest;
    const latest = currentTime + this.latest;
    while (time < earliest) {
      time += 60 / this.configStore.bpm;
      if (time < latest) {
        continue;
      }
      beats.push({
        time: time,
        position: (earliest - time) / (earliest - latest) * 100
      });
    }
    return beats;
  }

  private buildNotes(currentTime: number): Note[] {
    const earliest = currentTime + this.earliest;
    const latest = currentTime + this.latest;
    let notes = [];
    let visibleIndex = this.chart.notes.findIndex((note) => note.time > latest);
    while (true) {
      const note = this.chart.notes[visibleIndex];
      if (!note || note.time > earliest) {
        break;
      }
      const y = (earliest - note.time) / (earliest - latest) * 100;
      notes.push(this.chartStore.buildNote(note.color, y));
      visibleIndex += 1;
    }
    return notes;
  }
}
