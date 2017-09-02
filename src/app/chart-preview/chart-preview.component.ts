import { Component, OnInit } from '@angular/core';

import { AudioStoreService } from '../audio-store/audio-store.service';

interface Beat {
  time: number;
  visible: boolean;
  position: number;
}

interface ViewWindow {
  earliest: number;
  latest: number;
  zeroPosition: number;
}

const buildBeats = (start: number, duration: number, bpm: number, offset: number): Beat[] => {
  let beats = [];
  let time = start + offset;
  while (time < duration) {
    time += 60 / bpm;
    beats.push({
      time: time,
      visible: false,
      position: undefined
    });
  }
  return beats;
};

const updateBeats = (beats: Beat[], currentTime: number, viewWindow: ViewWindow): void => {
  const earliest = currentTime + viewWindow.earliest;
  const latest = currentTime + viewWindow.latest;
  beats.forEach((beat) => {
    if (beat.time < earliest && beat.time > latest) {
      beat.visible = true;
      beat.position = (earliest - beat.time) / (earliest - latest) * 100;
    } else {
      beat.visible = false;
      beat.position = undefined;
    }
  });
};

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
  }

  ngOnInit() {
    this.audioStore.currentTime.subscribe((currentTime: number) => {
      updateBeats(this.beats, currentTime, this.viewWindow);
    });
  }

  start() {
    this.beats = buildBeats(this.viewWindow.latest, this.audioStore.duration, this.bpm, this.offset);
    this.audioStore.start();
  }

  stop() {
    this.audioStore.stop();
  }
}
