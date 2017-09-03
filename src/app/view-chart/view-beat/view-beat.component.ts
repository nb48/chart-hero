import { Component, Input, OnInit } from '@angular/core';

export interface ViewBeat {
  position: number;
}

@Component({
  selector: '[app-view-beat]',
  templateUrl: './view-beat.component.html',
  styleUrls: ['./view-beat.component.css']
})
export class ViewBeatComponent {
  @Input() beat: ViewBeat;

  constructor() {
  }
}
