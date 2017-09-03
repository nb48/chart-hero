import { Component, OnInit } from '@angular/core';

import { AudioStoreService } from '../audio-store/audio-store.service';
import { ChartStoreService, Chart } from '../chart-store/chart-store.service';
import { ConfigStoreService } from '../config-store/config-store.service';
import { ViewBeat } from '../view-chart/view-beat/view-beat.component';
import { ViewNote, buildNote } from '../view-chart/view-note/view-note.component';
import { beatTimeGenerator } from '../util/util';

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

  timeBefore: number = 1.4;;
  timeAfter: number = -0.2;
  zeroPosition: number = earliest / (earliest - latest) * 100;

  chart: Chart;

  beats: ViewBeat[];
  notes: ViewNote[];

  constructor(private audioStore: AudioStoreService, private chartStore: ChartStoreService, private configStore: ConfigStoreService) {
  }

  ngOnInit() {
    this.chart = this.chartStore.chart;
    this.buildView(0);
    this.audioStore.frameEvent.subscribe((currentTime: number) => {
      this.buildView(currentTime);
    });
  }

  play(): void {
    this.audioStore.play();
  }

  stop(): void {
    this.audioStore.stop(0);
    this.buildView(0);
  }

  private buildView(currentTime: number): void {
    const latest = currentTime + this.timeBefore;
    const earliest = currentTime + this.timeAfter;
    const increment = 60 / this.configStore.bpm;

    this.beats = Array.from(beatTimeGenerator(this.timeAfter + this.configStore.offset - increment, earliest, latest, increment)).map((time) => ({
      position: (latest - time) / (latest - earliest) * 100
    }));

    this.notes = [].concat(...Array.from(this.chart.notes.values())
      .filter((note) => note.time > earliest && note.time < latest)
      .map((note) => buildNote(note.id, (latest - note.time) / (latest - earliest) * 100, note.color)));
  }
}
