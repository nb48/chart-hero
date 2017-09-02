import { Component, OnInit } from '@angular/core';

import { AudioStoreService } from '../audio-store/audio-store.service';

interface Beat {
  time: number;
  position: number;
}

interface ChartNote {
  time: number;
  color: string;
}

interface Note {
  x: number;
  y: number;
  color: string;
}

interface ViewWindow {
  earliest: number;
  latest: number;
  zeroPosition: number;
}

const earliest: number = 2.8;
const latest: number = -0.4;

const chart: ChartNote[] = [{
  time: 0.647,
  color: 'green'
}, {
  time: 1.047,
  color: 'red'
}, {
  time: 1.447,
  color: 'yellow'
}, {
  time: 1.847,
  color: 'blue'
}, {
  time: 2.247,
  color: 'orange'
}];

const buildNote = (color: string, y: number): Note => {
  let x = undefined;
  switch (color) {
    case 'green':
      x = 10;
      break;
    case 'red':
      x = 30;
      break;
    case 'yellow':
      x = 50;
      break;
    case 'blue':
      x = 70;
      break;
    case 'orange':
      x = 90;
      break;
  }
  return {
    x: x,
    y: y,
    color: color
  }
}

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

  notes: Note[];

  constructor(public audioStore: AudioStoreService) {
    this.beats = this.buildBeats(0);
    this.notes = this.buildNotes(0);
  }

  ngOnInit() {
    this.audioStore.currentTime.subscribe((currentTime: number) => {
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

  private buildNotes(currentTime: number): Note[] {
    const earliest = currentTime + this.viewWindow.earliest;
    const latest = currentTime + this.viewWindow.latest;
    let notes = [];
    let visibleIndex = chart.findIndex((note) => note.time > latest); 
    while (true) {
      const note = chart[visibleIndex];
      if (!note || note.time > earliest) {
        break;
      }
      const y = (earliest - note.time) / (earliest - latest) * 100;
      notes.push(buildNote(note.color, y));
      visibleIndex += 1;
    }
    return notes;
  }
}
