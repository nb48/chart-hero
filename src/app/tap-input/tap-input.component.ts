import { Component, OnInit } from '@angular/core';

import { AudioStoreService } from '../audio-store/audio-store.service';
import { ChartStoreService } from '../chart-store/chart-store.service';

@Component({
  selector: 'app-tap-input',
  templateUrl: './tap-input.component.html',
  styleUrls: ['./tap-input.component.css']
})
export class TapInputComponent implements OnInit {

  message: string;

  times: number[];

  constructor(private audioStore: AudioStoreService, private chartStore: ChartStoreService) {
    this.message = 'Play the song and tap whenever you think there should be a note'
    this.times = [];
  }

  ngOnInit() {
  }

  play() {
    this.times = [];
    this.message = '3';
    setTimeout(() => {
      this.message = '2';
      setTimeout(() => {
        this.message = '1';
        setTimeout(() => {
          this.message = 'Go!';
          this.audioStore.play();
        }, 1000);
      }, 1000);
    }, 1000);
  }

  stop() {
    this.audioStore.stop(0);
  }

  addTime() {
    this.times.push(this.audioStore.currentTime);
  }

  save() {
    this.chartStore.newChart(this.times);
  }
}
