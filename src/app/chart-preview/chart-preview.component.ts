import { Component, OnInit } from '@angular/core';

import { AudioStoreService } from '../audio-store/audio-store.service';

interface Beat {
  time: number;
  position: number;
}

interface ViewWindow {
  earliest: number;
  latest: number;
  zeroPosition: number;
}

const earliest = 2.8;
const latest = -0.4;

@Component({
  selector: 'app-chart-preview',
  templateUrl: './chart-preview.component.html',
  styleUrls: ['./chart-preview.component.css']
})
export class ChartPreviewComponent implements OnInit {

  bpm: number = 150;
  offset: number = 0.247;
  viewWindow: ViewWindow = {
    earliest: earliest,
    latest: latest,
    zeroPosition: earliest / (earliest - latest) * 100
  };

  beats: Beat[];

  constructor(public audioStore: AudioStoreService) {
    this.beats = this.buildBeats(0);
  }

  ngOnInit() {
    this.audioStore.currentTime.subscribe((currentTime: number) => {
      this.beats = this.buildBeats(currentTime)
    });
  }

  start(): void {
    this.audioStore.start();
  }

  stop(): void {
    this.audioStore.stop();
    this.beats = this.buildBeats(0);
  }

  private buildBeats(currentTime: number): Beat[] {
    let beats = [];
    let time = this.viewWindow.latest + this.offset;
    const earliest = currentTime + this.viewWindow.earliest;
    const latest = currentTime + this.viewWindow.latest;
    while (time < earliest) {
      time += 60 / this.bpm;
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
}
